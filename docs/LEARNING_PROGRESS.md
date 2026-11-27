# Knowvia learning and implementation progress

Last observed: 2026-11-27

## Current position

- Roadmap phase: Phase 3 — Relational data and persistent CRUD.
- Current milestone: Week 5 — PostgreSQL and data modeling.
- Status: Week 4 API contracts accepted from code inspection plus user Swagger checks. Next: model the relational tables before installing Prisma.
- Deferred reminder: Week 1+2 concept review postponed to **this weekend** (user request 2026-11-25).

## Observed implementation

- The frontend uses React, TypeScript, Vite, Ant Design, React Router, and Zustand.
- Login, knowledge-base list, knowledge-base detail, upload modal, tab navigation, and chat layout prototypes exist.
- Protected routes currently use a mock token stored in `localStorage`; there is no real backend authentication yet.
- Knowledge-base list/create/detail adapters target `http://localhost:3000`; documents still use mock adapters.
- The upload modal posts to a mock external endpoint; document parsing and persistence do not exist yet.
- Route-level lazy loading is implemented; lazy page exports live in `src/router/LazyPages.tsx`.
- Repository-level roadmap, progress, and architecture-decision documents are now established and routed through `AGENTS.md`.
- TanStack Query is installed and QueryClientProvider is connected.
- Typed adapters exist for `ListKnowledgeBases`, `getKnowledgeBase`, and `createKnowledgeBase` (HTTP). `updateKnowledgeBase` exists but currently uses `POST` instead of `PATCH` and is unused by pages. No delete adapter yet.
- List page creates knowledge bases with `useMutation` and invalidates `['knowledge-bases', 'list']`.
- Nest backend lives under `server/` (ESM): `GET /health`, knowledge-bases module with list/create/read/update/delete in memory. Controllers delegate to services. Missing id → `NotFoundException` (404). Empty-name → 400 not implemented yet.
- `server/src/main.ts` enables CORS for `http://localhost:5173`.

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

## Latest checks — 2026-11-24

- Code inspection: `server` knowledge-bases Service/Controller implement in-memory CRUD; `NotFoundException` on missing ids.
- Code inspection: frontend `request` helper + list/create/get hit real API; CORS enabled in `main.ts`.
- `updateKnowledgeBase` still sends `POST` (should be `PATCH`); unused by UI. Delete adapter not present.
- End-to-end browser CRUD through real API and empty-input 400 not yet verified in this check.

## Latest checks — 2026-11-25

- Frontend adapters: `PATCH` update and `DELETE` remove present in `src/api/knowledgeBases.ts`.
- User curl: empty-name `POST /knowledge-bases` returns `400` + `Bad Request`.
- Code inspection: `create` uses `BadRequestException` after trim; prefer `name?.trim() ?? ''` if `name` may be missing.
- User browser confirm 2026-11-25: list+create against Nest; Network showed 201 (POST create), 200 (GET list refetch), 204 CORS preflight.

## Latest checks — 2026-11-26

- Code inspection: Zod schemas for create/update; `StandardSchemaValidationPipe` + `exceptionFactory` → `VALIDATION_ERROR`; Param id uses `z.coerce.number().int().positive()`.
- Curl: `GET /knowledge-bases/abc` → 400 `{ code: VALIDATION_ERROR, ... }`; `GET /knowledge-bases/99999` → 404 `{ code: KB_NOT_FOUND, message: ... }`.
- Frontend `request` attaches `error.code` and maps 404 / `KB_NOT_FOUND` → `NotFoundError`. Minor: else-branch should use `body?.message` when `body` may be null.
- Code inspection 2026-11-26: list adapter sends `page`/`pageSize`/`q`; list page query key includes them; table pagination uses `data.total`. Browser click-through not done. `onFinish` still calls `refetch()` on the previous query key. Column sorters still sort only the current page.

- User Swagger UI 2026-11-27: `GET /knowledge-bases/9999` → 404 `KB_NOT_FOUND`; list with `page`/`pageSize` → 200 `{ items, total, page, pageSize }`. `id=abc` was blocked by Swagger UI before the request (`Value must be an integer`), so the server `VALIDATION_ERROR` was not shown in that try.

- Code inspection 2026-11-27: Zod create/update/list schemas, global validation pipe with `VALIDATION_ERROR`, Service 404 uses `KB_NOT_FOUND`, list returns `{ items, total, page, pageSize }`, Swagger UI mounted at `/api` before `listen`. Frontend list sends `page`/`pageSize`/`q` and pages with `total`. `request` branches on `code` / status, and displays `message`.

