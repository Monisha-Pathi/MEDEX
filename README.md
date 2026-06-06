# MEDX — Medical Education & Development Exchange

Student-led organization website for programs, events, team, and contact — built with React, Express, and PostgreSQL.

## Quick start

**Prerequisites:** Node.js 24+, pnpm, PostgreSQL

```bash
corepack enable
pnpm install
```

**Website** (http://localhost:19761):

```bash
PORT=19761 BASE_PATH=/ pnpm --filter @workspace/medx-website run dev
```

**API server** (http://localhost:8080):

```bash
DATABASE_URL="postgresql://..." PORT=8080 pnpm --filter @workspace/api-server run dev
```

The dev server proxies `/api` to port 8080. Without the API running, the site still loads with empty data sections.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm run typecheck` | Typecheck all packages |
| `pnpm run build` | Typecheck and build all packages |
| `pnpm --filter @workspace/db run push` | Push DB schema (dev) |
| `pnpm --filter @workspace/api-spec run codegen` | Regenerate API client from OpenAPI |

## Structure

- `artifacts/medx-website` — React + Vite frontend
- `artifacts/api-server` — Express API
- `lib/db` — Drizzle ORM schema
- `lib/api-spec` — OpenAPI spec and codegen
- `lib/api-client-react` — Generated React Query hooks

See [replit.md](./replit.md) for stack details and operational notes.
