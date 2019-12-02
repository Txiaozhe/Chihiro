## 简介
这是 JerryScript 官网的一段简介：
![](/blogs/nodejs/jerryscript-introduce.png)

> **简单翻译一下：**
>
> JerryScript 是一个为 IoT 而开发的轻量级  JavaScript 引擎，可以运行在资源十分受限的设备上，比如：
>
> * RAM 低于 64KB 的设备
> * ROM 低于 200KB 的设备
>
> 该引擎支持在设备上解释、执行 JavaScript 以及对外围设备的访问。

说白了 JerryScript 和我们日常用的 Chrome 和 Node.js 中的 V8 是一回事，是一个引擎，只不过 JerryScript 能运行在更加低端的设备上，如嵌入式设备。我们知道，JavaScript 作为一个脚本语言有其先天的缺陷，如解释执行的效率低下以及臃肿的堆内存的占用，哪怕 V8 的设计与实现已经做了大量的优化与改进，但距离能运行在 RAM 以 MB 为单位的设备上还差得很远。这不禁使人产生疑问，同样是对统一标准的实现，JerryScript 凭什么做到运行在 RAM 低于 64KB，ROM 低于 200KB 的设备上这种骚操作。本文参考了 [JerryScript 的官方文档](https://jerryscript.net/internals/)并对 JerryScript 设计原理进行简单的阐述。

![](/blogs/nodejs/engines_high_level_design.png)

如上图，Parser(解析器) 和 VM(虚拟机) 是 JerryScript 的两个核心组件。一般来说 JerryScript 运行的基本流程，首先，Parser 将加载到的 JS 标准代码解析成具有特殊格式的字节码，然后由 VM 对字节码进行执行。

## Parser

在 JerryScript 里，Parser 被设计为 recursive descent parser（递归下降解析器），这样的解析器可以直接将标准 JS 代码转换成字节码而并不像 V8 那样会构建一个 AST。这里的实现依赖以下四个组件：Lexer（词法分析器）、 Scanner、Expression Parser（表达式解析器）以及 Statement Parser（语句解析器）。

### Lexer 

将输入的代码字符串切分成标识符序列，其不仅可以按顺序向前扫描输入字符串，而且可以移动到任意位置。

###Scanner

对输入的字符串进行预扫描并搜索特定字符，比如这一步可以确定出现 `for` 的地方代表了常规的循环还是 `for-in` 循环。

### Expression Parser

负责解析 JavaScript 表达式。

### Statement Parser

负责解析 JavaScript 语句。

![](/blogs/nodejs/parser_dependency.png)

上图展示了 Parser 中几个主要组件的相互作用，函数 `parser_parse_source` 对输入的 ES 源代码进行解析和编译，当遇到函数时，调用 `parser_parse_function `对代码进行递归操作，包括参数解析和上下文处理。解析之后，`parser_post_processing` 函数转储创建的操作码并返回一个 `ecma_compiled_code_t * ` 指针，它指向已编译的字节码序列。

## Byte-code

与其他 JS 引擎的实现相比，JerryScript 实现了更加紧凑的字节码形式（CBC），和其他只关注性能的实现相比，一方面减少了字节码的内存消耗，同时又具有可观的性能。CBC 类似于 CISC 指令集，可为频繁的操作分配较短的指令。 许多指令表示多个原子操作，减少了字节码体积，这类似于一种数据压缩方法。

### 编译的字节码的内存布局

![](/blogs/nodejs/CBC_layout.png)

* header 表示一个具有多个域的 cbc_compiled_code 结构，这些域包含了字节码的关键属性。
* literial 部分是一个 ecma 值的数组，这些值包含了 ECMAScript 定义的数据类型，比如 string、number、function等等。该数组长度由 header 中的 literal_end 字段指定。
* CBC instruction list 是一系列的字节码指令，他们代表编译后的代码。

### 字节码内存布局

![](/blogs/nodejs/opcode_layout.png)

每一个字节码都由 opcode 开头。常见指令的 opcode 为1字节，反之稀有指令的为2字节。稀有指令的第一个字节始终为零（CBC_EXT_OPCODE），第二个字节表示扩展操作码。 常见指令和稀有指令的名称分别以 CBC\_ 和CBC_EXT\_ 前缀开头。