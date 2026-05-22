@AGENTS.md

# Software Engineering Study Platform

## PDF to Markdown Tool

A `pdf-to-md` CLI is available at `~/warp/pdf-to-md/`. Use it to convert any PDF the user provides into readable markdown.

### How to convert PDFs
- Single file to stdout: `node ~/warp/pdf-to-md/pdf-to-md.js <file.pdf> --stdout`
- Single file to a directory: `node ~/warp/pdf-to-md/pdf-to-md.js <file.pdf> --output-dir <dir>`
- All PDFs in a folder: `node ~/warp/pdf-to-md/pdf-to-md.js <folder>/ --output-dir <dir>`

### When the user gives you a PDF
1. Convert it with the tool above
2. Read the converted markdown to understand the content
3. Use it to generate quizzes, practice exams, summaries, or whatever the user asks for
