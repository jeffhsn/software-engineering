@AGENTS.md

# Software Engineering Study Platform

## PDF to Markdown Tool

A `pdf-to-md` CLI is available at `tools/pdf-to-md/` in this project. Use it to convert any PDF the user provides into readable markdown.

### How to convert PDFs
- Single file to stdout: `node tools/pdf-to-md/pdf-to-md.js <file.pdf> --stdout`
- Single file to a directory: `node tools/pdf-to-md/pdf-to-md.js <file.pdf> --output-dir <dir>`
- All PDFs in a folder: `node tools/pdf-to-md/pdf-to-md.js <folder>/ --output-dir <dir>`

### When the user gives you a PDF
1. Convert it with the tool above
2. Read the converted markdown to understand the content
3. Use it to generate quizzes, practice exams, summaries, or whatever the user asks for

## fetch-moodle (pull from Moodle / auth pages)

A `fetch-moodle` CLI is available at `~/tools/fetch-moodle/`. It uses the user's Chrome cookies to download files (PDFs, slides, video recordings, etc.) from Moodle and other auth-protected pages without manual login.

### How to fetch
- Single URL: `~/tools/fetch-moodle/fetch-moodle.sh <url>`
- Multiple URLs: `~/tools/fetch-moodle/fetch-moodle.sh <url1> <url2> ...`
- Custom output dir: add `--out <dir>` (default: `~/Downloads/se-bsc`)
- Different browser: add `--browser safari|firefox|edge` (default: chrome)

### When the user gives you a Moodle URL
1. Run the tool — it downloads into `~/Downloads/se-bsc/` by default
2. The output line lists the new filename(s); read or move them as needed
3. For PDFs, run `pdf-to-md` next to extract text
4. Wire into the site under the right subject/section

If a URL is DRM-protected or behind unsupported auth, the tool fails gracefully — tell the user and link out to Moodle instead.
