import { Router } from "express";
import { db, profilesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.get("/auth/me", requireAuth, async (req, res): Promise<void> => {
  try {
    const profiles = await db
      .select()
      .from(profilesTable)
      .where(eq(profilesTable.id, req.userId!))
      .limit(1);

    if (!profiles[0]) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    const p = profiles[0];
    res.json({
      id: p.id,
      name: p.name,
      phone: p.phone,
      role: p.role,
      email: p.email,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get profile");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
