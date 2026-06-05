import { Router } from "express";
import { db } from "@workspace/db";
import { eventsTable } from "@workspace/db";
import { eq, gte } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  const events = await db.select().from(eventsTable).orderBy(eventsTable.date);
  res.json(events.map(e => ({
    ...e,
    date: e.date.toISOString(),
  })));
});

router.get("/upcoming", async (req, res) => {
  const now = new Date();
  const events = await db.select().from(eventsTable)
    .where(gte(eventsTable.date, now))
    .orderBy(eventsTable.date);
  res.json(events.map(e => ({
    ...e,
    date: e.date.toISOString(),
  })));
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const [event] = await db.select().from(eventsTable).where(eq(eventsTable.id, id));
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json({ ...event, date: event.date.toISOString() });
});

router.post("/", async (req, res) => {
  const { title, description, date, location, category, imageUrl, registrationUrl } = req.body;
  const [event] = await db.insert(eventsTable).values({
    title, description, date: new Date(date), location, category,
    imageUrl: imageUrl ?? null,
    registrationUrl: registrationUrl ?? null,
    isUpcoming: new Date(date) >= new Date(),
  }).returning();
  res.status(201).json({ ...event, date: event.date.toISOString() });
});

export default router;
