# Internship Field Institute Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a polished, high-intelligence static internship learning experience that combines rigorous curriculum content, thoughtful mentorship, bilingual care, and the existing safe APEX lab.

**Architecture:** Keep the existing Vite, React, TypeScript, single-page and single-source language architecture. Add focused editorial sections backed by typed Simplified Chinese content, retain APEX as a read-only in-memory lab, and complete the public release gate with content auditing, browser tests, documentation and static hosting.

**Tech Stack:** React 19, TypeScript 6, Vite 8, native CSS, OpenCC, Vitest, React Testing Library, Playwright, GitHub Actions and GitHub Pages.

## Global Constraints

- No backend, login, analytics, customer forms or business-data persistence.
- Simplified Chinese remains the only authored content source; Traditional display and copying use the protected conversion layer.
- Clearly distinguish approved outward-facing language, educational examples and information that requires current business verification.
- Do not publish the source PDF, names, phone numbers, hotel addresses, local paths, secrets, internal URLs or original APEX configuration.
- Avoid childish gamification, promotional claims, generic card grids and unverified customer-facing statements.
- Preserve keyboard access, visible focus, reduced motion and responsive layouts at 375, 390, 430, 768 and 1440 pixels.

---

### Task 1: Typed curriculum and editorial content

**Files:**
- Modify: `src/content/content.zh-CN.ts`
- Create: `src/content/curriculum.ts`
- Create: `src/content/fieldGuide.ts`
- Test: `src/content/content.test.ts`

**Interfaces:**
- Produces: `curriculumStages` with `id`, `verb`, `title`, `premise`, `questions`, `practice`, `output`, and `mentorCheck`.
- Produces: `fieldMoments`, `researchMethod`, `mentorshipProtocol`, `reflectionPrompts`, and `contentBoundaryLabels`.
- Consumes: the existing `siteContent` language-provider contract.

- [ ] Write a failing content test asserting four curriculum stages, four field moments, five research steps, three explicit content-boundary labels, mentorship escalation guidance, and the absence of promotional or childish language.
- [ ] Run `npm test -- src/content/content.test.ts` and verify the new exports are missing.
- [ ] Add the typed content modules and rewrite the page copy with formal, evidence-oriented language derived only from the approved design and non-sensitive mentor-document principles.
- [ ] Run `npm test -- src/content/content.test.ts src/i18n` and verify all content and conversion tests pass.
- [ ] Commit the independently valid content model.

### Task 2: Curriculum, practice, research and mentorship sections

**Files:**
- Create: `src/components/sections/Curriculum.tsx`
- Create: `src/components/sections/FieldPractice.tsx`
- Create: `src/components/sections/ResearchStudio.tsx`
- Create: `src/components/sections/MentorshipProtocol.tsx`
- Create: `src/components/sections/ClosingReflection.tsx`
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/App.tsx`
- Test: `src/components/sections/InstituteSections.test.tsx`

**Interfaces:**
- Consumes: typed content from Task 1 and `useLanguage()` for all display text.
- Produces: semantic page regions `curriculum`, `field-practice`, `research-studio`, `mentorship`, and `reflection`.

- [ ] Write component tests for the learning outcomes, four-stage curriculum, field-boundary guidance, research quality criteria, mentorship feedback rhythm, escalation conditions and private reflection copy action.
- [ ] Run `npm test -- src/components/sections/InstituteSections.test.tsx` and verify missing sections fail.
- [ ] Implement the five sections using native buttons, headings, lists and disclosure patterns; add them to `App` and update navigation anchors.
- [ ] Rewrite the hero as a formal opening note with course metadata, four learning outcomes and an invitation to begin.
- [ ] Run focused component, language and accessibility-relevant unit tests.
- [ ] Commit the complete semantic learning journey.

### Task 3: Seminar and APEX laboratory refinement

**Files:**
- Modify: `src/components/sections/BankQuestions.tsx`
- Modify: `src/components/sections/BusinessMoments.tsx`
- Modify: `src/features/apex/components/ApexTool.tsx`
- Modify: `src/features/apex/components/ApexWorkbench.tsx`
- Modify: `src/features/apex/components/ApexTool.test.tsx`
- Modify: `src/content/content.zh-CN.ts`

**Interfaces:**
- Consumes: the current safe APEX fixture and pure formatter without changing its privacy boundary.
- Produces: a case-seminar flow and an APEX lab that marks the output as an educational example requiring current branch confirmation.

- [ ] Extend failing tests to require lab purpose, content classification, privacy statement, temporary-state explanation and tri-language copy controls.
- [ ] Run the focused APEX and editorial tests and confirm the new expectations fail.
- [ ] Reframe the current questions and business moments as seminar cases with observation, evidence, judgment boundary and discussion prompts.
- [ ] Refine APEX labels and explanatory copy without adding inputs, persistence, network calls, export or dynamic business rules.
- [ ] Run `npm test -- src/features/apex src/components/sections` and verify the full learning flow passes.
- [ ] Commit the seminar and laboratory refinement.

### Task 4: Harbor institute visual system

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/global.css`
- Modify: all new section components only where class structure is required.
- Test: `src/components/sections/InstituteSections.test.tsx`

