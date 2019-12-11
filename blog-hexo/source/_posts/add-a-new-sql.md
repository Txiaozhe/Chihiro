---
title: 添加一个新的SQL语句
date: '2019-04-24 22:07:16'
# photos: ./1.jpeg
abstract: 在CockroachDB中添加一个新的SQL语法类型，来实现用户自定义的功能
layout: post
categories:
- Tech
tags:
- CockroachDB
- SQL
---

# 前言

CockroachDB是著名的开源NewSQL数据库，对外提供了标准的SQL接口。上一篇文章《CockroachDB的Parser模块实现》介绍了CockroachDB中Parser模块，主要通过词法解析器将SQL语句解析成Token，然后通过语法解析器生成抽象语法树。本文将介绍如何在CockroachDB中添加一个新的SQL语法类型，来实现用户自定义的功能，并添加相应的测试，从而加深对相应模块的代码及原理的理解。

# 添加一个新的SQL语句

添加一个新的SQL语句，首先需要在SQL parser中添加必要的语法规则。CockroachDB的parser是通过 *goyacc* （go语言构建的一个yacc编译器）解析语法规则文件（*pkg/sql/parser/sql.y*）生成的。parser生成一颗抽象语法树（*AST*），其树节点的定义在代码目录 *pkg/sql/sem/tree* 下。

在parser中添加一个新的SQL语句有三个关键部分：

* 添加新的关键字；

* 添加语法解析规则；

* 添加新的语法节点类型

我们将尝试在CockroachDB v2.1中添加一个新的SQL语句：*FROBNICATE* ，这个SQL语句支持三种语法，功能如下：

* **FROBNICATE CLUSTER** ：在服务端打印 “*It’s FrobnicateModeCluster*”

* **FROBNICATE SESSION**：在服务端打印 “*It’s FrobnicateModeSession*”

* **FROBNICATE ALL**：在服务端打印 “*It’s FrobnicateModeALL*”

## 添加新的关键字

第一步需要先定义关键字。在**pkg/sql/parser/sql.y** 文件中搜索”%token”，可以看到声明了许多token，例如我们语法中需要用到的*SESSION*、*CLUSTER*、*ALL*都已经存在了，因此我们只需要添加关键字 *FROBNICATE* 即可，如下所示：

```
%token <str> FROBNICATE
```

如果关键字可以出现在标识符选项中，则必须保留该关键字（在需要使用它的地方，例如在列名中，必须使用双引号引起来），因此我们还需要将该关键字添加到”unreserved keywords”列表中，避免与标识符混淆。

```
unreserved_keyword:
....
| FROBNICATE
...
```

至此词法分析器已经能识别我们所有的关键字了，接下来需要告诉语法解析器如何处理新的语句。

## 添加语法解析规则

添加语法解析规则涉及到下列三个部分：

* 类型列表
* 语法case列表

* 子句解析规则

在 *sql.y* 文件中搜索”tree.Statement”，可以看到定义好的类型列表，在这里添加一个新的语法类型，如下所示：

```
%type <tree.Statement> frobnicate_stmt
```

然后搜索 “*stmt:* “，为新的语句类型添加一个case：

```
stmt:
...
| frobnicate_stmt // EXTEND WITH HELP: FROBNICATE
...
```

最后，我们需要在stmt中为新的语句添加语法规则及相应的帮助信息，如下所示：

```
 // %Help: FROBNICATE - show the simple message
 // %Category: Misc
 // %Text: FROBNICATE { CLUSTER | SESSION | ALL }
 frobnicate_stmt:
 FROBNICATE CLUSTER { return unimplemented(sqllex, "frobnicate cluster") }
 | FROBNICATE SESSION { return unimplemented(sqllex, "frobnicate session") }
 | FROBNICATE ALL { return unimplemented(sqllex, "frobnicate all") }
```

至此，parser已经能够识别新的语法类型并提示相应信息了。此处我们暂时使用unimplemented来代替该语法具体的操作，后续我们会继续完善该部分内容。

我们来尝试使用新的语法，首先需要产生 *sql.go* 文件：

```shell
~/go/src/github.com/cockroachdb/cockroach$ make generate
...
Type checking sql.y
Compiling sql.go
...
```

