# MEDX — Medical Education & Development Exchange

Website for a student-led medical education organization: programs, events, leadership team, contact, and newsletter.

## Run & Operate

- `PORT=19761 BASE_PATH=/ pnpm --filter @workspace/medx-website run dev` — website (port 19761)
- `DATABASE_URL=... PORT=8080 pnpm --filter @workspace/api-server run dev` — API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React, Vite, Tailwind, Wouter, TanStack Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (API bundle)

## Where things live

- `artifacts/medx-website` — public website
- `artifacts/api-server` — REST API under `/api`
- `lib/api-spec/openapi.yaml` — API contract (source of truth)
- `lib/db/src/schema` — database schema
- `attached_assets` — static images referenced by the site

## Gotchas

- `PORT` and `BASE_PATH` env vars are required to run the Vite dev server.
- Local dev proxies `/api` to `http://localhost:8080` (see `artifacts/medx-website/vite.config.ts`).
- On macOS/Linux local machines, darwin/linux native optional deps must not be excluded in `pnpm-workspace.yaml` overrides.
