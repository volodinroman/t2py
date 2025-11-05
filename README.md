# T2PY

A lightweight VS Code extension designed for Python developers to automate everyday routines. T2PY acts as a versatile swiss knife for Python workflows, accelerating productivity on repetitive tasks.


## Features

* **Convert Lines to Python List**. Convert any selected lines of text into a syntactically correct Python list, adding quotes, commas, and variable assignment automatically.
* **Validate File Paths**. Verify the existence of file system paths directly in your document, with clear success/fail indicators appended inline.


## Convert Lines to Python List

Command `t2py: Convert Lines to Python List`

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

Command `t2py: Validate File Paths`

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