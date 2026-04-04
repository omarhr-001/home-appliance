import { Router } from "express";
import { db, profilesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth";
import { createClient } from "@supabase/supabase-js";

const router = Router();

// Called after successful registration to create a profile record
router.post("/profiles", requireAuth, async (req, res): Promise<void> => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      res.status(500).json({ error: "Auth not configured" });
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: userData } = await supabase.auth.admin.getUserById(req.userId!);
    if (!userData.user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const { name, phone } = req.body as { name?: string; phone?: string };

    // Check if profile already exists
    const existing = await db
      .select()
      .from(profilesTable)
      .where(eq(profilesTable.id, req.userId!))
      .limit(1);

    if (existing[0]) {
      res.json({
        id: existing[0].id,
        name: existing[0].name,
        phone: existing[0].phone,
        role: existing[0].role,
        email: existing[0].email,
      });
      return;
    }

    const email = userData.user.email ?? "";
    const inserted = await db
      .insert(profilesTable)
      .values({
        id: req.userId!,
        name: name ?? email.split("@")[0],
        phone: phone ?? null,
        role: "customer",
        email,
      })
      .returning();

    const p = inserted[0];
    res.status(201).json({
      id: p.id,
      name: p.name,
      phone: p.phone,
      role: p.role,
      email: p.email,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create profile");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
