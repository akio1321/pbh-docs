# BTN Cloud Rules

Use cloud rules from the BTN network. You need to [configure PBH to access BTN](../btn/connect.md) in advance.

## Configuration File

```yaml
  # Enable the network rules from BTN server
  # Only works when you have configured the BTN server in config.yml
  btn:
    enabled: true
    # Ban duration, in milliseconds. Use 'default' to follow the global settings
    ban-duration: 259200000
