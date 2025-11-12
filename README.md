# T2PY

A lightweight VS Code extension for Python developers to streamline everyday file path and text manipulation tasks.  T2PY serves as a practical swiss-knife for Python workflows, eliminating repetitive manual edits.


## Features

- **Convert Lines to Python List** – Convert selected text lines into a properly formatted Python list with quotes, commas, and variable assignment.  
- **Validate File Paths** – Check if file system paths exist, appending inline `>> success` or `>> fail` markers.  
- **Normalize Paths** – Clean and standardize file paths across your document for consistent, cross-platform syntax.


## Convert Lines to Python List

**Command:** `t2py: Convert Lines to Python List`

- Converts raw text into a valid Python list.
- Normalizes slashes (`\` → `/`).
- Adds quotes, commas, and a rename-ready snippet variable (default: `my_list`).


```
# Original
/home/user/project/.vscode/tasks.json
/home/user/project/.vscode/settings.json

# Result
my_list = [
  "/home/user/project/.vscode/tasks.json",
  "/home/user/project/.vscode/settings.json"
]
```

## Validate File Paths

**Command:** `t2py: Validate File Paths`

* Checks each line for valid paths.
* Adds aligned `>> success` or `>> fail` indicators.
* Works on selections or full documents.
* Ignores comments and unrelated lines.


```
/home/user/project/.vscode/tasks.json      >> success
/home/user/project/.vscode/invalid.json    >> fail
```

## Normalize Paths

**Command:** `t2py: Normalize Paths`

Standardizes path syntax for Python and cross-platform compatibility.

* Converts `\` to `/`.
* Removes duplicate slashes.
* Preserves URL schemes (`https://`, `file://`).
* Handles UNC paths (`//server/share`).
* Expands `~/` to the user’s home directory.
* Skips comments and blank lines.


```
# Original
C:\Projects\\MyApp\\src\\main.py
\\server\\share\\config.json
~/Documents//notes.txt
https://example.com//data
/home//user///workspace

# Normalized
C:/Projects/MyApp/src/main.py
//server/share/config.json
/home/user/Documents/notes.txt
https://example.com//data
/home/user/workspace
```

### Usage Notes

* Works automatically on selected text or the entire file if nothing is selected.
* Ideal for preparing file lists, cleaning mixed paths, or validating datasets.