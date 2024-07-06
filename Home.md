---
banner: "![[Home-20240626131157487.webp]]"
---
# Home

`BUTTON[daily-note]` 🪴 `BUTTON[weekly-note]` 🪴 `BUTTON[light-mode, dark-mode]` 🪴 `BUTTON[tasks]`

```meta-bind-button
label: "Tasks"
icon: ""
hidden: true
id: "tasks"
style: primary
actions:
  - type: open
    link: "[[Tasks]]"
```

```meta-bind-button
label: "📆 Open daily note"
hidden: true
id: "daily-note"
style: primary
actions:
  - type: command
    command: daily-notes
```

```meta-bind-button
style: primary
hidden: true
label: Open Weekly Note
id: weekly-note
action:
  type: command
  command: periodic-notes:open-weekly-note
```

```meta-bind-button
style: destructive
label: Light Mode
id: light-mode
hidden: true
actions:
  - type: command
    command: theme:use-light
```

```meta-bind-button
style: primary
label: Dark Mode
id: dark-mode
hidden: true
actions:
  - type: command
    command: theme:use-dark
```
