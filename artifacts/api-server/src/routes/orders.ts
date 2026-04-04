import { Router } from "express";
import { db, ordersTable, orderItemsTable, cartItemsTable, productsTable } from "@workspace/db";
import { eq, and, sql, desc } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth";
import {
  PlaceOrderBody,
  ListOrdersQueryParams,
  GetOrderParams,
} from "@workspace/api-zod";

const router = Router();

function formatOrder(o: typeof ordersTable.$inferSelect) {
  return {
    id: o.id,
    userId: o.userId,
    totalPrice: Number(o.totalPrice),
    status: o.status,
    shippingName: o.shippingName,
    shippingPhone: o.shippingPhone,
    shippingAddress: o.shippingAddress,
    createdAt: o.createdAt.toISOString(),
  };
}

router.get("/orders", requireAuth, async (req, res): Promise<void> => {
  try {
    const parsed = ListOrdersQueryParams.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid query params" });
      return;
    }

    const { page = 1, limit = 10 } = parsed.data;
    const offset = (page - 1) * limit;

    const [orders, countResult] = await Promise.all([
      db
        .select()
        .from(ordersTable)
        .where(eq(ordersTable.userId, req.userId!))
        .orderBy(desc(ordersTable.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(ordersTable)
        .where(eq(ordersTable.userId, req.userId!)),
    ]);

    const total = countResult[0]?.count ?? 0;

    res.json({
      orders: orders.map(formatOrder),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to list orders");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/orders", requireAuth, async (req, res): Promise<void> => {
  try {
    const parsed = PlaceOrderBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid body" });
      return;
    }

    const userId = req.userId!;
    const { shippingName, shippingPhone, shippingAddress } = parsed.data;

    // Get cart items with products
    const cartItems = await db
      .select({
        id: cartItemsTable.id,
        productId: cartItemsTable.productId,
        quantity: cartItemsTable.quantity,
        product: {
          id: productsTable.id,
          price: productsTable.price,
          stock: productsTable.stock,
          name: productsTable.name,
        },
      })
      .from(cartItemsTable)
      .innerJoin(productsTable, eq(cartItemsTable.productId, productsTable.id))
      .where(eq(cartItemsTable.userId, userId));

    if (cartItems.length === 0) {
      res.status(400).json({ error: "Cart is empty" });
      return;
    }

    // Validate stock
    for (const item of cartItems) {
      if (item.quantity > item.product.stock) {
        res.status(400).json({
          error: `Insufficient stock for "${item.product.name}". Available: ${item.product.stock}`,
        });
        return;
      }
    }

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    );

    // Create order
    const [order] = await db
      .insert(ordersTable)
      .values({
        userId,
        totalPrice: String(totalPrice.toFixed(2)),
        status: "pending",
        shippingName,
        shippingPhone,
        shippingAddress,
      })
      .returning();

    // Create order items and decrement stock
    await Promise.all([
      db.insert(orderItemsTable).values(
        cartItems.map((item) => ({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: item.product.price,
        }))
      ),
      ...cartItems.map((item) =>
        db
          .update(productsTable)
          .set({ stock: item.product.stock - item.quantity })
          .where(eq(productsTable.id, item.productId))
      ),
    ]);

    // Clear cart
    await db.delete(cartItemsTable).where(eq(cartItemsTable.userId, userId));

    res.status(201).json(formatOrder(order));
  } catch (err) {
    req.log.error({ err }, "Failed to place order");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/orders/:id", requireAuth, async (req, res): Promise<void> => {
  try {
    const parsed = GetOrderParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid order id" });
      return;
    }

    const orders = await db
      .select()
      .from(ordersTable)
      .where(
        and(
          eq(ordersTable.id, parsed.data.id),
          eq(ordersTable.userId, req.userId!)
        )
      )
      .limit(1);

    if (!orders[0]) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    const items = await db
      .select({
        id: orderItemsTable.id,
        orderId: orderItemsTable.orderId,
        productId: orderItemsTable.productId,
        quantity: orderItemsTable.quantity,
        priceAtPurchase: orderItemsTable.priceAtPurchase,
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
      .from(orderItemsTable)
      .leftJoin(productsTable, eq(orderItemsTable.productId, productsTable.id))
      .where(eq(orderItemsTable.orderId, parsed.data.id));

    res.json({
      ...formatOrder(orders[0]),
      items: items.map((item) => ({
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: Number(item.priceAtPurchase),
        product: item.product
          ? {
              ...item.product,
              price: Number(item.product.price),
              createdAt: item.product.createdAt.toISOString(),
            }
          : undefined,
      })),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get order");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
