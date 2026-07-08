import { Router } from "express";
import { db } from "@workspace/db";
import { eventsTable, teamMembersTable, programsTable } from "@workspace/db";
import { gte, sql } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  const now = new Date();
  const [eventsCount] = await db.select({ count: sql<number>`count(*)` }).from(eventsTable);
  const [membersCount] = await db.select({ count: sql<number>`count(*)` }).from(teamMembersTable);
  const [programsCount] = await db.select({ count: sql<number>`count(*)` }).from(programsTable);
  const [upcomingCount] = await db.select({ count: sql<number>`count(*)` }).from(eventsTable).where(gte(eventsTable.date, now));

  res.json({
    totalMembers: Number(membersCount.count),
    totalEvents: Number(eventsCount.count),
    totalPrograms: Number(programsCount.count),
    totalCountries: 12, // TODO: compute from database once countries column exists
    upcomingEventsCount: Number(upcomingCount.count),
  });
});

export default router;
