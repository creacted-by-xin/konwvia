# Knowvia full-stack learning roadmap

## Purpose

Build Knowvia into a deployable knowledge-base and RAG application while learning full-stack development through small, working product increments. The roadmap favors one TypeScript stack until the MVP is complete so that learning effort stays focused on transferable concepts rather than language switching.

## Target product

The MVP should support:

- User registration, login, logout, and session recovery.
- Public and private knowledge bases with owner, editor, and viewer permissions.
- Knowledge-base CRUD, search, sorting, and pagination.
- Document upload, storage, asynchronous parsing, progress, retry, and deletion.
- Text extraction, chunking, embeddings, vector retrieval, and source citations.
- Streaming conversations, conversation history, cancellation, and error recovery.
- Automated tests, containerized local startup, deployment, logs, and backups.

## Planned stack

| Area | Choice | Introduction point |
| --- | --- | --- |
| Web | React, TypeScript, Vite, Ant Design | Already present |
| Routing and UI state | React Router, Zustand | Already present |
| Server state | TanStack Query | Phase 1 |
| API | Node.js, TypeScript, NestJS, OpenAPI | Phase 2 |
| Database | PostgreSQL, Prisma | Phase 3 |
| File storage | S3-compatible storage, MinIO locally | Phase 5 |
| Jobs | Redis, BullMQ | Phase 5 |
| Retrieval | PostgreSQL with pgvector | Phase 6 |
| Streaming | Server-Sent Events | Phase 6 |
| Testing | Vitest, Supertest, Playwright | Introduced incrementally; consolidated in Phase 7 |
| Delivery | Docker Compose and CI | Phase 7 |

The status and rationale of these choices belong in `docs/ARCHITECTURE_DECISIONS.md`.

## Learning method

Use roughly 20% of available time for concepts and official documentation, 60% for implementation, 10% for tests and failure cases, and 10% for review and notes. If a nominal week is too short, extend it instead of skipping acceptance criteria.

Every feature is complete only when:

- Its domain and API data have explicit types.
- Loading, empty, success, and failure states are handled where applicable.
- Inputs and permissions are validated at the responsible boundary.
- At least one success path and one important failure path are verified.
- Relevant commands have been run and the observed result is recorded.

## Phase 1 — Frontend engineering baseline

### Week 1: TypeScript and quality baseline

Learn:

- Interfaces, type aliases, unions, generics, narrowing, `unknown`, and utility types.
- React event and form types, Ant Design table types, linting, type-checking, and bundling.

Build:

- Define shared `User`, `KnowledgeBase`, `Document`, `Conversation`, and `Message` domain types.
- Remove explicit and implicit `any` from the current core pages.
- Remove unused imports and resolve router fast-refresh lint violations.
- Consolidate duplicated mock data without changing visible behavior.

Acceptance:

- `npm run build` passes.
- `npm run lint` passes.
- The core page and form handlers no longer use explicit `any`.

### Week 2: Frontend data boundaries

Learn:

- Client state versus server state, custom hooks, query caching, request states, cancellation, and dynamic routes.

Build:

- Adopt resource-oriented routes such as `/knowledge-bases/:knowledgeBaseId`.
- Add a typed API client and feature-specific API modules.
- Add TanStack Query and move asynchronous business data out of Zustand.
- Give list and detail pages loading, empty, and error states using a temporary async data adapter.

Acceptance:

- Pages no longer import business data arrays directly.
- Refresh, browser back/forward, and invalid identifiers behave predictably.
- Query invalidation refreshes a changed list.

## Phase 2 — HTTP and backend foundations

### Week 3: Node.js, HTTP, and NestJS

Learn:

- The Node.js event loop, promises, error propagation, HTTP methods and status codes.
- NestJS modules, controllers, services, providers, and dependency injection.

Build:

- Add a TypeScript backend with health and knowledge-base modules.
- Implement in-memory knowledge-base list, create, read, update, and delete endpoints.
- Connect the frontend API client to the backend.

Acceptance:

- The frontend completes a CRUD flow through the real HTTP API.
- Controllers delegate business logic to services.
- Invalid input returns 400 and missing resources return 404.

### Week 4: API contracts

Learn:

- DTO validation, CORS, pagination, sorting, filtering, error contracts, and OpenAPI.

Build:

- Add validated request DTOs and global error handling.
- Add server-side pagination, keyword search, and sorting.
- Generate an OpenAPI document and expose interactive API documentation.

Acceptance:

- Invalid query values are rejected consistently.
- The frontend renders stable error codes without parsing arbitrary strings.
- Every implemented endpoint is callable from the generated API documentation.

## Phase 3 — Relational data and persistent CRUD

### Week 5: PostgreSQL and data modeling

Learn:

- Tables, keys, constraints, relationships, joins, indexes, transactions, and query plans.

Build:

- Model users, knowledge bases, memberships, documents, conversations, and messages.
- Practice SQL for ownership, membership, document counts, search, and pagination.

Acceptance:

- The entity relationships and constraints are documented and explainable.
- Representative SQL queries return the intended results.
- Index choices have a stated query need.

### Week 6: Prisma and persistence

Learn:

- Prisma schemas, migrations, seeds, relations, transactions, and N+1 queries.

Build:

