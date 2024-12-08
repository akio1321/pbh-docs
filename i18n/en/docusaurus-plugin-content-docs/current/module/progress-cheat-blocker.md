# Progress Checker

The Progress Checker (ProgressCheatBlocker) (sometimes referred to as PCB or heuristic detection algorithm) is a heuristic anti-leech detection algorithm based on download progress created by PeerBanHelper.

## Overview

Traditional anti-leech methods usually rely on checking PeerID or ClientName to block peers. This works well for peers like *Xunlei* or *QQDownload* that report their PeerID truthfully. However, if malicious leechers impersonate normal clients like qBittorrent or Transmission, traditional anti-leech methods will completely fail.

PeerBanHelper continuously tracks the active peers on all active torrents, monitoring their progress in real-time. PeerBanHelper will block peers when the following conditions occur:

* Peer does not report their progress, keeping it at 0%.
* Peer reports a progress value that does not match the actual downloaded progress.
* Peer’s progress resets to zero after reconnecting, or the progress decreases by more than a certain threshold (progress rollback).
* Peer continues downloading after reaching 100% of the torrent size (excessive download).

For the Progress Checker, progress determination is based not on individual IP addresses but on "IP groups." IP addresses in the same group are considered as one peer, regardless of whether the IP, port, PeerID, or ClientName are the same.
* For IPv4, the default group size is `/32`, which represents a single IPv4 address.
* For IPv6, the default group size is `/60`, which is typically the prefix size assigned to routers.

PBH continuously tracks the peer’s download progress and calculates their upload volume and upload increments. When a peer's statistics are reset for some reason (e.g., changing port or PeerID), PBH corrects their progress using previously recorded data to prevent progress cheating.

![PCB](./assets/pcb.jpeg)

## Progress Discrepancy

PeerBanHelper calculates the peer's current minimum progress based on downloader data, local record data, and peer-reported data. If the peer's progress is less than the minimum progress (false reporting progress), PeerBanHelper will block the peer.

## Excessive Download

The goal of malicious peers is to download as much data as possible from the victim. Therefore, PeerBanHelper calculates the peer's downloaded volume based on downloader data, local record data, and peer-reported data.

This calculated download volume does not rely entirely on the downloader, as attackers can easily deceive and reset the downloader's statistics.

If the peer's downloaded volume exceeds a certain proportion of the total volume of data owned by the current user (i.e., downloading more data than the total size of the torrents owned), PeerBanHelper will block the peer.

## Persistent Records

When turned off, all data is stored in memory. When memory is insufficient or not used for a period of time, the data will be cleared and deleted. At this point, PeerBanHelper will "forget" the previously recorded data.

When persistent records are enabled, the data will be saved to the database before being deleted from memory and reloaded when needed in the future (as long as the data has not expired). This effectively prevents attackers from using guerrilla tactics and cache forgetting attacks.

## Quick PCB Test

A quick detection algorithm. When the peer's download progress (calculated) reaches the "Quick PCB Test Activation Threshold," PeerBanHelper will temporarily block the peer (default is 30 seconds) to disconnect and then unblock shortly after. Some malicious clients will reset their reported progress to zero after disconnecting, allowing PCB anti-cheat to immediately capture this anomaly and speed up the blocking of abnormal and malicious clients, reducing traffic loss.

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