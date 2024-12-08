# 代理服务器

Although modifying JVM parameters can also enable PBH to use a proxy server, we recommend that you modify the relevant configuration through the configuration file.

## 配置文件
```yaml
# 代理服务器设定
# Proxy server settings
proxy:
  # 代理服务器设置 Proxy server setting
  # 注意：不支持需要密码验证的代理服务器 NOTE: Authentication required proxy servers are not supported
  # 0 = 不使用代理 - No proxy
  # 1 = 使用系统代理 - Use system proxy
  # 2 = 使用 HTTP(s) 代理 - Use HTTP(s) proxy
  # 3 = 使用 socks5 代理(可能无法使用) - Use socks5 proxy (may not work well)
  setting: 1
  # 代理服务器地址 - Proxy server host
  host: "127.0.0.1"
  # 代理服务器端口号 - Proxy server port
  port: 7890
  # 代理例外地址，使用 | 分隔不同条目 - Exception list, spilt with | symbol
  non-proxy-hosts: "localhost|127.*|192.168.*|10.*|172.16.*|172.17.*|172.18.*|172.19.*|172.20.*|172.21.*|172.22.*|172.23.*|172.24.*|172.25.*|172.26.*|172.27.*|172.28.*|172.29.*|172.30.*|172.31.*|*.local|*.lan"

```