**Interfaces:**
- Consumes: the semantic markup from Tasks 2 and 3.
- Produces: a responsive non-generic editorial system with paper, navy, sea blue, archive red and brass accents.

- [ ] Add structural test assertions for section labels, course metadata, non-card semantic regions and reduced-motion-safe decorative elements.
- [ ] Implement the asymmetric twelve-column desktop and four-column mobile layouts, typography hierarchy, route motif, marginalia, research tables, process lines, focus states and print-safe rules.
- [ ] Remove obsolete selectors only when no current component uses them and preserve all unrelated styles.
- [ ] Build and inspect the output at the five required widths; fix overflow, touch-target and reading-measure defects.
- [ ] Run `npm run lint && npm run typecheck && npm test && npm run build`.
- [ ] Commit the visual system.

### Task 5: Public safety audit and browser release gate

**Files:**
- Create: `scripts/content-audit.mjs`
- Modify: `scripts/content-audit.test.ts`
- Create: `playwright.config.ts`
- Create: `e2e/site.spec.ts`
- Create: `e2e/accessibility.spec.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: `auditText(path, text)` findings and a fail-closed CLI.
- Produces: desktop and mobile Chromium release tests against the production build.

- [ ] Complete audit tests for identity numbers, phone numbers, bank-like numbers, emails, secrets, internal/private URLs, absolute paths, source PDFs and safe negative controls.
- [ ] Implement recursive public-source scanning that excludes Git, dependencies, build output, tests and ignored private sources without echoing complete sensitive values.
- [ ] Add browser tests for navigation, Simplified/Traditional display, copy options, APEX state, keyboard access, internal anchors, console errors and horizontal overflow.
- [ ] Run `npm run audit:content && npm run lint && npm run typecheck && npm test && npm run build && npm run test:e2e`.
- [ ] Commit the release gate.

### Task 6: Documentation, GitHub publication and live verification

**Files:**
- Create: `.github/workflows/deploy-pages.yml`
- Create: `README.md`
- Create: `docs/maintenance.md`
- Create: `docs/verification-report.md`
- Modify: `vite.config.ts` only if the deployed repository subpath requires it.

**Interfaces:**
- Consumes: the verified production build from Task 5.
- Produces: a public HTTPS URL and maintenance guidance for later content updates.

- [ ] Add a least-privilege GitHub Pages workflow that installs with `npm ci`, audits, lints, type-checks, tests, builds and publishes `dist/`.
- [ ] Document content ownership, local commands, language conversion, APEX boundaries, update procedure and exact rollback steps without private source details.
- [ ] Run the complete local release gate, `git diff --check`, tracked-file inspection and `npm pack --dry-run`; record measured results in the verification report.
- [ ] Inspect the final diff and Git status, preserving unrelated user files.
- [ ] Push the current branch to the authorized GitHub remote, enable or trigger static hosting, and wait for the deployment workflow.
- [ ] Open the live HTTPS page, verify status 200, assets, navigation, language switching, APEX interaction and mobile rendering, then provide the direct link.
