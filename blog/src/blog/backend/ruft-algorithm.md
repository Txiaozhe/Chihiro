## 一致性算法



## Ruft 简介

Raft 是一种用来管理日志复制的一致性算法，其将一致性算法分为了几个部分：leader选取（leader selection），日志复制（log replication）和安全性（safety），同时它使用了更强的一致性来减少了必须需要考虑的状态。Raft 还包括了一种新的机制来支持动态改变集群成员，它使用重叠大多数（overlapping majorities机制）来保证安全。


