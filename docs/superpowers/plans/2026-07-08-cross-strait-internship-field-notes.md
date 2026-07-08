# Cross-Strait Internship Field Notes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, verify, and publish a mobile-first static Chinese field-notes site with a safe APEX-derived account-opening materials demonstration and on-demand Simplified/Traditional display.

**Architecture:** A single-page Vite + React + TypeScript application keeps all editorial copy in one Simplified Chinese module. Small, testable pure functions provide language conversion, copy formatting, content auditing, and the APEX adapter; React components own only ephemeral UI state. GitHub Actions builds and deploys the static `dist/` directory under `/xmbank-field-notes-2026/`.

**Tech Stack:** Vite, React, TypeScript, structured CSS, opencc-js, Vitest, React Testing Library, Playwright, axe-core, ESLint, GitHub Pages Actions.

## Global Constraints

- The new repository is the only writable workspace; the APEX source repository is read-only and must finish with exactly its starting HEAD and `status --porcelain`.
- No PDF, internal material, real client information, local absolute path, API key, token, cookie, internal URL, private APEX data, or unverified product figure may enter a tracked file.
- The site has exactly five primary regions: home, bank observations, three business moments, selected APEX tools, and after work.
- All prose is maintained once in `src/content/content.zh-CN.ts`; Traditional Chinese is a display/copy transformation, never a second hand-maintained content tree.
- The default language is `zh-CN`; `zh-TW` dynamically loads the converter, persists only the language choice, preserves scroll position, and updates the document language.
- The APEX feature collects no company or personal data, performs no network request, stores no business data, and labels its materials as a non-operational demonstration requiring current branch confirmation.
- Mobile is primary. The supported widths are 375, 390, 430, 768, and 1440 pixels; controls are at least 44 pixels; horizontal overflow is forbidden.
- Motion is limited to the route drawing, section entry, APEX example switch, and life-entry expansion, with a complete reduced-motion fallback.
- Footer text is exactly `科技业务部 XD.H` and `仅供个人交流`.

---

### Task 1: Repository scaffold, design system, and editorial shell

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `vitest.config.ts`
- Create: `eslint.config.js`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/test/setup.ts`
- Create: `src/content/content.zh-CN.ts`
- Create: `src/content/life-data.ts`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/BankQuestions.tsx`
- Create: `src/components/sections/BusinessMoments.tsx`
- Create: `src/components/sections/NoteStrip.tsx`
- Create: `src/components/sections/LifeCorner.tsx`
- Test: `src/components/sections/EditorialSections.test.tsx`

**Interfaces:**
- Produces: `siteContent` containing `hero`, `bankQuestions`, `moments`, `noteStrip`, `apex`, and `life` Simplified Chinese data.
- Produces: `LifeData` with `coffee`, `dessert`, `milkTea`, `spicyFood`, `prettyDining`, and `hikes` arrays, all initially empty.
- Consumes: no earlier task interfaces.

- [ ] **Step 1: Write the failing editorial component tests**

Create tests that render the sections and assert the approved hero heading, three expandable bank questions, three structurally distinct moment headings, no task/progress wording, three life entry buttons, no fabricated life cards, and the exact two-line footer. Use `userEvent` to open a bank question and a life entry, then assert `aria-expanded="true"` and visible approved copy.

- [ ] **Step 2: Verify the tests fail for the missing modules**

Run: `npm test -- src/components/sections/EditorialSections.test.tsx`

Expected: FAIL because the section modules do not exist.

- [ ] **Step 3: Add the minimal project configuration and dependencies**

Define scripts exactly as follows: `dev`, `build`, `lint`, `typecheck`, `test`, `test:watch`, `test:e2e`, `audit:content`, and `verify`. Configure Vite `base` as `process.env.GITHUB_ACTIONS ? '/xmbank-field-notes-2026/' : '/'`. Configure Vitest for `jsdom`, the shared setup file, CSS support, and `src/**/*.test.{ts,tsx}`. Configure ESLint flat rules for TypeScript, React hooks, and JSX accessibility-relevant defaults without a UI framework.

- [ ] **Step 4: Implement the single Simplified source and editorial components**

