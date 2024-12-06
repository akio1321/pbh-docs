---
sidebar_position: 1
---

# Debian/Ubuntu/Kali Linux 系统部署

>本指南适用于Debian、Ubuntu以及Kali Linux等基于Debian的Linux发行版。

## 安装所需依赖

为了运行 PeerBanHelper，您需要先安装 OpenJDK 21 或更高版本的 Java 开发工具包（JDK）。使用 `apt` 包管理器，您可以轻松地完成安装。

执行以下命令以更新包列表并安装 OpenJDK 21（请注意，版本号可能会随着新版本的发布而有所变化，这里以21为例）：

```shell
sudo apt-get update
sudo apt-get install openjdk-21-jdk-headless -y
```

安装完成后，您可以通过运行以下命令来验证 JDK 是否成功安装：

```shell
java -version
```

如果安装成功，终端将显示类似以下的版本号信息，其中“xx.xx.xxx”等表示具体的版本号：

```plain
OpenJDK version "xx.xx.xxx" xxxx-xx-xx
OpenJDK Runtime Environment (build xxxxxxx)
OpenJDK 64-Bit Server VM (build xxxxxxx, mixed mode, sharing)
```

## 下载并安装 PeerBanHelper

接下来，您需要下载 PeerBanHelper 的 DEB 安装包。请访问 [PBH最新版版本发布页](https://github.com/PBH-BTN/PeerBanHelper/releases/latest) 并下载适用于您系统的 DEB 文件。

下载完成后，使用以下命令安装 DEB 文件（请注意替换文件名中的版本号等信息）：

```shell
sudo dpkg -i peerbanhelper_*.*.*_all.deb
```

系统可能会提示您安装一些额外的依赖项，按照提示操作即可。

## 启动并配置 PeerBanHelper

安装完成后，您可以使用以下命令启动 PeerBanHelper 服务：

```shell
systemctl start peerbanhelper
```

如果您希望 PeerBanHelper 在系统启动时自动运行，可以执行以下命令将其设置为开机启动：

```shell
systemctl enable peerbanhelper
```

现在，PeerBanHelper 已经在您的系统上运行，并且会在每次系统启动时自动启动。您可以通过 `systemctl status peerbanhelper` 命令来检查服务的运行状态。