#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const DEFAULT_OUTPUT_DIR = path.join(os.homedir(), 'Warp', '.pdf-to-md', 'converted');

// ── Converter ──────────────────────────────────────────────

class PDFToMarkdownConverter {
  constructor(options = {}) {
    this.options = {
      preserveFormatting: true,
      detectHeadings: true,
      detectLists: true,
      detectCodeBlocks: true,
      detectTables: true,
      cleanWhitespace: true,
      ...options
    };
  }

  async convert(pdfPath, filename) {
    try {
      const parser = new PDFParse({ url: pdfPath });
      const textResult = await parser.getText();
      const infoResult = await parser.getInfo();

      const text = textResult.text || '';
      const numPages = infoResult.total || 0;
      const info = infoResult.info || {};

      const markdown = this.processText(text, {
        numPages,
        info,
        filename
      });
      return {
        markdown,
        metadata: { pages: numPages, info }
      };
    } catch (error) {
      throw new Error(`Failed to parse PDF: ${error.message}`);
    }
  }

  processText(text, context) {
    let lines = text.split('\n');

    if (this.options.cleanWhitespace) {
      lines = lines.map(line => line.trim()).filter(line => line.length > 0);
    }

    const processedLines = [];
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const nextLine = lines[i + 1] || '';
      const prevLine = processedLines[processedLines.length - 1] || '';

      if (this.options.detectCodeBlocks) {
        if (this.isCodeBlockStart(line) && !inCodeBlock) {
          processedLines.push('```');
          inCodeBlock = true;
          continue;
        }
        if (this.isCodeBlockEnd(line) && inCodeBlock) {
          processedLines.push('```');
          inCodeBlock = false;
          continue;
        }
      }

      if (inCodeBlock) {
        processedLines.push(line);
        continue;
      }

      if (this.options.detectHeadings) {
        const heading = this.detectHeading(line, nextLine, prevLine);
        if (heading) { processedLines.push(heading); continue; }
      }

      if (this.options.detectLists) {
        const listItem = this.detectListItem(line);
        if (listItem) { processedLines.push(listItem); continue; }
      }

      if (this.options.detectTables && this.isTableRow(line)) {
        processedLines.push(this.formatTableRow(line));
        if (!this.isTableRow(prevLine)) {
          const cols = line.split(/\s{2,}|\t/).length;
          processedLines.push('| ' + Array(cols).fill('---').join(' | ') + ' |');
        }
        continue;
      }

      line = this.processInlineFormatting(line);

      if (line.length > 0) {
        processedLines.push(line);
        if (nextLine && !this.isSpecialLine(nextLine)) {
          processedLines.push('');
        }
      }
    }

