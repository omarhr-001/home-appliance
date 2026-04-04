import { Router } from "express";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import { requireAdmin } from "../middlewares/auth";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.post(
  "/upload/product-image",
  requireAdmin,
  upload.single("file"),
  async (req, res): Promise<void> => {
    try {
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseUrl || !supabaseServiceKey) {
        res.status(500).json({ error: "Storage not configured" });
        return;
      }

      if (!req.file) {
        res.status(400).json({ error: "No file provided" });
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseServiceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const ext = req.file.originalname.split(".").pop() ?? "jpg";
      const filename = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filename, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false,
        });

      if (uploadError) {
        req.log.error({ err: uploadError }, "Supabase storage upload failed");
        res.status(500).json({ error: "Failed to upload image" });
        return;
      }

      const { data } = supabase.storage.from("product-images").getPublicUrl(filename);
      res.json({ url: data.publicUrl });
    } catch (err) {
      req.log.error({ err }, "Failed to upload product image");
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
