---
sidebar_position: 1
---

# Debian/Ubuntu/Kali Linux

>Suitable for Debian-derived distributions, such as Ubuntu, Kali Linux, etc.

## Install dependencies

```shell
sudo apt-get update
sudo apt-get install openjdk-21-jdk-headless -y
```

Verify:

```shell
java -version
```

You will get the following output if you have successfully installed:

```plain
openjdk version "xx.xx.xxx" 2024-01-16
OpenJDK Runtime Environment (build xxxxxxx)
OpenJDK 64-Bit Server VM (build xxxxxxx, mixed mode, sharing)
```

## Install
Download the deb file from [Release](https://github.com/PBH-BTN/PeerBanHelper/releases/latest)

Install the deb:

```shell
sudo dpkg -i peerbanhelper_*.*.*_all.deb
```

## Run
```shell
systemctl start peerbanhelper
```

## Auto-start
```shell
systemctl enable peerbanhelper
```
