import { Router } from "express";
import { db } from "@workspace/db";
import { teamMembersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  const members = await db.select().from(teamMembersTable).orderBy(teamMembersTable.name);
  res.json(members);
});

router.get("/leadership", async (req, res) => {
  const members = await db.select().from(teamMembersTable)
    .where(eq(teamMembersTable.isLeadership, true))
    .orderBy(teamMembersTable.name);
  res.json(members);
});

export default router;
