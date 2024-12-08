# Banlist Invoker

PBH can handle banlists in a variety of ways, not only by invoking BT clients' ban APIs. Here is how it can generate an `ipfilter.dat` file and execute system commands.

## Generate Local `ipfilter.dat`

PBH can generate an `ipfilter.dat` file alongside the banlist operations for other downloaders to use.


```yaml
# Banlist handling
# PBH can also do more than invoke BT client's ban APIs, to adapt better to various clients.
banlist-invoker:
  # Generate ipfilter.dat file
  ipfilter-dat:
    enabled: false

  # Execute a specific system command
  command-exec:
    enabled: false
    reset:
      - "/bin/sh -c 'ipset destroy peerbanhelper-blocklist'"
      - "/bin/sh -c 'ipset create peerbanhelper-blocklist hash:ip'"
      - "/bin/sh -c 'iptables -I INPUT -m set --match-set peerbanhelper-blocklist src -j DROP'"
      - "/bin/sh -c 'iptables -A OUTPUT -m set --match-set peerbanhelper-blocklist dst -j DROP'"
    ban:
      - "/bin/sh -c 'ipset add peerbanhelper-blocklist ${peer.ip}'"
    unban:
      - "/bin/sh -c 'ipset remove peerbanhelper-blocklist ${peer.ip}'"
```

## Configuration File

```yaml
# Banlist handling
# PBH can also do more than invoke BT client's ban APIs, to adapt better to various clients.
banlist-invoker:
  # Generate ipfilter.dat file
  ipfilter-dat:
    enabled: false
  
  # Execute a specific system command
  command-exec:
    enabled: false
    reset:
      - "/bin/sh -c 'ipset destroy peerbanhelper-blocklist'"
      - "/bin/sh -c 'ipset create peerbanhelper-blocklist hash:ip'"
      - "/bin/sh -c 'iptables -I INPUT -m set --match-set peerbanhelper-blocklist src -j DROP'"
      - "/bin/sh -c 'iptables -A OUTPUT -m set --match-set peerbanhelper-blocklist dst -j DROP'"
    ban:
      - "/bin/sh -c 'ipset add peerbanhelper-blocklist ${peer.ip}'"
    unban:
      - "/bin/sh -c 'ipset remove peerbanhelper-blocklist ${peer.ip}'"
```