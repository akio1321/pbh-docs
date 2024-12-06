# Subscription Rules

One of the important modules of PeerBanHelper, it subscribes to rules from [PBH-BTN/BTN-Collected-Rules](https://github.com/PBH-BTN/BTN-Collected-Rules) by default.  
When an IP from the rules connects to the downloader, PeerBanHelper will immediately block it.

It is not recommended to configure this feature through the configuration file; you can directly use the visual editor in the WebUI.

## Creating Rules

PeerBanHelper can load an IP rule set composed of the following:

* IP addresses (supports v4 and v6), e.g., 1.2.3.4
* CIDR, e.g., 1.2.3.0/24
* Single-line comments starting with `#` (line-end comments are not supported)

## Configuration File

```yaml
  # Subscription Rules
  # Rules Subscription
  # It is recommended to configure this module on WebUI
  # Recommended configure this module on WebUI
  ip-address-blocker-rules:
    enabled: true
    # Ban duration in milliseconds, use default to follow global settings
    ban-duration: 259200000
    # Check interval
    check-interval: 14400000 # Checks every 4 hours in milliseconds; Timeunit: ms
    # Rules list
    rules:
      # Rule ID (any)
      all-in-one:
        # Enable?
        enabled: true
        # Display Name
        name: all-in-one
        # Rule file subscription address
        url: https://bcr.pbh-btn.ghorg.ghostchu-services.top/combine/all.txt
```