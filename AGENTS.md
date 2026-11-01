# Knowvia repository guidance

Knowvia is a learning-driven full-stack knowledge-base and RAG project. Work should advance the product and explain the relevant full-stack concepts to the user at the same time.

## Context routing

- For any implementation, debugging, review, or status task, read `docs/LEARNING_PROGRESS.md` first. Treat the live code and observed command output as the final authority.
- When choosing the next task, changing scope, or discussing the learning sequence, also read `PLANS.md`.
- When changing dependencies, module boundaries, authentication, persistence, file processing, AI retrieval, deployment, or another architectural concern, also read `docs/ARCHITECTURE_DECISIONS.md`.

## Working agreement

- Follow the current phase in `docs/LEARNING_PROGRESS.md` unless the user explicitly changes priorities.
- Implement one small, verifiable vertical slice at a time. Explain what the user is learning, the data flow, and the important failure cases.
- Preserve unrelated user changes and inspect the working tree before editing overlapping files.
- Keep TypeScript strict and prefer domain types, validation, and narrowing over `any` or unsafe assertions.
- Treat authentication and permissions as backend-enforced behavior once a backend exists; UI hiding alone is not authorization.
- Record observed results only. A roadmap item is not complete until its acceptance evidence has been run or inspected.

## Documentation ownership

- `PLANS.md` owns the ordered learning roadmap, phase scope, dependencies, and phase acceptance criteria. Update it only when the user approves a roadmap or scope change.
- `docs/LEARNING_PROGRESS.md` owns current status, completed evidence, blockers, and the next small task. Update it after material implementation or verification progress.
- `docs/ARCHITECTURE_DECISIONS.md` owns durable technical decisions and their rationale. Add or supersede an entry when a material architecture choice is made; preserve the history of superseded decisions.
- Keep each fact in one authoritative document and link to it elsewhere instead of copying it.

## Verification

- Use the scripts in `package.json` as the source of truth for frontend checks.
- Run the narrowest relevant check during development, then run the phase acceptance checks before claiming completion.
- Report failures honestly and record only durable blockers or verified progress in `docs/LEARNING_PROGRESS.md`.

