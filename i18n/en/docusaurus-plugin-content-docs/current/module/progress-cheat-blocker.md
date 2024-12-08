# Progress Checker

The Progress Cheat Blocker (ProgressCheatBlocker), sometimes referred to as PCB or the heuristic detection algorithm, is a heuristic anti-cheating algorithm based on download progress, created by PeerBanHelper.

## Overview

Traditional anti-cheating methods usually rely on checking PeerID or ClientName for blocking. This works well for peers like *Thunder* or *QQ旋风* that truthfully report their PeerID. However, if a malicious cheater impersonates a normal client like qBittorrent or Transmission, traditional methods become ineffective.

PeerBanHelper continuously tracks the active peers on all active torrents, monitoring their progress in real-time. PeerBanHelper will block peers when the following conditions occur:

* Peer does not report their progress, keeping it at 0%.
* Peer reports a progress value that does not match the actual downloaded progress.
* Peer’s progress resets to zero after reconnecting, or the progress decreases by more than a certain threshold (progress rollback).
* Peer continues downloading after reaching 100% of the torrent size (excessive download).

For the Progress Checker, progress determination is based not on individual IP addresses but on "IP groups." IP addresses in the same group are considered as one peer, regardless of whether the IP, port, PeerID, or ClientName are the same.
* For IPv4, the default group size is `/32`, which represents a single IPv4 address.
* For IPv6, the default group size is `/60`, which is typically the prefix size assigned to routers.

PBH continuously tracks the peer’s download progress and calculates their upload volume and upload increments. When a peer's statistics are reset for some reason (e.g., changing port or PeerID), PBH corrects their progress using previously recorded data to prevent progress cheating.

## Configuration File

```yaml
  # Progress Cheat Blocker
  # Note: Sometimes it may incorrectly ban some clients if they enabled "Super Seeding", but in most cases, it can accurately detect the cheat/bad peers.
  progress-cheat-blocker:
    enabled: true
    # Skip the check if torrent smaller than this value, unit: bytes, peer may have no chance to sync the progress
    minimum-size: 50000000
    # Max difference, float percentage (1.0=100%, 0.5=50%)
    # PeerBanHelper will use BT client recorded data to check the actual uploaded bytes, and calculate minimal progress that this peer should have
    # and compare with peer reported progress
    # If peer reported progress is smaller than our calculated progress too much, we will consider it's cheating
    maximum-difference: 0.1
    # Progress rewind detection
    # Default: Up to 7% rewind is allowed
    # (Sometimes the pisces may break during transfer, client may drop those pisces, we allow client have rewind in reasonable range)
    rewind-maximum-difference: 0.07
    # Excessive download - Block peers that download even more bytes on a single torrent than the torrent itself
    # Not working with Transmission
    block-excessive-clients: true
    # Calculation threshold
    # IsExcessive = uploaded > (torrent_size * excessive-threshold)
    excessive-threshold: 1.5
    # IPV4 prefix length, same prefix will trick as a same user
    # 32 = Single IP address, ISP usually only allocate single IPV4 for one user
    ipv4-prefix-length: 32
    # IPV6 prefix length, same prefix will trick as a same user
    # 64 = The common prefix length that ISP allocate for one user
    ipv6-prefix-length: 60
    ban-duration: 2592000000
    # Enable persist recording
    # May increase disk I/O and impact the performance
    enable-persist: true
    # Persist duration
    # Increase this value can alleviate "Slow forgetting attack", This helps stop bad peers from taking advantage of this weakness to reset their data records.
    # Decrease this value may lead to "Slow forgetting attack"
    persist-duration: 1209600000
```

## Limitations

* If "Allow multiple connections from the same IP address" is not disabled on the downloader, it may cause incorrect statistics and cause rapid growth. This option is disabled by default.