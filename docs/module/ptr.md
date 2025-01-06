# DNS 反向解析

:::info
这是 [PTR反向解析记录](https://www.cloudflare.com/zh-cn/learning/dns/dns-records/dns-ptr-record/)，而非反向域名解析。此功能反向解析的是**主机名**而非广义上的域名。
:::

## 什么是主机名？

如果你使用过 qBittorrent 并打开过设置里的 “解析用户主机名” 开关，那么你应该对下面的场景非常熟悉。

![qbPTR](./assets/ptr-example.png)

图中被红色标记的就是 “主机名”，本模块检测的正是这些 “主机名”。

## 使用

### 允许 DNS 反查

默认情况下，PeerBanHelper 的 DNS 反查功能处于禁用状态。这是因为频繁的进行查询，可能导致你使用的 DNS 服务器拒绝给你继续提供服务，从而影响你的正常上网。

你需要前往 “设置 -> 基本设置 -> 查询” 并打开 “启用 DNS 反向查找” 开关，并保存。

![turn-on-lookup](./assets/turn-on-ptr-lookup.png)

### 启用 DNSJava

默认情况下，PeerBanHelper 使用 JDK 解析器，但 JDK 解析器通常不能很好的工作。因此你最好启用 “DNSJava 实验”。

前往 “设置 -> 实验室”，然后打开 “启用实验性功能”。在下面的列表中找到并打开 “DNSJava DNS 解析”，此时你就切换到了 DNSJava 解析器。

### 配置规则

前往 “设置 -> 首选项 -> DNS 反向解析记录”，展开即可为主机名配置对应的规则。

![config ptr](./assets/ptr-config.png)