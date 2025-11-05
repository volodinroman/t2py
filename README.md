# T2PY

A lightweight VS Code helper for Python developers that automates everyday routines. This is a swiss knife for Python developers!

## Overview

**T2PY** helps you quickly convert plain text into Python-ready data structures — ideal for small repetitive tasks.  
Currently, it includes one core feature: converting selected text lines into a Python list with automatic formatting and path normalization.

## Features

* `t2py: Convert Lines to Python List` - converts text lines into a Python list;
* `t2py: Validate File Paths` - validates file system paths;


## Lines to Python List convertor

Command `t2py: Convert Lines to Python List`: 

- Convert selected text lines into a valid Python list.
- Normalize Windows-style slashes (`\` → `/`) for Python compatibility.
- Automatically add quotes and commas.
- Insert a snippet variable placeholder (default: `my_list`) so you can rename it instantly.

```python
# Original List
/home/volod/VSCodeExtensions/svggen/.vscode/tasks.json
/home/volod/VSCodeExtensions/svggen/.vscode/settings.json
/home/volod/VSCodeExtensions/svggen/.vscode/launch.json
/home/volod/VSCodeExtensions/svggen/.vscode/extensions.json

# Python List
my_list = [
  "/home/volod/VSCodeExtensions/svggen/.vscode/tasks.json",
  "/home/volod/VSCodeExtensions/svggen/.vscode/settings.json",
  "/home/volod/VSCodeExtensions/svggen/.vscode/launch.json",
  "/home/volod/VSCodeExtensions/svggen/.vscode/extensions.json"
]
```

## Path Validation

Command `t2py: Validate File Paths`:

* Instantly validates whether file system paths actually exist on your machine.
* Appends a clear status marker ">> success" or ">> fail" aligned to the right of each path.
* Supports both single-line selection and full-document validation (automatically detects and ignores non-path lines).
* Handles various formats gracefully, including quoted paths, comma-separated lists, and Python-style arrays.

```
# Original List
/home/volod/VSCodeExtensions/svggen/.vscode/tasks.json
/home/volod/VSCodeExtensions/svggen/.vscode/settings.json
/home/volod/VSCodeExtensions/svggen/.vscode/launch.json
/home/volod/VSCodeExtensions/svggen/.vscode/extensions.json

# Validated list (one item has a typo)
/home/volod/VSCodeExtensions/svggen/.vscode/tasks.json       >> success
/home/volod/VSCodeExtensions/svggen/.vscode/settings.json    >> success
/home/voslod/VSCodeExtensions/svggen/.vscode/launch.json     >> fail
/home/volod/VSCodeExtensions/svggen/.vscode/extensions.json  >> success
```