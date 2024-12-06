# 日志管理

## 隐藏完成检查日志

PeerBanHelper（PBH）在每次完成 Peers 检查后，默认会输出一条日志信息。若您认为这些日志过于冗余，可以选择将其隐藏：

```yaml
# 日志记录器配置
# Logger configurer
logger:
  # 是否隐藏 [完成] 已检查 XX 的 X 个活跃 Torrent 和 X 个对等体 的日志消息？
  # 在 DSM 的 ContainerManager 上有助于大幅度减少日志数量，并仅记录有价值的封禁等日志条目
  # Do you want hide [Completed] spam logs? Can be enabled on DSM to avoid too many logs.
  hide-finish-log: false
```

## 历史日志存储

PBH 默认会在 `data/logs` 目录下存储日志文件。其中，`latest.log` 文件记录了当天或最后一次运行的最新日志内容。为了节省存储空间并便于管理，PBH 会自动将过往的日志文件进行打包压缩归档。