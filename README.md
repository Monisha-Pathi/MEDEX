# MEDX — Medical Education & Development Exchange

Student-led organization website for programs, events, team, and contact — built with React, Express, and PostgreSQL.

## Quick start

**Prerequisites:** Node.js 24+, pnpm, PostgreSQL (optional for frontend-only preview)

```bash
corepack enable
pnpm install
```

**Website** (http://localhost:19761):

```bash
pnpm run dev
```

**API server** (http://localhost:8080):

```bash
DATABASE_URL="postgresql://..." pnpm run dev:api
```

The dev server proxies `/api` to port 8080. Without the API running, the site still loads with empty data sections.

## Project structure

```
Meded-Exchange/
├── apps/
│   ├── website/          # React + Vite public website
│   └── api/              # Express REST API
├── packages/
│   ├── db/               # Drizzle ORM schema & database client
│   ├── api-spec/         # OpenAPI spec & codegen scripts
│   ├── api-client/       # Generated React Query hooks (for website)
│   └── api-zod/          # Generated Zod validators (for API)
└── scripts/              # CI / deployment helpers
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start the website dev server |
| `pnpm run dev:api` | Start the API server |
| `pnpm run typecheck` | Typecheck all packages |
| `pnpm run build` | Typecheck and build all packages |
| `pnpm --filter @workspace/db run push` | Push DB schema (dev) |
| `pnpm --filter @workspace/api-spec run codegen` | Regenerate API client from OpenAPI |

## Environment variables

| Variable | Required by | Description |
|----------|-------------|-------------|
| `PORT` | website | Dev server port (19761) |
| `BASE_PATH` | website | URL base path (`/` for local) |
| `DATABASE_URL` | API | PostgreSQL connection string |
| `PORT` | API | API server port (8080) |

## Local development notes

- `PORT` and `BASE_PATH` are required to run the Vite dev server.
- Local dev proxies `/api` to `http://localhost:8080` (see `apps/website/vite.config.ts`).
- Use **Run and Debug → Launch website** in VS Code/Cursor to start the dev server and open Chrome.
