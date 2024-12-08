# Multi-Dialing Blocker

Some leechers acquire a large number of IP addresses from the same subnet by using multi-dialing or by exploiting insider connections within ISPs.  
Although ARB has nearly the same functionality as this module, it only activates when a ban occurs. The multi-dialing blocker, on the other hand, does not require a ban to trigger; it actively detects connected peers.

When the number of IP addresses from the same subnet exceeds the specified limit while connecting to the same torrent, subnet banning will be initiated.

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