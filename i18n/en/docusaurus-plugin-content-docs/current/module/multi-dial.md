# Multi-Dialing Blocker

Some malicious users acquire a large number of IP addresses from the same subnet by using multi-dialing or similar methods.  
Although ARB (Automatic Range Blocking) has nearly the same functionality as this module, it only activates when a ban condition is met. In contrast, the multi-dialing blocker actively monitors connected peers without waiting for a ban command.

When the number of IP addresses from the same subnet exceeds the specified threshold and these IPs are connected to the same torrent, subnet banning will be initiated.

![multi-dial](./assets/multi-dial.png)

## Hunting

If an IP is determined to be using multi-dialing, it will continue to search for all other peers within the same subnet, ignoring cache time limits.

Enabling this feature will consume some additional runtime memory.

## Configuration File

```yaml
  # Multi-dialing Blocker
  # Multi-dialing blocker
  multi-dialing-blocker:
    enabled: true
    # Ban duration in milliseconds, use default to follow global settings
    ban-duration: 1296000000
    # IPV4 prefix length
    # The number of common bits in the IP address to consider as the same subnet. The fewer bits, the larger the range. Usually, no need to modify.
    subnet-mask-length: 24
    # IPv6 prefix length
    subnet-mask-v6-length: 60
    # Maximum number of IPs allowed to download the same torrent from the same subnet, positive integer
    # To avoid false positives caused by DHCP reassigning IPs or multiple users in the same area downloading the same torrent
    tolerate-num: 5
    # Cache lifespan in seconds
    # All connected peers will be recorded in the cache. DHCP reassigns IPs periodically, and if the cache time is too long, false bans may occur.
    cache-lifespan: 86400
    # Keep hunting
    # If an IP is flagged as multi-dialing, should the system ignore the cache lifespan and continue hunting for other IPs in the same subnet?
    keep-hunting: true
    # Hunting duration in seconds
    # Effective only when keep-hunting is enabled, similar to cache-lifespan, this controls the duration of cached data for hunted IPs.
    keep-hunting-time: 2592000
  # Rule engine, supports AviatorScript language - User script, support AviatorScript
  # Provides programming ability to write custom rules on PBH - Provide programming ability on PBH
```