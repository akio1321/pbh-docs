# Log

## Hide completed log information

By default, PBH will print a line of log at the end of each Peers check. If you find this annoying, you can turn it off:

```yaml
# Logger configuration
logger:
  # Do you want to hide the log message of [Completed] checked XX's X active Torrents and X peers?
  # It can help to significantly reduce the number of logs on DSM's ContainerManager and only record valuable logs such as bans.
  hide-finish-log: false
```

## Historical logs

PBH will store log files in `data/logs` by default. Among them, `latest.log` is the latest log file of the day/last run. Any past historical log files will be automatically packaged and archived.
