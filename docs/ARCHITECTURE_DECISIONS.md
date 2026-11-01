# Knowvia architecture decisions

This log records durable choices that affect future implementation. `Accepted` decisions govern current work. `Planned` decisions express the approved roadmap direction but are not evidence that the technology has been installed or implemented. When a decision changes, add a superseding entry instead of rewriting history.

## ADR-001 — Use TypeScript across the MVP

- Status: Accepted
- Date: 2026-11-01

### Decision

Use TypeScript for the React frontend and the initial Node.js backend. Add another backend language only when a measured requirement, such as unsupported document processing, justifies the operational and learning cost.

### Rationale

One language keeps the early learning loop focused on HTTP, data modeling, security, queues, and retrieval instead of syntax and tooling duplication.

## ADR-002 — Separate client UI state from server state

- Status: Planned
- Date: 2026-11-01

### Decision

Keep Zustand for local UI concerns such as workspace tabs. Introduce TanStack Query for knowledge bases, documents, users, conversations, and other server-owned data.

### Rationale

Server data needs caching, invalidation, loading, failure, and refetch behavior. Treating it as ordinary client state would recreate those concerns manually.

## ADR-003 — Use a structured Node.js backend

- Status: Planned
- Date: 2026-11-01

### Decision

Build the initial API with Node.js, TypeScript, and NestJS. Keep controllers responsible for transport, services responsible for application behavior, and persistence behind repository or data-access boundaries.

### Rationale

Knowvia will contain authentication, permissions, uploads, workers, and AI orchestration. Explicit modules and dependency boundaries provide a useful learning structure as those concerns grow.

## ADR-004 — Use PostgreSQL as the primary database

- Status: Planned
- Date: 2026-11-01

### Decision

Use PostgreSQL with Prisma for relational persistence and migrations. Use the pgvector extension for the first vector-retrieval implementation.

### Rationale

Users, memberships, knowledge bases, documents, and conversations are relational. Keeping metadata and initial vectors in one database reduces operational complexity until measurements justify a separate vector database.

## ADR-005 — Store files outside the relational database

- Status: Planned
- Date: 2026-11-01

### Decision

Store uploaded file bytes in S3-compatible object storage, using MinIO for local development. Store metadata, ownership, status, and object keys in PostgreSQL.

### Rationale

Object storage is designed for large binary objects, while PostgreSQL remains the authority for application relationships and permissions.

## ADR-006 — Process documents asynchronously

- Status: Planned
- Date: 2026-11-01

### Decision

Use Redis and BullMQ for parsing, chunking, and embedding jobs. Model document processing with explicit `pending`, `processing`, `ready`, and `failed` states and make jobs idempotent.

### Rationale

Document processing can outlive an HTTP request and can fail transiently. A queue supports retries, recovery, and visible progress without blocking uploads.

## ADR-007 — Use server-backed browser authentication

- Status: Planned
- Date: 2026-11-01

### Decision

Replace the current mock `localStorage` token with server-backed authentication using an HttpOnly cookie design. Select the precise session or access/refresh implementation during the authentication phase and record it as a follow-up decision.

### Rationale

The current token is only a UI prototype. Browser authentication must prevent JavaScript from directly reading long-lived credentials and must support server-enforced invalidation and authorization.

## ADR-008 — Stream model answers with Server-Sent Events

- Status: Planned
- Date: 2026-11-01

### Decision

Use Server-Sent Events for the first streaming chat implementation. Reconsider WebSocket only if the product later needs persistent bidirectional realtime behavior that SSE cannot serve cleanly.

### Rationale

The initial chat flow primarily streams server output to one browser request. SSE meets that need with a smaller protocol and state-management surface.

## ADR-009 — Learn the RAG pipeline before adopting a large orchestration framework

- Status: Planned
- Date: 2026-11-01

### Decision

Implement extraction, chunking, embedding, retrieval, context assembly, generation, and citations with direct libraries and model SDKs first. Adopt a larger RAG framework only after the team can identify a concrete reduction in complexity.

### Rationale

Direct implementation makes retrieval quality, data boundaries, citations, and failure modes observable. Early framework abstraction would hide the concepts this project is intended to teach.