- Replace the in-memory repository with PostgreSQL and Prisma.
- Add repeatable migrations and development seed data.
- Complete persistent CRUD, search, sorting, pagination, and counts.

Acceptance:

- A new database can be created from migrations and seeds.
- Data survives service restarts.
- Multi-write operations either complete together or roll back.

## Phase 4 — Authentication and authorization

### Week 7: Authentication

Learn:

- Password hashing, cookies, sessions, tokens, CSRF, CORS, and 401 versus 403.

Build:

- Implement registration, login, logout, and current-user endpoints.
- Replace the mock `localStorage` token with the approved server-backed session design.
- Restore the current user after refresh and handle session expiry centrally.

Acceptance:

- Passwords are never stored in plaintext.
- Protected APIs reject unauthenticated requests.
- Login survives refresh and logout invalidates access.

### Week 8: Resource permissions

Learn:

- Role-based access control, ownership, guards, least privilege, and horizontal privilege escalation.

Build:

- Add owner, editor, and viewer knowledge-base roles.
- Enforce read, upload, delete, and membership actions on the server.
- Reflect permissions in the UI without treating hidden buttons as security.

Acceptance:

- Changing a URL cannot expose another user's private knowledge base.
- Each role's allowed and denied operations have integration coverage.

## Phase 5 — Files and background processing

### Week 9: Upload and object storage

Learn:

- Multipart requests, streams, buffers, MIME validation, hashes, size limits, and S3-style storage.

Build:

- Upload supported documents to MinIO and store metadata in PostgreSQL.
- Show upload progress, type, size, time, and actionable errors.
- Coordinate object and database deletion safely.

Acceptance:

- Unsupported and oversized files are rejected.
- Failed uploads do not leave valid-looking records.
- Stored files can be retrieved only by authorized users.

### Week 10: Queues and document state

Learn:

- Background workers, Redis, queues, retries, idempotency, backoff, and state machines.

Build:

- Queue document parsing after upload.
- Track `pending`, `processing`, `ready`, and `failed` states with failure reasons.
- Support retry without duplicating derived data.

Acceptance:

- Upload requests return before parsing finishes.
- Interrupted jobs can resume or retry safely.
- The UI exposes current state and a recovery action.

## Phase 6 — RAG and streaming chat

### Week 11: Extraction and chunking

Learn:

- Text extraction, cleaning, tokens, chunk size, overlap, and source metadata.

Build:

- Extract supported document text and create traceable chunks.
- Preserve document, page, section, and chunk-index metadata.
- Add a development view for inspecting extracted chunks.

Acceptance:

- Every chunk traces back to an original document location.
- Reprocessing is idempotent.
- Chunk boundaries are inspected against representative documents.

### Week 12: Embeddings and retrieval

Learn:

- Embeddings, vector dimensions, cosine similarity, Top K, metadata filters, and hybrid retrieval.

Build:

- Store embeddings with pgvector and retrieve knowledge-base-scoped chunks.
- Add a retrieval debug view showing scores and source metadata.
- Create a fixed set of representative retrieval questions.

Acceptance:

- Retrieval never crosses knowledge-base permissions.
- The fixed question set records expected sources and observed results.
- Top K changes can be evaluated rather than guessed.

### Week 13: Grounded answers and citations

Learn:

- Context assembly, prompt boundaries, hallucination, prompt injection, citations, and RAG evaluation.

Build:

- Generate answers from retrieved context and return structured citations.
- Give an explicit insufficient-evidence response when retrieval is inadequate.
- Evaluate retrieval and generation separately.

Acceptance:

- Each citation resolves to stored source text.
- Unsupported questions do not produce confident fabricated answers.
- At least 20 representative questions have recorded expected behavior.

### Week 14: Streaming conversations

Learn:

- Server-Sent Events, abort signals, persistence, reconnection, and duplicate submission prevention.

Build:

- Add conversation creation, message history, streaming answers, cancellation, and regeneration.
- Restore history after refresh and show source citations alongside answers.

Acceptance:

- Users can cancel generation without corrupting message state.
- Refresh restores persisted history.
- Network interruption produces a recoverable UI state.

## Phase 7 — Quality and delivery

### Week 15: Automated tests and security pass

Learn:

- Unit, integration, and end-to-end test boundaries, fixtures, test databases, and regression testing.

Build:

- Cover authentication, permissions, CRUD, upload restrictions, job retry, tenant isolation, and citations.
- Add a regression test for each material bug fixed during the phase.

Acceptance:

- Tests run through documented commands against isolated test data.
- Critical flows cover both success and denied/failure behavior.

### Week 16: Containers, deployment, and operations

Learn:

- Docker images, Compose, reverse proxies, TLS, CI, structured logs, health checks, backups, and recovery.

Build:

- Containerize web, API, worker, PostgreSQL, Redis, and MinIO services.
- Add CI for lint, build, and tests.
- Add request IDs, health checks, rate limits, and backup/restore instructions.

Acceptance:

- A fresh machine can start the documented local stack.
- CI verifies every proposed change.
- A backup can be restored in a documented rehearsal.

## Deferred until after the MVP

- Microservices, Kubernetes, Kafka, event sourcing, and GraphQL.
- A second backend language solely for variety.
- Training a custom language model.
- Replacing pgvector before measurements show a need.
- Complex abstractions or AI frameworks before the underlying retrieval pipeline is understood.

