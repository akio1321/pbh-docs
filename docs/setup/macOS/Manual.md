---
sidebar_position: 2
---

# 手动部署

## 安装依赖项

为了运行 PeerBanHelper，您需要先安装 Java 开发工具包（JDK）。使用 Homebrew，您可以轻松地安装 Zulu JDK，这是一个开源且广泛使用的 Java 版本。

执行以下命令以安装 Zulu JDK：

```shell
brew install --cask zulu
```

安装完成后，您可以通过运行以下命令来验证 JDK 是否成功安装：

```shell
java -version
```

如果安装成功，终端将显示类似以下的版本号信息：

```plain
OpenJDK version "23.0.1" 2024-10-15
OpenJDK Runtime Environment Zulu23.30+13-CA (build 23.0.1+11)
OpenJDK 64-Bit Server VM Zulu23.30+13-CA (build 23.0.1+11, mixed mode, sharing)
```

## 运行 PeerBanHelper

接下来，您需要下载 PeerBanHelper 的 JAR 文件。请访问 Github Release 页面，并下载最新版本的 [PeerBanHelper.jar](https://github.com/PBH-BTN/PeerBanHelper/releases/latest/download/PeerBanHelper.jar)。

下载完成后，您可以使用以下命令启动 PeerBanHelper，该命令将在无图形用户界面（NoGUI）模式下运行：

```shell
java -Djava.awt.headless=true -Xmx512M -Xss512k -XX:+UseG1GC -XX:+UseStringDeduplication -XX:+ShrinkHeapInSteps -jar /path/to/PeerBanHelper.jar nogui
```

请注意，您需要将 `/path/to/PeerBanHelper.jar` 替换为您下载的 JAR 文件的实际路径。

## 配置为系统服务

为了方便管理，您可以将 PeerBanHelper 配置为 macOS 的启动项服务。为此，请按照以下步骤操作：

1. 在您的主目录下创建或编辑 `~/Library/LaunchAgents/peerbanhelper.plist` 文件。

2. 将以下内容复制并粘贴到 `peerbanhelper.plist` 文件中：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>peerbanhelper</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/java</string>
        <string>-Djava.awt.headless=true</string>
        <string>-Xmx512M</string>
        <string>-Xss512k</string>
        <string>-XX:+UseG1GC</string>
        <string>-XX:+UseStringDeduplication</string>
        <string>-XX:+ShrinkHeapInSteps</string>
        <string>/path/to/PeerBanHelper.jar</string>
        <string>nogui</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>WorkingDirectory</key>
    <string>/path/to/PBH</string>
</dict>
</plist>
```

3. 在上述配置中，请将 `/path/to/PeerBanHelper.jar` 替换为您下载的 JAR 文件的实际路径，并将 `/path/to/PBH` 替换为包含 JAR 文件的目录路径。

4. 保存并关闭 `peerbanhelper.plist` 文件。

5. 最后，使用以下命令加载并启动 PeerBanHelper 服务：

```shell
launchctl load -w ~/Library/LaunchAgents/peerbanhelper.plist
```

现在，PeerBanHelper 将在系统启动时自动运行，并且您可以通过 `launchctl` 命令来管理它的运行状态。