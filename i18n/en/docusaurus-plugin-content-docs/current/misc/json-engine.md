# JSON Rule Engine
PBH uses a JSON rule engine to parse rules.

Here is a simple example of a JSON rule:

```yaml
  client-name-blacklist:
    enabled: true
    banned-client-name:
      - '{"method":"CONTAINS","content":"xunlei"}'
```

Its function is to ban any Peer with the keyword Xunlei in the ClientName.

## JSON Rule Engine - Matching Modes

All rules must specify a matching mode `method`. Here is a list of matching modes currently supported by PBH, all matching modes ignore case:

* `STARTS_WITH` - Matches the beginning string, the given parameter must start with the specified string
  * Available extended parameters:
    * `content` The beginning string to check
* `ENDS_WITH` - Matches the ending string, the given parameter must end with the specified string
  * Available extended parameters:
    * `content` The ending string to check
* `CONTAINS` - Matches whether it contains a substring, the given parameter must contain the specified string
  * Available extended parameters:
    * `content` The substring to check
* `EQUALS` - Exact match, the given parameter must be exactly the same as the content of the matching template
  * Available extended parameters:
    * `content` Exact match template
* `LENGTH` - Matches the length of the string, the given parameter must be within the specified range
  * Available extended parameters:
    * `min` Minimum length
    * `max` Maximum length
* `REGEX` - Matches regular expressions, the given parameter must be hit by the provided regular expression
  * Available extended parameters
    * `content` Regular expression

## Condition Control

Each rule execution will choose one of `TRUE`, `FALSE` and `DEFAULT` as the return value.

For **if conditions**, `TRUE` and `DEFAULT` both return true results, `FALSE` returns false results.
For **ban rules**, `TRUE` will ban Peer, `FALSE` will **force** Peer to pass (priority is higher than ban), and `DEFAULT` will keep default, do nothing.

For if conditions, if the user does not explicitly specify, always return TRUE, so that the condition is true, execute the rule.
For ban rules, if the user does not explicitly specify, the hit behavior always returns TRUE, so that the condition is true, ban Peer; while the miss behavior always returns DEFAULT, keep default, do not do extra operations.

### Custom Return Types

PBH's JSON rule engine provides two fields, `hit` and `miss`. By default, they are `TRUE` and `DEFAULT`, here is an example:

```json
{"method":"CONTAINS","content":"xunlei 0019","hit": "FALSE"}
```

This rule specifies that when the rule is hit, return `FALSE`, so that Xunlei 0019 is forced to pass (the priority of pass is higher than ban).

### if Control

PBH's JSON rule engine allows you to do if nesting. As mentioned before, each rule will return a logical value, which can also be parsed by the if field. When the if field of a rule is parsed as `FALSE`, this rule will not be executed.

Here is an example, through if nesting to achieve the ban of Xunlei, but not ban Xunlei 0019:

```json
{
	"method": "CONTAINS",
	"if": {
		"method": "CONTAINS",
		"content": "xunlei 0019",
		"hit": "FALSE"
	},
	"content": "xunlei"
}
```

In this example, although the top-level rule requires banning all clients containing the xunlei keyword, the user provides the if field, so PBH first checks whether the result of the if field is true. As you can see, when the secondary rule inside if is hit, it returns the `FALSE` logical value, so the execution result of the if field is false, and this ban command is not executed this time.

### if Nesting

Although the if field inside the if rule can nest another rule, it is absolutely readability hell. Try to avoid doing this!

### Whitelist Mode

:::note
This is an example, do not use the whitelist function in practice, because malicious Peer will disguise themselves
:::

The new JSON rule engine allows users to write whitelist mode rules, the operation is simple:

First add a regular expression to ban all clients:
```yaml
  client-name-blacklist:
    enabled: true
    banned-client-name:
    - '{"method": "REGEX", "content": "*", "hit": "TRUE"}'
```

Then we force each client you want to pass one by one, such as qBittorrent:

```yaml
  client-name-blacklist:
    enabled: true
    banned-client-name:
    - '{"method": "REGEX", "content": "*", "hit": "TRUE"}'
    - '{"method": "CONTAINS", "content": "qbittorrent", "hit": "FALSE"}'
```

This achieves the effect of a whitelist.