Implement the five approved regions with semantic `header`, `nav`, `main`, `section`, headings, native buttons, and internal anchors. `BankQuestions` owns one optional open question id. `LifeCorner` owns one optional open entry id and maps only the three approved explanatory entries; it must not map the empty `lifeData` arrays into placeholder cards. Hero art is an accessible decorative inline SVG with bank, enterprise, and city nodes and no political map.

- [ ] **Step 5: Implement the tokens and responsive shell**

Use the exact palette from the product brief in `tokens.css`. Build a 12-column desktop and 4-column mobile grid, 680-pixel reading measure, 1200-pixel container, 44-pixel controls, 95vh maximum hero at mobile sizes, focus-visible outlines, and reduced-motion overrides. Use only the specified system Chinese font stacks.

- [ ] **Step 6: Verify green and run static checks**

Run: `npm test -- src/components/sections/EditorialSections.test.tsx && npm run typecheck && npm run lint && npm run build`

Expected: all commands exit 0 and the editorial test file reports no failures.

- [ ] **Step 7: Commit the independently working editorial shell**

Run: `git add package.json package-lock.json index.html tsconfig*.json vite.config.ts vitest.config.ts eslint.config.js src && git commit -m "feat: build editorial internship experience"`

Expected: a commit is created and `git status --short` contains only files belonging to later tasks or untracked ignored private sources.

---

### Task 2: On-demand language and copy layer

**Files:**
- Create: `src/i18n/types.ts`
- Create: `src/i18n/bankingDictionary.ts`
- Create: `src/i18n/convert.ts`
- Create: `src/i18n/LanguageProvider.tsx`
- Create: `src/i18n/convert.test.ts`
- Create: `src/i18n/LanguageProvider.test.tsx`
- Create: `src/components/common/LanguageToggle.tsx`
- Create: `src/components/common/CopyButton.tsx`
- Create: `src/components/common/Toast.tsx`
- Test: `src/components/common/LanguageAndCopy.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/layout/Header.tsx`
- Modify: section components to consume transformed display content.

**Interfaces:**
- Produces: `type Locale = 'zh-CN' | 'zh-TW'`.
- Produces: `convertText(text: string, locale: Locale): Promise<string>` and `convertValue<T>(value: T, locale: Locale): Promise<T>`.
- Produces: `useLanguage()` returning `{ locale, setLocale, t, pending }`.
- Produces: `copyInLocale(text: string, locale: Locale): Promise<void>` through the copy component contract.
- Consumes: `siteContent` from Task 1.

- [ ] **Step 1: Write failing pure conversion tests**

Assert that Simplified input is returned unchanged for `zh-CN`; Taiwan conversion changes ordinary words such as `资料` as expected by OpenCC while preserving `厦门银行`, `APEX`, digits, punctuation, `统一社会信用代码`, `法定代表人`, `受益所有人`, `银行承兑汇票`, `对公业务`, `授信`, and `贷后管理`. Assert nested arrays and objects are transformed without mutating the source object.

- [ ] **Step 2: Verify RED**

Run: `npm test -- src/i18n/convert.test.ts`

Expected: FAIL because the converter and dictionary do not exist.

- [ ] **Step 3: Implement protected dynamic conversion**

Define immutable protected terms in `bankingDictionary.ts`. In `convert.ts`, return immediately for `zh-CN`; for `zh-TW`, replace protected terms with stable ASCII placeholders, execute `await import('opencc-js')`, create a `cn -> twp` converter once, convert, apply explicit phrase corrections, and restore placeholders. Recursively transform strings in arrays and plain objects while retaining numbers, booleans, null, and undefined.

- [ ] **Step 4: Write failing provider and copy tests**

Test default Simplified display, stored Traditional preference, `document.documentElement.lang`, localStorage update, unchanged `window.scrollY`, loading state, current-version copy, explicitly Simplified copy, explicitly Traditional copy, clipboard rejection, and status Toast text. Use a deterministic clipboard stub and restore globals after each test.

- [ ] **Step 5: Verify RED and implement provider/components**

Run: `npm test -- src/i18n/LanguageProvider.test.tsx src/components/common/LanguageAndCopy.test.tsx`

Expected before implementation: FAIL for missing provider/components.

