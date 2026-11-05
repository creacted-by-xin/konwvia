# Knowvia learning and implementation progress

Last observed: 2026-11-05

## Current position

- Roadmap phase: Phase 1 — Frontend engineering baseline.
- Current milestone: Week 1 — TypeScript and quality baseline.
- Status: Implementation acceptance passed; learning review remains unverified.

## Observed implementation

- The frontend uses React, TypeScript, Vite, Ant Design, React Router, and Zustand.
- Login, knowledge-base list, knowledge-base detail, upload modal, tab navigation, and chat layout prototypes exist.
- Protected routes currently use a mock token stored in `localStorage`; there is no real backend authentication yet.
- Knowledge-base, document, and conversation content still comes from local mock data.
- The upload modal posts to a mock external endpoint; document parsing and persistence do not exist yet.
- Route-level lazy loading is implemented; lazy page exports live in `src/router/LazyPages.tsx`.
- Repository-level roadmap, progress, and architecture-decision documents are now established and routed through `AGENTS.md`.

## Verification evidence

Observed on 2026-11-05:

- `npm run lint`: passed.
- `npm run build`: passed after rerunning outside the sandbox; the initial sandbox run failed with `spawn EPERM` while loading Vite configuration.
- Shared user, knowledge-base, document, chat-session, and message types exist in `src/types/domain.ts`.
- No explicit `any` occurrences were found in `src`; core search handlers use explicit input types and the login failure handler uses `unknown`.
- Knowledge-base and document mock arrays are consolidated in `src/mocks/knowledgeBases.ts`.
- Week 2 route migration is partially implemented: resource routes, list/detail navigation, and route-param ID reads are present. MainLayout synchronizes tab selection from the URL. The chat page still registers its tab with the obsolete `/Chat?id=...` path. Browser navigation and refresh behavior remain unverified. Pages still import mock arrays directly; no typed API layer or TanStack Query dependency is present.
- `tsconfig.app.json` does not enable `strict`; passing the build does not demonstrate strict-mode safety.

## Current next task

Review the Week 1 concepts and fixes with the user, including the remaining strict-mode configuration gap. Then begin the Week 2 frontend data-boundary slice defined in `PLANS.md`.

## Current milestone acceptance

- [x] Production build passes.
- [x] Lint passes.
- [x] Core form and page handlers use explicit safe types instead of `any`.
- [x] Repeated mock knowledge-base data has one typed source of truth.
- [ ] Week 1 concepts and important fixes have been reviewed with the user.

## Active blockers

None. Learning review and the next frontend slice are locally actionable.

## Learning record

- Ant Design table columns can be typed with `ColumnsType<T>` so sorter and render callbacks infer the row type.
- Route-level `lazy` and `Suspense` can reduce the initial bundle, but helper placement must remain compatible with the configured fast-refresh lint rule.
- A successful production build and a successful lint run are separate quality signals; both are required by the current milestone.

## Maintenance rules

- Update `Last observed` and verification evidence only after inspecting the live code or running the command.
- Move the current milestone only after all milestone acceptance items pass or the user explicitly reprioritizes the roadmap.
- Record durable learning outcomes, not a transcript of commands or temporary dead ends.
- Put roadmap changes in `PLANS.md` and architecture rationale in `docs/ARCHITECTURE_DECISIONS.md` instead of duplicating them here.


