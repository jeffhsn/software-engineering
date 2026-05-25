# pdf-to-md

A CLI tool that converts PDF files to Markdown. Supports single files, multiple files, and entire directories (recursive).

## Install

```bash
npm install
npm link
```

## Usage

```bash
# Single file
pdf-to-md document.pdf

# Multiple files
pdf-to-md file1.pdf file2.pdf file3.pdf

# Entire folder (recursive)
pdf-to-md ./lectures/

# Custom output directory
pdf-to-md ./lectures/ --output-dir ./output/

# Print to stdout (single file only)
pdf-to-md document.pdf --stdout

# JSON summary to stderr
pdf-to-md ./lectures/ --json-summary
```

## Output

By default, converted `.md` files are saved to `~/Internet/jh/.pdf-to-md/converted/`, mirroring the source folder structure relative to `$HOME`. Use `--output-dir` to override.

## Options

- `--output-dir <dir>` — override output directory
- `--stdout` — print to stdout (single file only)
- `--json-summary` — print JSON conversion report to stderr
- `--no-headings` — disable heading detection
- `--no-lists` — disable list detection
- `--no-code` — disable code block detection
- `--no-tables` — disable table detection
- `--no-clean` — keep original whitespace

## Warp Skill

Includes a Warp skill (`pdf-to-md/SKILL.md`) so Oz knows how to use the tool automatically. Install it to `~/.warp/skills/pdf-to-md/`.