Implement the provider with only locale persistence under `xmbank-field-notes-locale`; do not persist transformed content. The toggle uses two 44-pixel buttons with `aria-pressed`. CopyButton exposes the current-version primary action and a disclosure for explicit Simplified/Traditional actions. Toast uses `role="status"`, is dismissible, and clears after a short timer that tests can control.

- [ ] **Step 6: Verify language behavior and the lazy chunk**

Run: `npm test -- src/i18n src/components/common && npm run build`

Expected: all tests pass; build output contains a separate OpenCC-related JavaScript chunk and the default entry does not inline the converter.

- [ ] **Step 7: Commit the language layer**

Run: `git add package.json package-lock.json src && git commit -m "feat: add simplified-traditional display layer"`

Expected: a commit is created with no second full Traditional content source.

---

### Task 3: Safe APEX adapter and interactive workbench

**Files:**
- Create: `src/features/apex/types/accountOpening.ts`
- Create: `src/features/apex/fixtures/accountOpeningMaterials.ts`
- Create: `src/features/apex/utils/buildAccountOpeningResult.ts`
- Create: `src/features/apex/utils/formatAccountOpeningChecklist.ts`
- Create: `src/features/apex/utils/accountOpening.test.ts`
- Create: `src/features/apex/components/ApexWorkbench.tsx`
- Create: `src/features/apex/components/ApexTool.tsx`
- Create: `src/features/apex/components/ApexTool.test.tsx`
- Create: `src/features/apex/provenance/apex-source-map.json`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `type AccountKind = 'basic' | 'general' | 'special'`.
- Produces: `AccountOpeningMaterial { id: string; name: string; category: 'entity' | 'identity' | 'control' | 'premises' | 'authorization'; note?: string }`.
- Produces: `buildAccountOpeningResult(kind: AccountKind, selectedIds: readonly string[]): { ready: AccountOpeningMaterial[]; missing: AccountOpeningMaterial[]; disclaimer: string }`.
- Produces: `formatAccountOpeningChecklist(kindLabel: string, result: AccountOpeningResult): string`.
- Consumes: `useLanguage`, `CopyButton`, and approved APEX section copy from earlier tasks.

- [ ] **Step 1: Write failing adapter tests**

Test all three account kinds, empty selections, partial selections, unknown ids being ignored, source fixture immutability, stable output order, and the exact disclaimer `示例仅用于理解材料结构，实际办理前请以当地网点最新要求为准。`. Assert formatted output has numbered ready and missing sections without a company name, person name, phone, account, credit figure, fee, internal system, or absolute requirement language.

- [ ] **Step 2: Verify RED**

Run: `npm test -- src/features/apex/utils/accountOpening.test.ts`

Expected: FAIL because the adapter does not exist.

- [ ] **Step 3: Implement the minimal public fixture and pure adapter**

Use only generic educational material categories derived from the APEX source structure: entity qualification, representative/handler identity, control relationship, operating premises, and seal/authorization material. Do not copy manager reminders, fees, thresholds, branch systems, customer fields, Word/Excel export, history, IndexedDB, backend clients, or environment configuration. Preserve the APEX list-to-numbered-text behavior in a renamed pure formatter and record the source commit and blob in provenance.

- [ ] **Step 4: Write failing APEX component tests**

Test the three-stage workbench labels, account-kind switch, temporary material toggles, missing/ready results, language-following output, explicit copy actions, refresh-safe in-memory state, zero form fields for business identity/PII, and absence of save/upload/export/chat controls.

- [ ] **Step 5: Verify RED and implement the workbench**

Run: `npm test -- src/features/apex/components/ApexTool.test.tsx`

Expected before implementation: FAIL for missing components.

Implement desktop input/process/result columns and mobile vertical flow. Use native radio or tab semantics for account kinds and checkboxes for material categories. The middle trace is exactly `识别任务 → 调用专业能力 → 形成可复核结果`. All state stays inside React memory.

- [ ] **Step 6: Verify APEX behavior and no network/storage coupling**

Run: `npm test -- src/features/apex && npm run typecheck && npm run build`

Expected: all commands exit 0; imports under `src/features/apex` contain no API, Supabase, Gemini, Dexie, file export, or APEX absolute path.

