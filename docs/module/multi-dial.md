# 多拨封禁

一些吸血者会通过多拨或者运营商内鬼的形式获得大量相同子网的 IP 地址。  
ARB 尽管与此模块拥有几乎完全相同的功能，但只有在出现任意封禁时才会动作。多拨封禁则无需等待封禁，将会主动检测已连接的 Peers。

当同一个子网范围超过指定数量的 IP 同时连接到相同种子时，就会开始子网封禁操作。

![multi-dial](./assets/multi-dial.png)

## 追猎

如果某 IP 已判定为多拨，无视缓存时间限制继续搜索其相同子网内的所有其他 Peer。

启用此功能会占用一部分额外运行内存。

## 配置文件

```yaml
  # 多拨封禁
  # Multi-dialing blocker
  multi-dialing-blocker:
    enabled: true
    # 封禁时间，单位：毫秒，使用 default 则跟随全局设置
    ban-duration: 1296000000
    # IPV4 前缀长度
    # IPV4 prefix length
    # IP地址前多少位相同的视为同一个子网，位数越少范围越大，一般不需要修改
    # The same prefix ip addresses will trick as in same subnet, usually don't need changes
    subnet-mask-length: 24
    # IPv6 地址前缀长度
    # IPv6 prefix length
    subnet-mask-v6-length: 60
    # 容许同一网段下载同一种子的IP数量，正整数
    # 防止DHCP重新分配IP、碰巧有同一小区的用户下载同一种子等导致的误判
    # The allowed maximum amount of ips in same subnet
    # To avoid mistake bans that caused by DHCP re-allocated IPs, or multiple users in same city
    tolerate-num: 5
    # 缓存持续时间（秒）
    # Cache life span
    # 所有连接过的peer会记入缓存，DHCP服务会定期重新分配IP，缓存时间过长会导致误杀
    # All connected peers will record into cache, DHCP may re-allocated IPs.
    cache-lifespan: 86400
    # 是否追猎
    # Keep hunting
    # 如果某IP已判定为多拨，无视缓存时间限制继续搜寻其同伙
    # If a specific IP flagged multi-dialing, should we ignore the caching span and keep searching other IPs in same subnet?
    keep-hunting: true
    # 追猎持续时间（秒）
    # Hunting time
    # keep-hunting为true时有效，和cache-lifespan相似，对被猎杀IP的缓存持续时间
    # Only works when keep-hunting enabled, similar as cache-lifespan
    keep-hunting-time: 2592000
  # 规则引擎，支持 AviatorScript 语言 - User script, support AviatorScript
  # 提供在 PBH 上自行编程编写规则的能力 - Provide programming ability on PBH
```