/**
 * Mock API server — for frontend development without a PostgreSQL database.
 *
 * Returns empty data structures for all endpoints so the website UI
 * renders its "no data" / empty states.  POST endpoints accept input
 * and echo back minimal mock objects.
 *
 * Usage:
 *   PORT=8080 node ./mock-server.mjs
 *
 * Or via pnpm workspace (from repo root):
 *   pnpm --filter @workspace/api run mock
 *
 * ── Swap to the real API when the database is ready ────────────
 *   pnpm run dev:api    # requires DATABASE_URL + PostgreSQL running
 * ───────────────────────────────────────────────────────────────
 */

import express from "express";

const app = express();
app.use(express.json());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (_req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

const PORT = Number(process.env.PORT) || 8080;

// ── Health ─────────────────────────────────────────────────────
app.get("/api/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

// ── Events ─────────────────────────────────────────────────────
app.get("/api/events", (_req, res) => res.json([]));
app.get("/api/events/upcoming", (_req, res) => res.json([]));
app.get("/api/events/:id", (req, res) =>
  res.status(404).json({ error: "Event not found" }),
);
app.post("/api/events", (req, res) => {
  res.status(201).json({
    id: Date.now(),
    ...req.body,
    isUpcoming: true,
    createdAt: new Date().toISOString(),
  });
});

// ── Team ───────────────────────────────────────────────────────
app.get("/api/team", (_req, res) => res.json([]));
app.get("/api/team/leadership", (_req, res) => res.json([]));

// ── Programs ───────────────────────────────────────────────────
app.get("/api/programs", (_req, res) => res.json([]));
app.get("/api/programs/:id", (req, res) =>
  res.status(404).json({ error: "Program not found" }),
);

// ── Contact & Newsletter ───────────────────────────────────────
app.post("/api/contact", (req, res) => {
  res.status(201).json({
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString(),
  });
});
app.post("/api/newsletter", (req, res) => {
  res.status(201).json({
    id: Date.now(),
    ...req.body,
    subscribedAt: new Date().toISOString(),
  });
});

// ── Stats ──────────────────────────────────────────────────────
app.get("/api/stats", (_req, res) => {
  res.json({
    totalMembers: 0,
    totalEvents: 0,
    totalPrograms: 0,
    totalCountries: 12,
    upcomingEventsCount: 0,
  });
});

app.listen(PORT, () => {
  console.log(`[mock] API server listening on http://localhost:${PORT}`);
});
