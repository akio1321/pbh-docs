# Windows

## EcoQoS 节流 （Windows 11 22H2+）

在 22H2 或更高版本的 Windows 11 中，如果系统 BIOS 和 CPU 支持，则 PeerBanHelper 会启用 [EcoQoS](https://devblogs.microsoft.com/performance-diagnostics/introducing-ecoqos/) 省电优化。在 Windows 10 上或者其它处理器平台，只会更改进程优先级。而在其它操作系统上则什么都不做。  
缓解 PBH 在每次检测时突发计算量引发的 CPU 睿频造成的瞬时电量消耗，并降低自身优先级，将更多系统资源让给其他程序。  

当 EcoQoS 成功启用时，PBH 的 GUI 窗口上会显示一个叶子图标：

![EcoQoS](./assets/ecoqos.png)

要关闭系统功能，请编辑 `config.yml` 中的：

```yaml
performance:
  # 启用 Windows 平台上的 EcoQoS API以节约能源消耗，作为交换，程序运行速度将降低，定时任务可能推迟
  # Enable EcoQoS API on Windows Platform for power saving, for exchange, the program performance will reduce and cronjobs may delay
  # https://devblogs.microsoft.com/performance-diagnostics/introducing-ecoqos/
  windows-ecoqos-api: true
```