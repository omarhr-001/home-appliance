import { Router } from "express";
import { db, cartItemsTable, productsTable, profilesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth";
import {
  AddToCartBody,
  UpdateCartItemBody,
  UpdateCartItemParams,
  RemoveFromCartParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/cart", requireAuth, async (req, res): Promise<void> => {
  try {
    const items = await db
      .select({
        id: cartItemsTable.id,
        userId: cartItemsTable.userId,
        productId: cartItemsTable.productId,
        quantity: cartItemsTable.quantity,
        createdAt: cartItemsTable.createdAt,
        product: {
          id: productsTable.id,
          name: productsTable.name,
          description: productsTable.description,
          price: productsTable.price,
          imageUrl: productsTable.imageUrl,
          category: productsTable.category,
          stock: productsTable.stock,
          createdAt: productsTable.createdAt,
        },
      })
      .from(cartItemsTable)
      .innerJoin(productsTable, eq(cartItemsTable.productId, productsTable.id))
      .where(eq(cartItemsTable.userId, req.userId!));

    res.json(
      items.map((item) => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
        product: {
          ...item.product,
          price: Number(item.product.price),
          createdAt: item.product.createdAt.toISOString(),
        },
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to get cart");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/cart", requireAuth, async (req, res): Promise<void> => {
  try {
    const parsed = AddToCartBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid body" });
      return;
    }

    const { productId, quantity } = parsed.data;
    const userId = req.userId!;

    // Ensure profile exists (auto-create if missing from Supabase auth)
    const existingProfile = await db
      .select()
      .from(profilesTable)
      .where(eq(profilesTable.id, userId))
      .limit(1);

    if (!existingProfile[0]) {
      res.status(400).json({ error: "User profile not found. Please register first." });
      return;
    }

    // Check if item already in cart
    const existing = await db
      .select()
      .from(cartItemsTable)
      .where(and(eq(cartItemsTable.userId, userId), eq(cartItemsTable.productId, productId)))
      .limit(1);

    let cartItem;
    if (existing[0]) {
      const updated = await db
        .update(cartItemsTable)
        .set({ quantity: existing[0].quantity + quantity })
        .where(eq(cartItemsTable.id, existing[0].id))
        .returning();
      cartItem = updated[0];
    } else {
      const inserted = await db
        .insert(cartItemsTable)
        .values({ userId, productId, quantity })
        .returning();
      cartItem = inserted[0];
    }

    res.json({
      ...cartItem,
      createdAt: cartItem.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to add to cart");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/cart/:id", requireAuth, async (req, res): Promise<void> => {
  try {
    const paramsParsed = UpdateCartItemParams.safeParse({ id: Number(req.params.id) });
    if (!paramsParsed.success) {
      res.status(400).json({ error: "Invalid cart item id" });
      return;
    }

    const bodyParsed = UpdateCartItemBody.safeParse(req.body);
    if (!bodyParsed.success) {
      res.status(400).json({ error: "Invalid body" });
      return;
    }

    const updated = await db
      .update(cartItemsTable)
      .set({ quantity: bodyParsed.data.quantity })
      .where(
        and(
          eq(cartItemsTable.id, paramsParsed.data.id),
          eq(cartItemsTable.userId, req.userId!)
        )
      )
      .returning();

    if (!updated[0]) {
      res.status(404).json({ error: "Cart item not found" });
      return;
    }

    res.json({
      ...updated[0],
      createdAt: updated[0].createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to update cart item");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/cart/:id", requireAuth, async (req, res): Promise<void> => {
  try {
    const parsed = RemoveFromCartParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid cart item id" });
      return;
    }

    await db
      .delete(cartItemsTable)
      .where(
        and(
          eq(cartItemsTable.id, parsed.data.id),
          eq(cartItemsTable.userId, req.userId!)
        )
      );

    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to remove cart item");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/cart", requireAuth, async (req, res): Promise<void> => {
  try {
    await db
      .delete(cartItemsTable)
      .where(eq(cartItemsTable.userId, req.userId!));

    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to clear cart");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
