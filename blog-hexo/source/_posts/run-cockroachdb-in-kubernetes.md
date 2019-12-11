---
title: 在 Kubernetes 集群中运行 CockroachDB
date: '2018-06-10 10:59:32'
# photos: ./1.jpeg
abstract: 在Kubernetes 集群中运行CockroachDB
layout: post
categories:
- Tech
tags:
- CockroachDB
- Kubernetes
---

[原文](https://www.cockroachlabs.com/blog/running-cockroachdb-on-kubernetes/)

作者：[Alex Robinson](https://www.cockroachlabs.com/author/alex-robinson/)   2016年10月11日

![](https://www.cockroachlabs.com/uploads/2016/10/running-cockroachdb-on-kubernetes.png)

**[使用说明于2017年1月4日更新]**

在Cockroach Labs，我们一直在为更简单地实现用户数据在灾难性错误的情况下保持安全和可用而努力。然而，如果你曾经在是生产环境中负责部署和运维，你就会发现使系统具备高可靠性远不止启动几个进程这么简单，这对于CockroachDB这类具有极强生命力的应用来说也是如此。于是，[Kubernetes](http://kubernetes.io/)就有了用武之地。

Kubernetes是一个开源的系统，用于自动化部署，集群扩缩容和容器化应用的管理。这里的 ”容器化“ 即[Docker](https://www.docker.com/what-docker)的应用。Kubernetes提供了各种各样的[服务](http://kubernetes.io/docs/stable/whatisk8s/)，用来实现保持应用程序的正常运行，应用程序复制和更新回滚以及健康检查和日志收集。

如果你熟悉CockroachDB，你就知道它处理了在面对各种故障时以一致的方式复制数据的过程中所有复杂的细节。通过在Kubernetes中运行CockroachDB，我们可以将其内置的副本和生存性模块与Kubernetes的进程管理器匹配，创建一个真正使数据变得简单的高可用系统。

## 在Kubernetes中进行状态管理

如果你有一些Kubernetes的使用经验，你可能会有所质疑，数据库要运行在一个系统上，这个系统的历史中却没有为有状态的集群化应用提供一个很好管理服务。确实，Kubernetes早期阶段主要的目标是无状态的应用（无需管理它们自己的持久数据），但是，Kubernetes背后的团队在今年已经开始致力于以[`StatefulSet`](http://kubernetes.io/docs/stable/concepts/abstractions/controllers/statefulsets/)的形式为有状态的应用构建一流的支持。

通常来说，当一个Kubernetes [pod](http://kubernetes.io/docs/stable/user-guide/pods/)（包含经编排的一个或多个容器的运行组）消亡时，它将被一个新的pod所取代，新的pod会包含一个新的标识符，新的IP地址以及主机名。但是，无论这个pod重启多少次甚至改变底层的主机，StatefulSet都可确保每个副本拥有它自己稳定的标识符（通过DNS解析）。这对于CockroachDB来说是很有意义的，因为这意味着每当pod被新副本取代时，我们不再需要像对待集群中的新节点那样对待这个pod，否则这会导致大量的数据复制。这对于高效支持我们的[一致性协议](https://www.cockroachlabs.com/blog/consensus-made-thrive/)和[分布式事务](https://www.cockroachlabs.com/blog/how-cockroachdb-distributes-atomic-transactions/)是很重要的。

在Kubernetes这样的编排系统中运行像CockroachDB这样的数据库，另一个更明显的问题是如何找出每一个副本的数据存在的位置。不同的存储方式，其相应解决方案的成熟度不同。Kubernetes很早就对['PersistentVolumes'](http://kubernetes.io/docs/stable/user-guide/persistent-volumes/)有了很好的支持，也就是可以挂载在Kubernetes任意节点上的远程磁盘。这是一种很好的策略因为它允许一个副本在不丢失任何数据的情况下迁移。然而，正因为这些数据是远程的（且常常在后台被复制，比如EC2上的EBS卷和Google Compute Engine上的持久卷），这意味着相比于使用本地磁盘，这种方式存在明显的延迟开销。

像CockroachDB这样一个云生和集群化的数据库来说，偶尔出现单台机器上的数据丢失的情况，一点问题都没有，因为它能探测到机器上数据副本不足，从而相应添加副本。正因如此，理想情况下为每个副本使用本地磁盘可以降低延迟。然而，由于一些原因（[这些问题](https://github.com/kubernetes/kubernetes/pull/30044)已经在1.6release版本中经过了严肃的讨论），Kubernetes目前还不支持StatefulSets使用本地磁盘。在此期间，远程持久卷已经能满足我们的需求。

## 实现细节：在Kubernetes中运行CockroachDB

### 创建一个Kubernetes集群

[创建一个Kubernetes集群有**很多种**不同的](http://kubernetes.io/docs/stable/getting-started-guides/)方式。为了简单起见我们将使用Container Engine，这在其他环境下也是可行的。例如，参照[我们的文档有关如果在本地Minikube中运行](https://www.cockroachlabs.com/docs/stable/orchestrate-cockroachdb-with-kubernetes.html)或参照[Kubernetes 的文档在AWS中创建集群](http://kubernetes.io/docs/stable/getting-started-guides/kops/)。如果你安装了[gcloud](https://cloud.google.com/sdk/gcloud/)，你可以通过运行以下命令来创建集群：

```shell
$ gcloud container clusters create cockroachdb-cluster
```

### 快速启动CockroachDB

Kubernetes的配置使用YAML配置文件进行管理，CockroachDB的配置也不例外。我们可以使用以下配置创建一个集群，其中的注释解释了我们的操作。首先，[从我们的Github 仓库中](https://github.com/cockroachdb/cockroach/blob/master/cloud/kubernetes/cockroachdb-statefulset.yaml)复制名叫`cockroachdb-statefulset.yaml`的配置文件。这个文件定义了将被创建的Kubernetes资源，包括快速启动CockroachDB 容器的StatefulSet对象并将其连接至持久卷。

然后，创建这些资源，如下（如果你使用Minikube，你可能首先需要[手动配置持久卷](https://www.cockroachlabs.com/docs/stable/orchestrate-cockroachdb-with-kubernetes.html#step-2-start-the-cockroachdb-cluster)）。稍后，你将看到在集群中运行的3个副本和一些服务。刚开始，因为副本还没有全部启动，可能只显示一部分的副本。这是正常的，因为StatefulSets会从第一个开始逐个创建副本：

```shell
$ kubectl create -f cockroachdb-statefulset.yaml
```

service "cockroachdb-public" created
service "cockroachdb" created
poddisruptionbudget "cockroachdb-budget" created
statefulset "cockroachdb" created

```
$ kubectl get services
```

cockroachdb          None         <none>        26257/TCP,8080/TCP   4s
cockroachdb-public   10.0.0.85    <none>        26257/TCP,8080/TCP   4s
kubernetes           10.0.0.1     <none>        443/TCP              1h

```shell
$ kubectl get pods
```

NAME            READY     STATUS    RESTARTS   AGE
cockroachdb-0   1/1       Running   0          29s
cockroachdb-1   0/1       Running   0          9s

```shell
$ kubectl get pods
```

NAME            READY     STATUS    RESTARTS   AGE
cockroachdb-0   1/1       Running   0          1m
cockroachdb-1   1/1       Running   0          41s
cockroachdb-2   1/1       Running   0          21s

如果你想看看这个过程中发生了什么，你可以运行`kubectl logs cockroachdb-0`查看其中一个pod的日志。

### 使用CockroachDB集群

一旦你的集群开始运行了，你一定会想去尝试它。通过Kubernetes打开一个SQL shell，你可以运行一个一次性的pod，并使用`cockroachdb-public`作为hostname来访问CockroachDB集群。Kubernetes将会自动均衡地将连接分配至健康的CockroachDB实例。

```
$ kubectl run cockroachdb -it --image=cockroachdb/cockroach --rm --restart=Never -- sql --insecure --host=cockroachdb-public
```

等待cockroachdb运行成功，此时状态为Pending，pod ready状态为 false

输入如下命令：

```shell
root@cockroachdb-public:26257> CREATE DATABASE bank;
CREATE DATABASE
root@cockroachdb-public:26257> CREATE TABLE bank.accounts (id INT PRIMARY KEY, balance DECIMAL);
CREATE TABLE
root@cockroachdb-public:26257> INSERT INTO bank.accounts VALUES (1234, 10000.50);
INSERT 1
root@cockroachdb-public:26257> SELECT * FROM bank.accounts;
+------+-------------+
| id | balance |
+------+-------------+
| 1234 | 10000.5 |
+------+----------+
(1 row)
```

### 查看管理页面

如果你想查看集群的行为信息，你可以通过将你本地机器的端口映射到其中一个pods拉取CockroachDB管理UI：

```shell
$ kubectl port-forward cockroachdb-0 8080
```

运行了这个命令，你就可以在浏览器中输入[http://localhost:8080/](http://localhost:8080/)来访问管理UI了。

[![monitor deployment of CockroachDB on Kubernetes from the admin UI](https://www.cockroachlabs.com/uploads/2016/10/Screen-Shot-2016-10-06-at-1.24.09-PM-1-1024x548.png)](https://www.cockroachlabs.com/uploads/2016/10/Screen-Shot-2016-10-06-at-1.24.09-PM-1.png)

### 模拟节点故障

如果你想测试集群的弹性，你可以尝试在通过SQL shell访问集群的同时，新起一个终端运行类似于`kubectl delete pod cockroachdb-3`的命令来杀掉一些容器。如果你碰巧删除了你的shell正在操作的实例，你可能偶尔会遇到 **bad connection** 的错误，但是重试查询操作依然会生效。这些被杀掉的容器将会通过StatefulSet 管理器被重新创建，就像机器在生产环境中宕机一样。

如果你想测试集群中数据的持久性，你也可以尝试一次性删除所有的pod并确保当它们恢复时能正确地从各自的持久化卷中启动。要实现这一点，可以通过运行`kubectl delete pod –selector app=cockroachdb`以删除所有标签为`app=cockroachdb`的pod，其中包括来自我们StatefulSet中的pod。所有的pod恢复的过程会花费一点时间（就像创建它们的时候一样），但是一旦它们重启并再次运行，你运行SQL语句时就应该得到相同的结果。

### 缩放CockroachDB集群

Kubernetes使得按需缩放集群变得简单。如果你想为集群添加新的副本，你需要做的就是调整StatefulSet，如下所示：

```shell
$ kubectl scale statefulset cockroachdb --replicas=4
```

### 关闭CockroachDB集群

如果你想清理所有我们创建的资源，可以通过一条命令，这要归功于我们为所有资源添加的[labels](http://kubernetes.io/docs/stable/user-guide/labels/):

```shell
$ kubectl delete    statefulsets,pods,persistentvolumes,persistentvolumeclaims,services,poddisruptionbudget -l app=cockroachdb
```

或者，你也可以关闭整个Kubernetes集群：

```shell
$ gcloud container clusters delete cockroachdb-cluster
```

鉴于目前CockroachDB尚未成熟地产品化，我们现在不建议将此设置应用到关键任务的数据中，但是，但是你仍然可以在机器上做很多事，比如：

* 使用众多支持CockroachDB 集群的客户端中的一个来开发应用。

* 修改集群初始化的方式以便[在节点之间使用证书进行加密](https://www.cockroachlabs.com/docs/stable/secure-a-cluster.html)。

* 在云主机或裸机上而不是在容器引擎中用不同的持久卷起一个集群。

* 利用我们在CockroachDB StatefulSet中提示的优势[搭建Prometheus](https://coreos.com/blog/prometheus-and-kubernetes-up-and-running.html)来监控集群内的CockroachDB。

* 将构建特征的请求、问题或改进建议提交给[CockroachDB](https://github.com/cockroachdb/cockroach)、Kubernetes 文档或它的核心数据库。

## 参考

在[我们的文档](https://www.cockroachlabs.com/docs/stable/orchestrate-cockroachdb-with-kubernetes.html)或[Github 仓库](https://github.com/cockroachdb/cockroach/tree/develop/cloud/kubernetes)中可以找到在Kubernetes中运行CockroachDB的最新配置文件等更多信息。
