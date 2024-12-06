# 国际化支持

PeerBanHelper 的用户界面（UI）语言默认会随系统语言设置而变化，而其 Web 用户界面（WebUI）的语言则遵循浏览器的语言偏好设置。

## 调整 UI 语言

若需更改 UI 语言，可通过编辑配置文件来实现：

```yaml
# 配置程序语言
# Set the application language
# default：随操作系统语言（Follow the operating system language）
# en_us：美式英语（English (US)）
# zh_cn：简体中文（Chinese Simplified (简体中文)）
language: default
```

若所选语言不受支持，系统将默认采用英语。若所选语言受支持但部分文本缺失，系统将首先尝试使用英语作为备选语言，若仍不可行，则最终回退到默认语言（简体中文）。

## 自定义语言

在 `data/lang/overrides` 目录下，您会发现多个以语言代码命名的文件夹。若您希望自定义的语言不在此列，可手动创建对应文件夹，PeerBanHelper 会自动识别。

打开这些文件夹中的文件时，您可能会发现文件是空的。这是因为 PeerBanHelper 采用了一种称为“覆盖加载”的机制：它首先加载 JAR 包中的语言文件，随后再根据 `overrides` 目录中的文件对已有词条进行覆盖。

此机制确保了即使在翻译文件更新后，使用旧翻译文件的用户也不会因词条缺失而遇到显示问题。

## 应用覆盖语言设置

使用覆盖语言系统非常简单，您只需在覆盖文件中添加或修改所需内容即可。例如：

原词条：

```yaml
IP_BAN_RULE_UPDATE_TYPE_AUTO: "自动更新"
```

在覆盖文件中修改为：

```yaml
IP_BAN_RULE_UPDATE_TYPE_AUTO: "自动更新（自定义）"
```

或者，完全替换为新的文本：

```yaml
IP_BAN_RULE_UPDATE_TYPE_AUTO: "它会自动进行更新"
```