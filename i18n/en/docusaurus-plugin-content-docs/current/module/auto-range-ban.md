# Automatic Range Ban

Due to the latency of the [Progress Checker](./progress-cheat-blocker.md), some traffic from the IP is already leached before the user bans it. This feature is designed to help users stop losses in a timely manner.  
When an IP is banned, ARB will scan all connected peers. If any peer's IP address is in the same subnet as the banned IP, that peer will be chain-banned.

## Configuration File

```yaml
  # Range IP Ban
  # After a peer is banned, other peers in the same IP prefix range as the banned peer will also be banned.
  auto-range-ban:
    # Enable?
    enabled: true
    # Ban duration, in milliseconds. Use 'default' to follow the global settings.
    ban-duration: 604800000
    # IPV4 prefix length
    ipv4: 30
    # IPV6 prefix length
    ipv6: 60
