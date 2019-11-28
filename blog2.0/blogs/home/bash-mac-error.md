之前参与了CockroachDB的文档翻译，总觉得不够，希望能参与到项目的开发中。于是查看各种文档，开发指南。幸好CockroachDB 官方有完整的[开发指导](https://github.com/cockroachdb/cockroach/blob/master/CONTRIBUTING.md)，于是我就按照开发指引来进行环境的搭建，使用的电脑是2017款MacBook Pro，OSX 10.13.3，8Gb，Core i5。

项目开发对环境有很多要求，比如C++需要支持11版本，Go版本需要1.9+等等，其中还有一条要求，Bash的版本需要在 4+，我们都知道，mac默认的bash是3.2版本的，因此需要进行升级。升级的方法是网上查的，使用brew  进行安装：

```shell
$ brew install bash
```

但是可执行文件会被安装到 `/usr/local/Cellar/bash` 中，而真正的 `bash` 仍在 `/bin/bash` 中，为了方便会用4+版本的bash，需要对命令指向进行改动。

按照教程，因为Mac系统引入了sip机制禁止更改系统目录的权限，因此需要先关闭sip机制再进行修改：

* 重启OSX，启动时快速按住 `cmd` + `R` 

* 出现系统恢复界面后，标题栏选择 `Utilities` - `menu` ，进入Terminal

* 输入 `csrutil disable` 关闭SIP( `csrutil enable` 为打开SIP)

* 重启Mac

此时Mac正常启动，进入正常使用的界面，输入以下命令修改 `bash` 指向：

```shell
$ sudo mv /bin/bash  /bin/bash.origin
$ sudo ln -s /usr/local/Cellar/bash /bin/bash
```

修改完成后输入：

```shell
$ bash --version
```

出现

```shell
GNU bash, version 4.4.23(1)-release (x86_64-apple-darwin17.5.0)
...
```

大功告成，bash升级成功，于是重启电脑，再次按 `cmd` + `R` 进入恢复界面，输入 `csrutil enable` 打开SIP，再次重启。

此时却没有顺利启动起来，一直卡在登录界面的进度条那里，强制关机、重启也不管用了。查了各种资料，各种方式重启也都不顺利，最后准备重装系统，可惜此时发现系统却没有备份，重装的话有可能丢失数据（这里推荐大家一定要定时及时地进行系统备份，否则到这种时候只有哭的份了），看来也没办法了，强制重装吧。

这个时候突然想到Mac恢复界面是可以使用Terminal的，要不把bash指向改回去试试。于是死马当活马医，重启Mac，再次按 `cmd` + `R` 进入恢复界面，进入Terminal：

```
$ sudo mv /bin/bash.origin /bin/bash
$ sudo unlink /bin/bash
```

再次重启，竟然复活了，系统完好无损，简直惊险。

到这里，以为bash就这样无法升级了，那也就跟CockroachDB开发无缘了，不过当我在Termina中输入：

```shell
$ bash --version
```

再次出现：

```shell
GNU bash, version 4.4.23(1)-release (x86_64-apple-darwin17.5.0)
...
```

发现bash已经被改好了，此时算是有惊无险而且结果也是令人满意的。

最后总结两点：

* 不要随随便便更改系统配置

* 一定要备份 一定要备份 一定要备份
