/* global console, process */
import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const rules = [
  ['mainland-id', /\b[1-9]\d{5}(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dXx]\b/],
  ['taiwan-id', /\b[A-Z][12]\d{8}\b/],
  ['mobile-phone', /(?<!\d)1[3-9]\d{9}(?!\d)/],
  ['bank-account', /(?<!\d)6\d{15,18}(?!\d)/],
  ['unified-social-credit-code', /\b[0-9A-HJ-NPQRTUWXY]{18}\b/],
  ['email', /\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b/],
  ['secret-assignment', /\b(?:API[_-]?KEY|TOKEN|SECRET|PASSWORD)\s*[:=]\s*["']?[^\s"']{6,}/i],
  ['cookie-assignment', /\bcookie\s*:\s*[^\n]{6,}/i],
  ['internal-url', /https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?\S*/i],
  ['private-network-url', /https?:\/\/(?:10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.)\S*/i],
  ['mac-path', /\/Users\/[^\s'"`)]+/],
  ['linux-path', /\/home\/[^\s'"`)]+/],
  ['windows-path', /[A-Z]:\\Users\\[^\s'"`)]+/i],
  ['finance-record', /客户\s*\S+\s+授信额度\s*\d+(?:\.\d+)?万元\s+到期日\s+\d{4}-\d{2}-\d{2}/],
  ['pdf-path', /(?:source-private\/|导师行前会\.pdf)/],
]

export function auditText(path, text) {
  return rules.flatMap(([rule, pattern]) => pattern.test(text) ? [{ path, rule }] : [])
}

const excluded = new Set(['.git', '.superpowers', 'node_modules', 'dist', 'source-private', '.worktrees', 'superpowers'])
const extensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.json', '.md', '.html', '.css', '.yml', '.yaml'])

async function collect(directory, root = directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    if (excluded.has(entry.name)) continue
    const full = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await collect(full, root))
    else if (extensions.has(extname(entry.name)) && !entry.name.includes('.test.') && !full.includes('/docs/superpowers/')) files.push([relative(root, full), full])
  }
  return files
}

async function main() {
  const root = process.cwd()
  const findings = []
  const publicFiles = [
    ['index.html', join(root, 'index.html')],
    ['README.md', join(root, 'README.md')],
    ...await collect(join(root, 'src'), root),
    ...await collect(join(root, 'docs'), root),
  ]
  for (const [path, full] of publicFiles) findings.push(...auditText(path, await readFile(full, 'utf8')))
  if (findings.length) {
    for (const finding of findings) console.error(`${finding.path}: ${finding.rule}`)
    process.exitCode = 1
  } else console.log('Content audit passed: no forbidden public data patterns found.')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main()
