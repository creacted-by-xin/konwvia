# Knowvia learning and implementation progress

Last observed: 2026-11-19

## Current position

- Roadmap phase: Phase 1 — Frontend engineering baseline.
- Current milestone: Week 2 — Frontend data boundaries.
- Status: List/detail/boundary/chat no longer import mock arrays directly; mutation invalidation and browser acceptance remain open. Week 1 learning review remains unverified.

## Observed implementation

- The frontend uses React, TypeScript, Vite, Ant Design, React Router, and Zustand.
- Login, knowledge-base list, knowledge-base detail, upload modal, tab navigation, and chat layout prototypes exist.
- Protected routes currently use a mock token stored in `localStorage`; there is no real backend authentication yet.
- Knowledge-base and document content still comes from local mock data, but only through typed API adapters under `src/api`.
- The upload modal posts to a mock external endpoint; document parsing and persistence do not exist yet.
- Route-level lazy loading is implemented; lazy page exports live in `src/router/LazyPages.tsx`.
- Repository-level roadmap, progress, and architecture-decision documents are now established and routed through `AGENTS.md`.
- TanStack Query is installed and QueryClientProvider is connected.
- Typed adapters exist for `ListKnowledgeBases`, `getKnowledgeBase`, and `listDocuments`; each accepts `AbortSignal` and returns copied mock data after a cancellable delay.
- List, detail, boundary, and chat pages load knowledge-base or document data through `useQuery` instead of importing mock arrays.

## Verification evidence

Observed on 2026-11-05:

- `npm run lint`: passed.
- `npm run build`: passed after rerunning outside the sandbox; the initial sandbox run failed with `spawn EPERM` while loading Vite configuration.
- Shared user, knowledge-base, document, chat-session, and message types exist in `src/types/domain.ts`.
- No explicit `any` occurrences were found in `src`; core search handlers use explicit input types and the login failure handler uses `unknown`.
- Knowledge-base and document mock arrays are consolidated in `src/mocks/knowledgeBases.ts`.
- Week 2 inspection: resource routes and route-param ID reads are implemented for detail/chat; their tab keys use resource paths, and MainLayout synchronizes selection from the URL. Browser back/forward and refresh remain unverified. Inspected on 2026-11-06: KnowledgeBaseBoundary now validates ID format and resource existence, renders NotFound on failure, and wraps detail/chat through nested routes; a sibling wildcard route handles unmatched paths. Browser behavior remains unverified. Inspected on 2026-11-10: detail now reads/writes saved name and docStatus filters, restores form fields, and derives table data from the current resource and saved filters. Follow-up inspection confirmed that query tabKey now includes the leading slash and matches tab keys, and submit no longer restores stale form values. Query restoration and close cleanup are connected in code. The user reports success; browser interaction has not been independently verified.
- `tsconfig.app.json` does not enable `strict`; passing the build does not demonstrate strict-mode safety.

## Latest checks — 2026-11-19

- `npm run lint`: passed.
- `npx tsc -b`: passed.
- Pages under `src/pages` and `src/router` no longer import `src/mocks` directly; only `src/api/knowledgeBases.ts` and `src/api/documents.ts` do.
- Detail documents use `useQuery` with key `['knowledge-bases', id, 'documents']` and `listDocuments(knowledgeBaseId, signal)`.
- Knowledge-base metadata uses `getKnowledgeBase`; Boundary, Detail, and Chat share query key `['knowledge-bases', id]`. Boundary distinguishes invalid ID format, `NotFoundError`, and other fetch errors with retry.
- Detail table uses `rowKey="id"`, `loading={isFetching}`, status summary counts, and an error Alert with retry.
- Browser refresh/back/forward, runtime cancellation, and failure/retry acceptance remain independently unverified.
- Mutation invalidation (create/update/delete refreshing a changed list) remains outstanding.
- List page still contains obsolete commented manual-request code.

## Current next task

Add one knowledge-base mutation (for example create or delete) that invalidates the list query and verify the list refreshes. Then independently verify refresh, browser back/forward, and invalid-identifier behavior. Week 1 learning review and strict-mode configuration remain outstanding.

## Current milestone acceptance

Week 1:

- [x] Production build passes.
- [x] Lint passes.
- [x] Core form and page handlers use explicit safe types instead of `any`.
- [x] Repeated mock knowledge-base data has one typed source of truth.
- [ ] Week 1 concepts and important fixes have been reviewed with the user.

Week 2:

- [x] Pages no longer import business data arrays directly.
- [ ] Refresh, browser back/forward, and invalid identifiers behave predictably.
- [ ] Query invalidation refreshes a changed list.

## Active blockers

None. Mutation invalidation and browser acceptance are locally actionable.

## Learning record

- Ant Design table columns can be typed with `ColumnsType<T>` so sorter and render callbacks infer the row type.
- Route-level `lazy` and `Suspense` can reduce the initial bundle, but helper placement must remain compatible with the configured fast-refresh lint rule.
- A successful production build and a successful lint run are separate quality signals; both are required by the current milestone.
- Client UI state (tabs, form drafts) stays in Zustand; server-owned lists and resource detail belong in TanStack Query with stable query keys.
- Nested resource queries can share a parent key such as `['knowledge-bases', id]` so Boundary and child pages reuse the same cached metadata.
- API adapters should own mock filtering and copying so pages express resource identity (`knowledgeBaseId`) instead of importing arrays and filtering locally.

## Maintenance rules

- Update `Last observed` and verification evidence only after inspecting the live code or running the command.
- Move the current milestone only after all milestone acceptance items pass or the user explicitly reprioritizes the roadmap.
- Record durable learning outcomes, not a transcript of commands or temporary dead ends.
- Put roadmap changes in `PLANS.md` and architecture rationale in `docs/ARCHITECTURE_DECISIONS.md` instead of duplicating them here.