- [ ] **Step 7: Commit the read-only bridge**

Run: `git add src/features src/App.tsx docs/apex-audit.md docs/research/apex-integrity-baseline.md && git commit -m "feat: add read-only APEX bridge"`

Expected: a commit is created and the source APEX repository status remains unchanged.

---

### Task 4: Security audit, end-to-end verification, documentation, and Pages workflow

**Files:**
- Create: `scripts/content-audit.mjs`
- Create: `scripts/content-audit.test.ts`
- Create: `playwright.config.ts`
- Create: `e2e/site.spec.ts`
- Create: `e2e/accessibility.spec.ts`
- Create: `.github/workflows/deploy-pages.yml`
- Create: `README.md`
- Create: `docs/maintenance.md`
- Create: `docs/verification-report.md`
- Modify: `package.json`
- Modify: `vite.config.ts` only if base-path verification finds a defect.

**Interfaces:**
- Produces: `auditText(path: string, text: string): AuditFinding[]` and CLI exit code 1 on any finding.
- Produces: Playwright projects for desktop Chromium and mobile 390x844 Chromium.
- Consumes: the complete application from Tasks 1-3.

- [ ] **Step 1: Write failing content-audit tests**

Use temporary fixture strings for each forbidden class: mainland identity number, Taiwan identity number, mobile number, bank account-like sequence, unified social credit code, email, API key/token/cookie assignment, localhost/private-network/internal URL, macOS/Linux/Windows absolute path, real-looking customer finance record, and forbidden PDF. Include safe prose and the APEX commit hash as negative controls.

- [ ] **Step 2: Verify RED and implement the fail-closed audit**

Run: `npm test -- scripts/content-audit.test.ts`

Expected before implementation: FAIL for missing audit module.

Implement recursive scanning only over tracked/public source candidates, skip `.git`, ignored private sources, dependencies, build and test artifacts, and print file plus rule name without echoing a full secret. The CLI exits 1 for findings and 0 otherwise.

- [ ] **Step 3: Write and run the complete E2E suite**

Cover: default Simplified, Traditional switch, persistence after reload, scroll preservation, APEX output language, Simplified copy, Traditional copy, mobile navigation, no horizontal overflow at all five widths, Pages base-path resources, zero console errors, valid internal anchors, life expansion, keyboard flow, focus visibility, image/SVG accessibility, document language, and axe serious/critical violations. Save the five required screenshots under `docs/screenshots/`.

Run: `npx playwright install chromium && npm run test:e2e`

Expected: all Playwright tests pass in both configured projects and five PNG screenshots exist at the required dimensions/sections.

- [ ] **Step 4: Add deployment workflow and public documentation**

The workflow triggers on `main` and manual dispatch, grants `contents: read`, `pages: write`, and `id-token: write`, uses concurrency `pages`, runs `npm ci`, `npm run audit:content`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, then the official checkout/configure-pages/upload-pages-artifact/deploy-pages actions. README is Chinese and documents development, tests, build, Pages, language architecture, APEX read-only sync, content sources, life-data maintenance, and security without private paths or source PDFs.

- [ ] **Step 5: Run the full local release gate**

Run: `npm run lint && npm run typecheck && npm test && npm run test:e2e && npm run build && npm run audit:content && git diff --check`

Expected: every command exits 0. Record test counts, bundle sizes, screenshot paths, browser coverage, accessibility result, and any measured limitation in `docs/verification-report.md`.

- [ ] **Step 6: Recheck source integrity and public diff**

Run the APEX HEAD/status commands from `docs/research/apex-integrity-baseline.md`, compare exact output, run `git status --short`, inspect `git diff --cached` or the full branch diff, run `git ls-files` to confirm no PDF/private path, and run `npm pack --dry-run` as an additional publication-surface check.

Expected: APEX HEAD/status exactly match baseline; tracked files contain no private source; every changed line belongs to this site.

- [ ] **Step 7: Commit the release gate and deployment configuration**

Run: `git add scripts e2e playwright.config.ts .github README.md docs package.json package-lock.json vite.config.ts && git commit -m "test: add release and accessibility coverage"`

Expected: a commit is created and the local branch is ready for independent review and deployment.

