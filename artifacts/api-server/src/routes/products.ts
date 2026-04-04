import { Router } from "express";
import { db, productsTable } from "@workspace/db";
import { eq, ilike, gte, lte, and, sql, desc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import {
  CreateProductBody,
  UpdateProductBody,
  ListProductsQueryParams,
  GetProductParams,
  UpdateProductParams,
  DeleteProductParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/products", async (req, res): Promise<void> => {
  try {
    const parsed = ListProductsQueryParams.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid query parameters" });
      return;
    }

    const { search, category, minPrice, maxPrice, page = 1, limit = 12 } = parsed.data;

    const conditions = [];
    if (search) conditions.push(ilike(productsTable.name, `%${search}%`));
    if (category) conditions.push(eq(productsTable.category, category));
    if (minPrice !== undefined) conditions.push(gte(sql`${productsTable.price}::numeric`, minPrice));
    if (maxPrice !== undefined) conditions.push(lte(sql`${productsTable.price}::numeric`, maxPrice));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const offset = (page - 1) * limit;

    const [products, countResult] = await Promise.all([
      db
        .select()
        .from(productsTable)
        .where(where)
        .orderBy(desc(productsTable.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(productsTable)
        .where(where),
    ]);

    const total = countResult[0]?.count ?? 0;

    res.json({
      products: products.map(formatProduct),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to list products");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/categories", async (req, res): Promise<void> => {
  try {
    const result = await db
      .selectDistinct({ category: productsTable.category })
      .from(productsTable)
      .orderBy(productsTable.category);

    res.json(result.map((r) => r.category));
  } catch (err) {
    req.log.error({ err }, "Failed to list categories");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/:id", async (req, res): Promise<void> => {
  try {
    const parsed = GetProductParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid product id" });
      return;
    }

    const products = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, parsed.data.id))
      .limit(1);

    if (!products[0]) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(formatProduct(products[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to get product");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/products", requireAdmin, async (req, res): Promise<void> => {
  try {
    const parsed = CreateProductBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid body" });
      return;
    }

    const { name, description, price, imageUrl, category, stock } = parsed.data;

    const inserted = await db
      .insert(productsTable)
      .values({
        name,
        description,
        price: String(price),
        imageUrl: imageUrl ?? null,
        category,
        stock,
      })
      .returning();

    res.status(201).json(formatProduct(inserted[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to create product");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/products/:id", requireAdmin, async (req, res): Promise<void> => {
  try {
    const paramsParsed = UpdateProductParams.safeParse({ id: Number(req.params.id) });
    if (!paramsParsed.success) {
      res.status(400).json({ error: "Invalid product id" });
      return;
    }

    const bodyParsed = UpdateProductBody.safeParse(req.body);
    if (!bodyParsed.success) {
      res.status(400).json({ error: "Invalid body" });
      return;
    }

    const updates: Record<string, unknown> = {};
    const body = bodyParsed.data;
    if (body.name !== undefined) updates.name = body.name;
    if (body.description !== undefined) updates.description = body.description;
    if (body.price !== undefined) updates.price = String(body.price);
    if (body.imageUrl !== undefined) updates.imageUrl = body.imageUrl;
    if (body.category !== undefined) updates.category = body.category;
    if (body.stock !== undefined) updates.stock = body.stock;

    const updated = await db
      .update(productsTable)
      .set(updates)
      .where(eq(productsTable.id, paramsParsed.data.id))
      .returning();

    if (!updated[0]) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(formatProduct(updated[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to update product");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/products/:id", requireAdmin, async (req, res): Promise<void> => {
  try {
    const parsed = DeleteProductParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid product id" });
      return;
    }

    await db.delete(productsTable).where(eq(productsTable.id, parsed.data.id));
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete product");
    res.status(500).json({ error: "Internal server error" });
  }
});

function formatProduct(p: typeof productsTable.$inferSelect) {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    price: Number(p.price),
    imageUrl: p.imageUrl,
    category: p.category,
    stock: p.stock,
    createdAt: p.createdAt.toISOString(),
  };
}

export default router;
