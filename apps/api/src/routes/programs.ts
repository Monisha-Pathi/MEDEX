import { Router } from "express";
import { db } from "@workspace/db";
import { programsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  const programs = await db.select().from(programsTable).orderBy(programsTable.id);
  res.json(programs);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const [program] = await db.select().from(programsTable).where(eq(programsTable.id, id));
  if (!program) return res.status(404).json({ error: "Program not found" });
  return res.json(program);
});

export default router;
