# Change Log

All notable changes to the **T2PY** extension are documented in this file.  
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---
## [0.0.4] - 2025-11-11
### Added
- New command **"Normalize Paths"**:
  - Helps with normalizing selected paths
  - Supports both single-line selection and full-document validation (automatically detects and ignores non-path lines).

---
## [0.0.3] - 2025-11-05
### Added
- New command **"Validate File Paths"**:
  - Instantly validates whether file system paths actually exist on your machine.
  - Appends a clear status marker ">> success" or ">> fail" aligned to the right of each path.
  - Supports both single-line selection and full-document validation (automatically detects and ignores non-path lines).
  - Handles various formats gracefully, including quoted paths, comma-separated lists, and Python-style arrays.

---

## [0.0.2] - 2025-11-02
### Added
- New command **"Convert Lines to Python List"**:
  - Converts selected text lines into a valid Python list.
  - Normalizes Windows-style slashes (`\` to `/`) for cross-platform compatibility.
  - Automatically adds quotes and commas.
  - Includes an interactive snippet placeholder for variable naming (`${1:my_list}`).

### Improved
- Project structure and `.vscode` debug configuration for smoother development workflow.

---

## [0.0.1] - 2025-11-01
### Added
- Initial project setup via `yo code`.
- Basic **"Hello World"** command.
- Webpack and TypeScript build configuration.
- Base `.vscodeignore`, `.gitignore`, and debug setup.

---

**Author:** Roman Volodin  
**Repository:** [GitHub – t2py](https://github.com/volodinroman/t2py)
