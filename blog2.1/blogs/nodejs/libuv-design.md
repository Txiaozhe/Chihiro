libuv 是一个原本为 Node.js 而编写，围绕着事件驱动的异步 I/O 模型而设计的跨平台库。

这个库为多个不同的I/O 循环机制提供了简单的抽象，如：‘handles’ 和 ‘streams’ 为 sockets 和其他实体提供高度抽象；除此之外也提供了跨平台文件 I/O 和线程功能。

libuv 架构如图：

![](http://docs.libuv.org/en/v1.x/_images/architecture.png)

## Handles(句柄) 和 requests(请求)

libuv 结合事件循环为用户提供了两个协作对象的抽象：handles 和 requests。

Handles 表示活动时能执行某些操作的长期存活对象：

* prepare handle 在活动时每次循环迭代都会调用一次其回调。
* TCP 服务器 handler 会在每次有新连接时调用其连接回调。

Requests 通常表示短期存在的操作。这些操作可以在一个handle上执行，例如：写请求在被用于在handle上写数据；或者独立的： getaddrinfo 请求不需要handle而直接在循环迭代中运行。

## I/O 循环

I/O (或事件) 循环是libuv 的核心部分。其构建了所有的 I/O 操作，并将其绑定到单个线程上。因此只要每个事件循环运行在不同的线程中，就可以同时运行多个事件循环。除非另有说明，libuv 事件循环（或任何涉及到事件循环或handle的 API）都不是线程安全的。

事件循环遵循常见的单线程异步 I/O 方式：在给定平台上，所有（网络）I/O 都使用最佳的机制在非阻塞的套接字中轮询执行：如 linux 的epoll；OSX或BSDs 的kqueue；SunOS 的event ports以及Windows的IOCP。作为循环迭代的一部分，循环将阻塞等待已添加到循环器中的套接字上的I/O 活动，并触发回调指示套接字条件（可读或可写的挂起）以便 handle 可以读取、写入或执行所需的 I/O 操作。

为了更好地理解事件循环的运作方式，下图说明了循环迭代的所有阶段：

![](http://docs.libuv.org/en/v1.x/_images/loop_iteration.png)

1. 更新 ‘now’。事件循环在开始处缓存当前时间以减少与时间相关的系统调用。
2. 若循环是存活的则开始迭代，否则立即退出。那么什么情况下认为循环是存活的？当循环中存在活动的handle或被引用的 handle、活动中的请求或closing handles 时则认为循环是存活的。
3. 执行到期的计时器。调用所有到期的计时器的回调。
4. 调用上一轮循环推迟的回调。大多数情况下会在轮训 I/O 之后调用所有 I/O 回调。某些情况下这类回调会被推迟到下一个循环迭代。被推迟的 I/O 回调将在此时运行。
5. 调用 idle handle。如果空闲handle是存活的，则会在每个循环中调用它们。
6. 调用 prepare（就绪）handle。循环阻塞 I/O 前prepare handle回调将得到调用。
7. 计算循环超时。在阻塞 I/O 前，循环会计算阻塞的时间，以下是计算超时的规则：

* 如果循环使用 UV_RUN_NOWAIT 标志运行，则超时为0；
* 如果循环即将停止（uv_stop() 被调用），则超时为0；
* 如果不存在任何存活的 handles 和 request，则超时为0；
* 如果有任何空闲的handle处于活动状态，则超时为0；
* 如果有任何要关闭的handle，则超时为0；
* 如果以上情况都不匹配，则采用最接近的定时器超时，或者当没有活动的定时器时，则为无穷大。

8. I/O 循环模块。此时，循环将在上一步计算的持续时间内阻塞 I/O，正在监视给定文件描述符的读写操作的所有与I / O相关的 handle 都将调用其回调。
9. 调用 check handle。在 I/O 阻塞循环之后，check handle立即调用其回调，check handle 基本上对应着 prepare handles。
10. 调用 close 回调。当通过调用 uv_close() 关闭 handle时将调用close 回调。
11. 使用 UV_RUN_ONCE 标志运行的情况下的特殊阶段。阻塞 I/O 后可能没有触发任何 I/O 回调，但是此时已经过去了一段时间，因此可能会有到期的计时器，此时这些计时器回调将得到调用。
12. 迭代末尾。如果循环是使用 UV_RUN_NOWAIT 或 UV_RUN_ONCE 模式运行的，则迭代将结束，并且uv_run() 将返回。如果循环是使用 UV_RUN_DEFAULT 运行的，那么如果循环仍然存活，则将从头开始继续，否则也将结束。

> **划重点**：libuv 使用线程池使异步文件 I/O 操作成为可能，但是网络 I/O 始终在单个线程（每个循环的线程）中执行。
>
> **注意**：尽管轮训机制不同，但libuv使执行模型在 Unix 系统和 Windows 之间保持一致。

## 文件 I/O

与网络 I/O 不同，libuv 特定平台下没有可依赖的 I/O 操作原语，因此当前的实现方式是在线程池中运行阻塞的文件 I/O 操作。

有关跨平台文件 I/O 的详尽说明，查看[此文章](http://blog.libtorrent.org/2012/10/asynchronous-disk-io/)。

当前 libuv 使用全局线程池，所有循环都可以在该线程池上排队工作。当前在此线程池上运行3种类型的操作：

* 文件系统操作
* DNS 函数（getaddrinfo 和 getnameinfo）
* 用户通过 uv_queue_work() 运行的特定代码

> **警告**：有关更多详细信息，查看 [“线程池工作调度”](http://docs.libuv.org/en/v1.x/threadpool.html#threadpool) 部分，但是请记住，线程池的大小是非常有限的。


