import { Router } from "express";
import { db } from "@workspace/db";
import { contactSubmissionsTable, newsletterSubscribersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  const [submission] = await db.insert(contactSubmissionsTable).values({
    name, email, subject: subject ?? null, message,
  }).returning();
  res.status(201).json({
    ...submission,
    createdAt: submission.createdAt.toISOString(),
  });
});

router.post("/newsletter", async (req, res) => {
  const { email, name } = req.body;
  const existing = await db.select().from(newsletterSubscribersTable)
    .where(eq(newsletterSubscribersTable.email, email));
  if (existing.length > 0) {
    return res.status(201).json({
      ...existing[0],
      subscribedAt: existing[0].subscribedAt.toISOString(),
    });
  }
  const [subscriber] = await db.insert(newsletterSubscribersTable).values({
    email, name: name ?? null,
  }).returning();
  res.status(201).json({
    ...subscriber,
    subscribedAt: subscriber.subscribedAt.toISOString(),
  });
});

export default router;
