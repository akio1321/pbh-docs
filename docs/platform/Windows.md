# Windows 系统设置

## EcoQoS 节能优化（适用于 Windows 11 22H2 及更高版本）

在 Windows 11 的 22H2 版本或更高版本中，如果系统 BIOS 和 CPU 均支持，PeerBanHelper（PBH）将自动启用 [EcoQoS](https://devblogs.microsoft.com/performance-diagnostics/introducing-ecoqos/) 节能功能。此功能旨在缓解 PBH 在执行检测任务时因瞬时计算量增加导致的 CPU 睿频及电量消耗，同时降低 PBH 的运行优先级，以便将更多系统资源分配给其他应用程序。

在更旧版本的 Windows 或者平台上，此功能将仅降低自身的进程优先级。

在其他操作系统上则什么都不做。

当 EcoQoS 成功启用时，PBH 的图形用户界面（GUI）窗口将显示一个叶子图标，以作为启用状态的视觉提示：

![EcoQoS 图标](./assets/ecoqos.png)

若您希望关闭此功能，请编辑 `config.yml` 文件中的以下配置项：

```yaml
performance:
  # 启用 Windows 平台上的 EcoQoS API以节约能源消耗，作为交换，程序运行速度将降低，定时任务可能推迟
  # Enable EcoQoS API on Windows Platform for power saving, for exchange, the program performance will reduce and cronjobs may delay
  # https://devblogs.microsoft.com/performance-diagnostics/introducing-ecoqos/
  windows-ecoqos-api: true
```

将 `windows-ecoqos-api` 的值从 `true` 更改为 `false`，即可关闭 EcoQoS 节能优化功能。