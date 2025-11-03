# T2PY

A lightweight VS Code helper for Python developers that automates everyday routines.

Author: Roman Volodin

License: MIT

## Overview

**T2PY** helps you quickly convert plain text into Python-ready data structures — ideal for small repetitive tasks.  
Currently, it includes one core feature: converting selected text lines into a Python list with automatic formatting and path normalization.


## Features

### Lines to Python List convertor

- Convert selected text lines into a valid Python list.
- Normalize Windows-style slashes (`\` → `/`) for Python compatibility.
- Automatically add quotes and commas.
- Insert a snippet variable placeholder (default: `my_list`) so you can rename it instantly.


## Developer Notes (Ubuntu)

* Clone this repo
* Install `Node.js`:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
```

* Install development tools:

```bash
npm install -g yo generator-code
npm install -g vsce
```

* From project root - install dependencies:

```bash
npm install
```

* Build the project

```bash
npm run compile
```

* Run the extension in VS Code

```bash
code .
```

* Package the extension

```bash
vsce package
```

* Install VSIX extension

```bash
code --install-extension t2py-0.0.2.vsix
```