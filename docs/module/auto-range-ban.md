# 自动范围封禁

由于[进度检查器](./progress-cheat-blocker.md)的滞后性，用户封禁对应 IP 时已经被吸血了一部分流量。此功能的设计是为了帮助用户及时止损。
当一个 IP 被封禁时，ARB 会扫描所有连接的 Peers。如果有任何 Peer 的 IP 地址和已封禁的任意 IP 地址处于同一子网内，则该 Peer 会被连锁封禁。


![Auto Range Ban](./assets/auto-range-ban.png)
