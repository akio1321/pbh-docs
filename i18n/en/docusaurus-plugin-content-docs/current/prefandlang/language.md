#  Internationalization

By default, the UI language of PeerBanHelper follows the system language, while the WebUI language follows the browser language.

## Change UI language

To change the UI language, you can do it by modifying the configuration file:

```yaml
# Set the program language
# Set the program language
# default Follow the operating system
# en_us English (US)
# zh_cn Chinese Simplified (Simplified Chinese)
language: default
```

When the given language is not supported, English will be used as a fallback.
When the given language is supported but the text is missing, English will be used first and then the fallback language (default: Simplified Chinese) will be used.

## Custom language

There are several directories named with language codes under `data/lang/overrides`. If there is no directory for the language you need to customize, you can manually create it, and PBH will automatically recognize it.
After opening one of the files, you probably notice: the whole file is empty. This is because PBH uses a loading logic called "override loading". That is, it first loads the language file from inside the JAR, and then uses the files in the overrides directory to override the entries in the internal language file.

In this way, when we update the translation file, users using the old translation file will not encounter display problems due to missing entries.

## Use the override language system

It's simple, just write the content you need to modify, like this:

Original text:

```yaml
IP_BAN_RULE_UPDATE_TYPE_AUTO: "Automatic update"
```

New text written into the override file:

```yaml
IP_BAN_RULE_UPDATE_TYPE_AUTO: "It updates itself"
```