然后重新编译：

```shell
~/go/src/github.com/cockroachdb/cockroach$ make build
...
github.com/cockroachdb/cockroach
```

使用新编译的二进制文件，起一个CockroachDB单节点实例：

 ```shell
$ rm -fr cockroach-data/ && ./cockroach start --insecure
...
status:     initialized new cluster
...
 ```

另起一个终端，运行刚才添加的新语句：

![1](<https://raw.githubusercontent.com/Txiaozhe/images/master/blog/build-sql-statement/1.jpeg>)

这里虽然出现了*umimplemented* 报错，提示该语句还未完成，不过这时已经可以解析该语法了。如果执行一个不存在的语句，提示的错误则是 *syntax error*：

![2](<https://raw.githubusercontent.com/Txiaozhe/images/master/blog/build-sql-statement/2.jpeg>)

## 添加新的语法节点类型

现在我们已经可以解析相关语法，接下来还需要为该语句添加适当的语义。我们需要一个AST（抽象语法树）节点来将语句的结构信息从parser传递到runtime。



上文中我们在sql.y中添加过`%type <tree.Statement>`，因此我们还需要实现`tree.Statement`接口，该接口的定义在`pkg/sql/sem/tree/stmt.go`中，它有4个方法需要实现：

* fmt.Stringer

* NodeFormatter

* StatementType()

* StatementTag()

首先创建一个新文件`pkg/sql/sem/tree/frobnicate.go`，在该文件中实现相关AST节点：

```go
package parser

import "bytes"

type Frobnicate struct {
  Mode FrobnicateMode
}

var _ Statement = &Frobnicate{}
type FrobnicateMode int
const (
  FrobnicateModeAll FrobnicateMode = iota
  FrobnicateModeCluster
  FrobnicateModeSession
)

func (node *Frobnicate) StatementType() StatementType { return Ack }
func (node *Frobnicate) StatementTag() string { return "FROBNICATE" }
func (node *Frobnicate) Format(buf *bytes.Buffer, f FmtFlags) {
  buf.WriteString("FROBNICATE ")
  switch node.Mode {
    case FrobnicateModeAll:
    buf.WriteString("ALL")
    case FrobnicateModeCluster:
    buf.WriteString("CLUSTER")
    case FrobnicateModeSession:
    buf.WriteString("SESSION")
    default:
    panic(fmt.Errorf("Unknown FROBNICATE mode %v!", node.Mode))
  }
}

func (node *Frobnicate) String() string {
  return AsString(node)
}
```

接下来我们需要更新parser，让它在遇到该语句时返回相应的`Frobnicate`节点。

上文在 *sql.y* 文件中添加frobnicate_stmt规则时，使用了unimplemented来暂时代替具体实现，现在我们来实现这部分内容：

```
// %Help: FROBNICATE - twiddle the various settings
// %Category: Misc
// %Text: FROBNICATE { CLUSTER | SESSION | ALL }
frobnicate_stmt:
FROBNICATE CLUSTER { $$.val = &tree.Frobnicate{Mode: tree.FrobnicateModeCluster} }
| FROBNICATE SESSION { $$.val = &tree.Frobnicate{Mode: tree.FrobnicateModeSession} }
| FROBNICATE ALL { $$.val = &tree.Frobnicate{Mode: tree.FrobnicateModeAll} }
```

重新编译，然后通过客户端运行该语句：

![3](<https://raw.githubusercontent.com/Txiaozhe/images/master/blog/build-sql-statement/3.jpeg>)

这里返回了一个错误，不过这是一个来自SQL planner的错误，当SQL planner识别到新的语法节点但是不知道该如何处理时就会报这个错误。

我们需要告诉planner如何处理这个语法，相应的代码在 *pkg/sql/plan.go* 中，我们在newPlan函数中为其添加一个case：

```go
switch n := stmt.(type) {
case *tree.Frobnicate:
  return p.Frobnicate(ctx, n)
```

然后我们在 *pkg/sql/frobnicate.go* 中实现对应的方法：

```go
package sql
import (
  "context"
  "fmt"
  "github.com/cockroachdb/cockroach/pkg/sql/sem/tree"
)

func (p *planner) Frobnicate(ctx context.Context, stmt *tree.Frobnicate) (planNode, error) {
  return nil, fmt.Errorf("We're not quite frobnicating yet...")
}
```

再次编译并运行：

![4](<https://raw.githubusercontent.com/Txiaozhe/images/master/blog/build-sql-statement/4.jpeg>)

这里已经根据相应函数内的代码返回了一个错误，接下来我们修改该函数，实现打印出对应信息的功能：

```go
func (p *planner) Frobnicate(ctx context.Context, stmt *tree.Frobnicate) (planNode, error) {
  switch stmt.Mode {
    case tree.FrobnicateModeCluster:
    fmt.Println("It's FrobnicateModeCluster")
    case tree.FrobnicateModeSession:
    fmt.Println("It's FrobnicateModeSession")
    case tree.FrobnicateModeAll:
    fmt.Println("It's FrobnicateModeAll")
    default:
    return nil, fmt.Errorf("Unhandled FROBNICATE mode %v!", stmt.Mode)
  }
  return &zeroNode{}, nil
}
```

注意：这里直接返回zeroNode，它是一个不包含任何行和列的planNode，所以客户端将看不到任何数据返回。如果你需要返回一些内容给客户端，可以查看 *pkg/sql* 包下是否有合适的planNode，或者使用自定义的planNode。

重新编译并运行：

```shell
./cockroach sql --insecure -e "frobnicate cluster"
./cockroach sql --insecure -e "frobnicate session"
./cockroach sql --insecure -e "frobnicate all"
```

这时在服务端屏幕可以观察到已经打印出对应的内容：

![5](<https://raw.githubusercontent.com/Txiaozhe/images/master/blog/build-sql-statement/5.jpeg>)

至此我们已经实现了一个简单的 *frobnicate* 语法，别忘了最后还有一个重要步骤，添加相应的测试用例。

## 添加测试用例

此处需要为该语法解析添加测试用例，相关测试代码位于 *pkg/sql/parser/parse_test.go* ，我们只需要在对应的地方加入需要测试的语法即可：

```
{`FROBNICATE CLUSTER`},
{`FROBNICATE SESSION`},
{`FROBNICATE ALL`},
```

然后运行测试:

```shell
$ make test
```

如果在上述过程中可以顺利添加语句并成功编译构建，则此处应当可以成功跑通相应的测试用例。

关于SQL语句的功能测试代码在 *pkg/sql/logictest/* 下相应文件中，只需要在对应的地方添加新的SQL语句和期望的返回结果即可。由于此处我们仅实现了服务端打印的测试功能，便不具体在此处进行测试，感兴趣的同学可以自行查看对应的测试文件。

## 给SQL语句添加别名

如果我们需要经常运行Frobnicate语句，希望它可以更简洁的话，我们也可以给它添加一个别名`FROB`，实现过程很简单，只需要在`sql.y`中添加几行规则即可：

```
unreserved_keyword:
...
+ | FROB
| FROBNICATE
...
frobnicate_stmt:
FROBNICATE CLUSTER { $$.val = &tree.Frobnicate{Mode: tree.FrobnicateModeCluster} }
| FROBNICATE SESSION { $$.val = &tree.Frobnicate{Mode: tree.FrobnicateModeSession} }
| FROBNICATE ALL { $$.val = &tree.Frobnicate{Mode: tree.FrobnicateModeAll} }
+ | FROB CLUSTER { $$.val = &tree.Frobnicate{Mode: tree.FrobnicateModeCluster} }
+ | FROB SESSION { $$.val = &tree.Frobnicate{Mode: tree.FrobnicateModeSession} }
+ | FROB ALL { $$.val = &tree.Frobnicate{Mode: tree.FrobnicateModeAll} }
```

# 总结

本文通过一个添加SQL语句的案例，介绍了SQL语句在CockroachDB代码中的实际解析和处理流程。本文所使用的案例参考了https://github.com/cockroachdb/cockroach/blob/master/docs/codelabs/01-sql-statement.md 中的案例，为了便于读者理解，在实现具体功能时直接在服务端打印内容并返回zeroNode。关于planner和生成执行计划相关的原理及实现，会在后续的SQL引擎系列文章中进行详细介绍。