## Current next task

Week 5: draw the tables for users, knowledge bases, memberships, documents, conversations, and messages, including keys and relationships. Do not add Prisma until the model is explainable. Weekend reminder: Week 1+2 concept review is still deferred.

## Current milestone acceptance

Week 1:

- [x] Production build passes.
- [x] Lint passes.
- [x] Core form and page handlers use explicit safe types instead of `any`.
- [x] Repeated mock knowledge-base data has one typed source of truth.
- [ ] Week 1 concepts and important fixes have been reviewed with the user. (deferred to this weekend)

Week 2:

- [x] Pages no longer import business data arrays directly.
- [x] Refresh, browser back/forward, and invalid identifiers behave predictably. (code-verified; dedicated browser click-through not separately reported)
- [x] Query invalidation refreshes a changed list. (user browser-confirmed create→list refresh)
- [ ] Week 2 concepts reviewed with the user. (deferred to this weekend)

Week 3:

- [x] NestJS backend with health and knowledge-base modules exists. (code-inspected)
- [x] In-memory knowledge-base list/create/read/update/delete endpoints work. (code-inspected; user-reported route checks)
- [x] Frontend completes a CRUD flow through the real HTTP API. (user browser list+create 2026-11-25; adapters include update/delete)
- [x] Controllers delegate business logic to services. (code-inspected)
- [x] Invalid input returns 400 and missing resources return 404. (404 code-inspected; 400 user curl-confirmed 2026-11-25)

Week 4:

- [x] Invalid query values are rejected consistently. (list query schema; Swagger blocks `page=0` from the published minimum; invalid id curl returned `VALIDATION_ERROR`)
- [x] The frontend renders stable error codes without parsing arbitrary strings. (`request` reads `code`; 404 / `KB_NOT_FOUND` becomes `NotFoundError`; visible text still uses `message`)
- [x] Every implemented endpoint is callable from the generated API documentation. (Swagger UI at `/api`; user executed list and get; remaining routes are on the same generated document)

## Active blockers

None. Week 4 work is locally actionable.

## Learning record

- Ant Design table columns can be typed with `ColumnsType<T>` so sorter and render callbacks infer the row type.
- Route-level `lazy` and `Suspense` can reduce the initial bundle, but helper placement must remain compatible with the configured fast-refresh lint rule.
- A successful production build and a successful lint run are separate quality signals; both are required by the current milestone.
- Client UI state (tabs, form drafts) stays in Zustand; server-owned lists and resource detail belong in TanStack Query with stable query keys.
- Nested resource queries can share a parent key such as `['knowledge-bases', id]` so Boundary and child pages reuse the same cached metadata.
- API adapters should own mock filtering and copying so pages express resource identity (`knowledgeBaseId`) instead of importing arrays and filtering locally.
- `useMutation` runs write operations; `onSuccess` + `invalidateQueries` marks matching `useQuery` caches stale so the UI refetches instead of manually patching local table state.
- Form `validateFields` failures also reject into `catch`; distinguish them from API failures before showing a generic error toast.
- Nest: Controller owns HTTP; Service owns business rules; `findIndex` returns `-1` when missing; array index ≠ business `id`.
- Browser CORS failures appear in the browser Network/Console; Nest often still handled the request or never saw a blocked response as an app error.
- Shared frontend `request` helper centralizes base URL, JSON headers, and mapping 404 → `NotFoundError`.
- A Zod schema is the runtime contract; `z.infer` disappears after compile. Query strings arrive as strings, so numbers use `z.coerce.number()`.
- List responses need `items` and `total`. The page number belongs in the TanStack Query key, so changing pages fetches a different cache entry.
- Swagger UI can refuse a value before any HTTP request is sent. A Server response block means Nest handled it.
- Controller methods receive already-validated input and call the service. Existence checks stay beside the data lookup.

## Maintenance rules

- Update `Last observed` and verification evidence only after inspecting the live code or running the command.
- Move the current milestone only after all milestone acceptance items pass or the user explicitly reprioritizes the roadmap.
- Record durable learning outcomes, not a transcript of commands or temporary dead ends.
- Put roadmap changes in `PLANS.md` and architecture rationale in `docs/ARCHITECTURE_DECISIONS.md` instead of duplicating them here.
