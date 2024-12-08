# HTTP Server Configuration

PeerBanHelper integrates Javalin as its built-in HTTP server to support the WebUI management interface and interact with some downloaders.

## Modify WebUI Port Number

```yaml
# Http 服务器设置
# Http Server Settings
server:
  # WebUI 监听端口
  # WebUI listen port
  http: 9898
```

## Restrict Local Network Access for WebUI Listening

To enhance security, you can configure the listening address of the WebUI to allow only local access.

```yaml
# Http 服务器设置
# Http Server Settings
server:
  ...
  # WebUI 监听地址，如果需要从非本机访问，请修改为 0.0.0.0，本机部署建议使用 127.0.0.1 提高安全性
  # WebUI listen address, if you need access from non-localhost location, change it to 0.0.0.0. Locally deploy use 127.0.0.1 is recommended.
  address: "0.0.0.0"
```

Setting `address` to `"127.0.0.1"` ensures that only local machines can access the endpoints for the WebUI and the download ban list.

## Use Customized WebUI

PeerBanHelper supports loading a customized WebUI file from the filesystem.

You need to manually create a `static` directory within the `data/` folder, and place your customized WebUI files there. Then add corresponding settings in the configuration file to enable the custom WebUI:

```yaml
# Http 服务器设置
# Http Server Settings
server:
  ...
  # 使用外部 WebUI
  external-webui: true
```

## Cross-Origin Resource Sharing (CORS) Configuration

Out of security considerations, PeerBanHelper enables CORS protection by default. If you are using a non-built-in HTTP server's WebUI, you need to disable the CORS protection.

```yaml
# Http 服务器设置
# Http Server Settings
server:
  ...
  # 允许 CORS 跨站，仅在使用外部 PBH WebUI 时才应该启用
  # Allow CORS, should be enabled when you use external WebUI only.
  allow-cors: false
```

Setting `allow-cors` to `true allows cross-domain access, but please be aware of potential security risks.

## Modify WebUI Access Token

If you have forgotten the WebUI's access token or wish to change it, update this in your configuration file:

```yaml
# Http 服务器设置
# Http Server Settings
server:
  ...
  # 要访问 WebUI 端点，则需要 Token。如果这里为空，PBH 在启用时将进入 OOBE 向导，指导您进行基本配置
  # To access the WebUI endpoint, token is required. If there is empty string, OOBE will start to guide you set it.
  token: ""
```

## Developing Customized WebUI/WebAPI

We encourage developers to create or improve the WebUI for PeerBanHelper.

Since version 6.0.1, you can view the complete API documentation at:

[https://peerbanhelper.apifox.cn](https://peerbanhelper.apifox.cn)

Please note: If continuous authentication failures exceed 10 times for a WebAPI endpoint, your IP address will be blacklisted for 15 minutes by the brute-force protection system.

## Complete Configuration File Example

```yaml
# Http 服务器设置
# Http Server Settings
server:
  # WebUI 监听端口
  # WebUI listen port
  http: 9898
  # WebUI 监听地址，如果需要从非本机访问，请修改为 0.0.0.0，本机部署建议使用 127.0.0.1 提高安全性
  # WebUI listen address, if you need access from non-localhost location, change it to 0.0.0.0. Locally deploy use 127.0.0.1 is recommended.
  address: "0.0.0.0"
  # 在 PBH 需要给下载器传递地址时，将使用此地址传递，请确保此地址最终可被下载器访问，请【不要】以 / 结尾
  # When PBH need pass the URL of blocklist to downloader, it will use this address as prefix, make sure this URL can be access from your downloader. DO NOT end with slash (/)
  prefix: "http://127.0.0.1:9898"
  # 要访问 WebUI 端点，则需要 Token。如果这里为空，PBH 在启用时将进入 OOBE 向导，指导您进行基本配置
  # To access the WebUI endpoint, token is required. If there is empty string, OOBE will start to guide you set it.
  token: ""
  # 允许 CORS 跨站，仅在使用外部 PBH WebUI 时才应该启用
  # Allow CORS, should be enabled when you use external WebUI only.
  allow-cors: false
```