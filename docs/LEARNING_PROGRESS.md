# Knowvia learning and implementation progress

Last observed: 2026-11-20

## Current position

- Roadmap phase: Phase 2 — HTTP and backend foundations.
- Current milestone: Week 3 — Node.js, HTTP, and NestJS.
- Status: Entering Week 3 by user request. No backend package exists yet; first slice is scaffold NestJS with a health endpoint.
- Deferred reminder: User asked to postpone Week 1+2 learning review; **remind them to review before or at the start of the next milestone after Week 3 work is underway / when they next ask for status or next phase**.

## Observed implementation

- The frontend uses React, TypeScript, Vite, Ant Design, React Router, and Zustand.
- Login, knowledge-base list, knowledge-base detail, upload modal, tab navigation, and chat layout prototypes exist.
- Protected routes currently use a mock token stored in `localStorage`; there is no real backend authentication yet.
- Knowledge-base and document content still comes from local mock data, but only through typed API adapters under `src/api`.
- The upload modal posts to a mock external endpoint; document parsing and persistence do not exist yet.
- Route-level lazy loading is implemented; lazy page exports live in `src/router/LazyPages.tsx`.
- Repository-level roadmap, progress, and architecture-decision documents are now established and routed through `AGENTS.md`.
- TanStack Query is installed and QueryClientProvider is connected.
- Typed adapters exist for `ListKnowledgeBases`, `getKnowledgeBase`, `listDocuments`, and `createKnowledgeBase`.
- List, detail, boundary, and chat pages load knowledge-base or document data through `useQuery` instead of importing mock arrays.
- List page creates knowledge bases with `useMutation` and invalidates `['knowledge-bases', 'list']`; `AddModal` receives `mutateAsync` / `isPending`.
- No NestJS / Node API package is present in the repository yet.

## Verification evidence

Observed on 2026-11-05:

- `npm run lint`: passed.
- `npm run build`: passed after rerunning outside the sandbox; the initial sandbox run failed with `spawn EPERM` while loading Vite configuration.
- Shared user, knowledge-base, document, chat-session, and message types exist in `src/types/domain.ts`.
- No explicit `any` occurrences were found in `src`; core search handlers use explicit input types and the login failure handler uses `unknown`.
- Knowledge-base and document mock arrays are consolidated in `src/mocks/knowledgeBases.ts`.
- Week 2 inspection: resource routes and route-param ID reads are implemented for detail/chat; their tab keys use resource paths, and MainLayout synchronizes selection from the URL. Browser back/forward and refresh remain unverified. Inspected on 2026-11-06: KnowledgeBaseBoundary now validates ID format and resource existence, renders NotFound on failure, and wraps detail/chat through nested routes; a sibling wildcard route handles unmatched paths. Browser behavior remains unverified. Inspected on 2026-11-10: detail now reads/writes saved name and docStatus filters, restores form fields, and derives table data from the current resource and saved filters. Follow-up inspection confirmed that query tabKey now includes the leading slash and matches tab keys, and submit no longer restores stale form values. Query restoration and close cleanup are connected in code. The user reports success; browser interaction has not been independently verified.
- `tsconfig.app.json` does not enable `strict`; passing the build does not demonstrate strict-mode safety.

## Latest checks — 2026-11-20

- `npm run lint`: passed after fixing `AddModal` catch handling and removing an empty `onChange` block in `UploadModal`.
- `npx tsc -b`: passed.
- `AddModal` now ignores Ant Design validation failures (`errorFields`) and only `message.error`s real API failures; `./index.css` import restored; description rule message localized.
- `createKnowledgeBase` returns `{ ...nextKnowledge }` (copy).
- Code inspection: Boundary rejects non-positive-integer IDs synchronously and uses `getKnowledgeBase` for existence (`NotFoundError` → NotFound).
- User report 2026-11-20: browser create knowledge base → list refresh succeeded (mutation + `invalidateQueries` path).
- List page still contains obsolete commented manual-request code.
- User deferred Week 1+2 concept review and entered Week 3.

## Current next task

Scaffold a NestJS TypeScript backend (for example under `server/`) with a health endpoint that returns 200. Verify it with a real HTTP request. Then add an in-memory knowledge-base module (list/create/read) as the next vertical slice.

## Current milestone acceptance

Week 1:

- [x] Production build passes.
- [x] Lint passes.
- [x] Core form and page handlers use explicit safe types instead of `any`.
- [x] Repeated mock knowledge-base data has one typed source of truth.
- [ ] Week 1 concepts and important fixes have been reviewed with the user. (deferred — remind later)

Week 2:

- [x] Pages no longer import business data arrays directly.
- [x] Refresh, browser back/forward, and invalid identifiers behave predictably. (code-verified; dedicated browser click-through not separately reported)
- [x] Query invalidation refreshes a changed list. (user browser-confirmed create→list refresh)

Week 3:

- [ ] NestJS backend with health and knowledge-base modules exists.
- [ ] In-memory knowledge-base list/create/read/update/delete endpoints work.
- [ ] Frontend completes a CRUD flow through the real HTTP API.
- [ ] Controllers delegate business logic to services.
- [ ] Invalid input returns 400 and missing resources return 404.

## Active blockers

None. Backend scaffolding is locally actionable.

## Learning record

- Ant Design table columns can be typed with `ColumnsType<T>` so sorter and render callbacks infer the row type.
- Route-level `lazy` and `Suspense` can reduce the initial bundle, but helper placement must remain compatible with the configured fast-refresh lint rule.
- A successful production build and a successful lint run are separate quality signals; both are required by the current milestone.
- Client UI state (tabs, form drafts) stays in Zustand; server-owned lists and resource detail belong in TanStack Query with stable query keys.
- Nested resource queries can share a parent key such as `['knowledge-bases', id]` so Boundary and child pages reuse the same cached metadata.
- API adapters should own mock filtering and copying so pages express resource identity (`knowledgeBaseId`) instead of importing arrays and filtering locally.
- `useMutation` runs write operations; `onSuccess` + `invalidateQueries` marks matching `useQuery` caches stale so the UI refetches instead of manually patching local table state.
- Form `validateFields` failures also reject into `catch`; distinguish them from API failures before showing a generic error toast.

## Maintenance rules

- Update `Last observed` and verification evidence only after inspecting the live code or running the command.
- Move the current milestone only after all milestone acceptance items pass or the user explicitly reprioritizes the roadmap.
- Record durable learning outcomes, not a transcript of commands or temporary dead ends.
- Put roadmap changes in `PLANS.md` and architecture rationale in `docs/ARCHITECTURE_DECISIONS.md` instead of duplicating them here.
