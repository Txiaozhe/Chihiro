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

由于可以定义 255个公共指令（不包括零值）和256个稀有指令，因此 opcode 的最大个数是 511，目前大约有215条常见指令和70条稀有指令可用。

在 CBC 中有3种字节码参数：

* **byte argument**（字节参数）：介于0~255之间的值，通常代表操作码操作调用的参数计数（函数、new、eval等）
* **literal argument**（字面量参数）：在header中介于0~literal_end（包含0）之间的整数索引的域
* **relative branch**（相对分支参数）：长度为1~3个字节的偏移量。分支参数也可能代表指令范围的结尾。 例如，`CBC_EXT_WITH_CREATE_CONTEXT` 的 branch 参数显示 with 语句的结尾。 更确切地说，with子句中最后一条指令之后的位置

参数之间的组合限于以下7种情况：

* 无参数
* 只有一个字面量参数
* 只有一个字节参数
* 只有一个分支参数
* 一个字节参数和一个字面量参数
* 两个字面量参数
* 三个字面量参数

### 字面量

字面量被按照不同的类型组成字面量组，这与为每个字面量分配标志位相比更加节省空间。（以下提到的范围代表大于或等于范围左侧和小于右侧的那些标记。例如，字节码标头的ident_end和literal_end字段之间的范围包含这些标记， 大于或等于ident_end且小于literal_end。如果ident_end等于literal_end，则范围为空。）

*identifiers*（标识符） 和 *values*（值） 是两个主要的字面量组：

* **identifier**：表示变量的名字。在 header 中字面量值介于0~ident_end之间。这种字面量必须为 string 或 undefined。undefined只能用来表示该字面量无法通过字面量名字访问到的情况。比如 `function () {arg, arg}`有两个参数，但这里的 arg 只能用来引用第二个参数。在这种情况下，第一个参数的名字就是 undefined。此外，诸如 CSE 之类的优化也可能引入不带名称的字面量。
* **value**：表示立即值的引用。字面量值介于 ident_end 和 const_literal_end 之间的数字或字符串等。这种字面量可以直接被 VM 所使用。字面量值介于 const_literal_end 和 literal_end 的是模板字面量，比如函数和正则表达式。每次访问这类值都需要构造一个新对象。

identifiers 还有另外两个子组。寄存器是存储在函数调用堆栈中的那些标识符。 参数是由调用程序函数传递的那些寄存器。

在 CBC 中有两种类型的字面量编码，长度可变，1或2个字节

* **small**：