    const header = this.createMetadataHeader(context);
    return header + processedLines.join('\n');
  }

  createMetadataHeader(context) {
    const { filename, numPages, info } = context;
    const title = info?.Title || path.basename(filename, '.pdf');
    return `# ${title}\n\n` +
           `> Converted from PDF | Pages: ${numPages}\n\n` +
           `---\n\n`;
  }

  detectHeading(line, nextLine, prevLine) {
    if (line === line.toUpperCase() && line.length > 3 && /^[A-Z\s]+$/.test(line)) {
      return `## ${line}`;
    }
    if (nextLine && /^[=\-]{3,}$/.test(nextLine)) {
      const level = nextLine[0] === '=' ? '#' : '##';
      return `${level} ${line}`;
    }
    const numberedMatch = line.match(/^(\d+\.)+\s+(.+)$/);
    if (numberedMatch) {
      const depth = (numberedMatch[1].match(/\./g) || []).length;
      const level = '#'.repeat(Math.min(depth + 1, 6));
      return `${level} ${line}`;
    }
    if (!prevLine && line.length < 60 && /^[A-Z]/.test(line) && !/[.!?]$/.test(line)) {
      return `### ${line}`;
    }
    return null;
  }

  detectListItem(line) {
    const bulletMatch = line.match(/^[•●○◦▪▫■□\-\*]\s+(.+)$/);
    if (bulletMatch) return `- ${bulletMatch[1]}`;
    const numberedMatch = line.match(/^(\d+[\.\)\]]\s+)(.+)$/);
    if (numberedMatch) return `1. ${numberedMatch[2]}`;
    const letteredMatch = line.match(/^([a-z][\.\)\]]\s+)(.+)$/i);
    if (letteredMatch) return `- ${letteredMatch[2]}`;
    return null;
  }

  processInlineFormatting(line) {
    line = line.replace(/\b([A-Z_]{3,})\b/g, '`$1`');
    line = line.replace(/(https?:\/\/[^\s]+)/g, '[$1]($1)');
    return line;
  }

  isTableRow(line) {
    const parts = line.split(/\s{2,}|\t/);
    return parts.length >= 2 && parts.every(p => p.trim().length > 0);
  }

  formatTableRow(line) {
    const cells = line.split(/\s{2,}|\t/).map(cell => cell.trim());
    return '| ' + cells.join(' | ') + ' |';
  }

  isCodeBlockStart(line) {
    return /^(function|class|const|let|var|def|public|private|protected|import|export)\s/.test(line) ||
           line.match(/^[\s]*[{[(].*[)}\]]\s*[{;]?\s*$/);
  }

  isCodeBlockEnd(line) {
    return /^[\s]*[}\])][;\s]*$/.test(line);
  }

  isSpecialLine(line) {
    return /^#+\s/.test(line) ||
           /^[\-\*\d+\.]\s/.test(line) ||
           /^\|/.test(line) ||
           /^```/.test(line);
  }
}

// ── File discovery ─────────────────────────────────────────

async function findPDFs(dirPath) {
  const results = [];
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...await findPDFs(full));
    } else if (entry.isFile() && /\.pdf$/i.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

async function resolveInputs(args) {
  const files = [];
  for (const arg of args) {
    const abs = path.resolve(arg);
    const stat = await fs.stat(abs);
    if (stat.isDirectory()) {
      files.push(...await findPDFs(abs));
    } else if (stat.isFile() && /\.pdf$/i.test(abs)) {
      files.push(abs);
    }
  }
  return files;
}

// ── Output path logic ──────────────────────────────────────

function computeOutputPath(pdfPath, outputDir) {
  const home = os.homedir();
  const abs = path.resolve(pdfPath);

  let relative;
  if (abs.startsWith(home)) {
    relative = path.relative(home, abs);
  } else {
    relative = abs.replace(/^\//, '');
  }

  return path.join(outputDir, relative.replace(/\.pdf$/i, '.md'));
}

// ── CLI ────────────────────────────────────────────────────

async function main() {
  const raw = process.argv.slice(2);

  if (raw.length === 0 || raw.includes('--help') || raw.includes('-h')) {
    console.log(`
PDF to Markdown Converter

Usage:
  pdf-to-md <inputs...> [options]

  <inputs> can be one or more PDF files and/or directories (recursive).

Options:
  --output-dir <dir>  Write .md files to <dir> (mirrors source structure)
                      Default: ~/.pdf-to-md/converted/
  --stdout            Print markdown to stdout (single file only)
  --json-summary      Print JSON summary to stderr after conversion
  --no-headings       Disable heading detection
  --no-lists          Disable list detection
  --no-code           Disable code block detection
  --no-tables         Disable table detection
  --no-clean          Keep original whitespace
  --help, -h          Show this help

Examples:
  pdf-to-md lecture.pdf
  pdf-to-md lecture1.pdf lecture2.pdf
  pdf-to-md ./lectures/
  pdf-to-md ./lectures/ --output-dir ./lectures-md/
  pdf-to-md paper.pdf --stdout
`);
    process.exit(0);
  }

  // Separate flags from positional args
  const flags = new Set();
  const positional = [];
  let outputDir = null;

  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '--output-dir' && raw[i + 1]) {
      outputDir = path.resolve(raw[++i]);
    } else if (raw[i].startsWith('--')) {
      flags.add(raw[i]);
    } else {
      positional.push(raw[i]);
    }
  }

  if (!outputDir) outputDir = DEFAULT_OUTPUT_DIR;

  const useStdout = flags.has('--stdout');
  const jsonSummary = flags.has('--json-summary');

  const converterOpts = {
    detectHeadings: !flags.has('--no-headings'),
    detectLists: !flags.has('--no-lists'),
    detectCodeBlocks: !flags.has('--no-code'),
    detectTables: !flags.has('--no-tables'),
    cleanWhitespace: !flags.has('--no-clean')
  };

  // Resolve all PDF files
  const pdfFiles = await resolveInputs(positional);

  if (pdfFiles.length === 0) {
    console.error('No PDF files found in the given inputs.');
    process.exit(1);
  }

  if (useStdout && pdfFiles.length > 1) {
    console.error('--stdout only works with a single PDF file.');
    process.exit(1);
  }

  const converter = new PDFToMarkdownConverter(converterOpts);
  const results = [];

  for (const pdfFile of pdfFiles) {
    const outPath = computeOutputPath(pdfFile, outputDir);
    try {
      const { markdown, metadata } = await converter.convert(pdfFile, pdfFile);

      if (useStdout) {
        process.stdout.write(markdown);
      } else {
        await fs.mkdir(path.dirname(outPath), { recursive: true });
        await fs.writeFile(outPath, markdown, 'utf-8');
        console.log(`✓ ${pdfFile} → ${outPath}`);
      }

      results.push({
        input: pdfFile,
        output: useStdout ? '(stdout)' : outPath,
        pages: metadata.pages,
        status: 'ok'
      });
    } catch (err) {
      console.error(`✗ ${pdfFile}: ${err.message}`);
      results.push({
        input: pdfFile,
        output: null,
        pages: null,
        status: 'error',
        error: err.message
      });
    }
  }

  if (jsonSummary) {
    process.stderr.write(JSON.stringify({ converted: results }, null, 2) + '\n');
  }

  const failed = results.filter(r => r.status === 'error').length;
  if (failed > 0) process.exit(1);
}

main();

export { PDFToMarkdownConverter };
