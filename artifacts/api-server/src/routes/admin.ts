import { Router } from "express";
import { db, ordersTable, productsTable, profilesTable, orderItemsTable, cartItemsTable } from "@workspace/db";
import { eq, sql, desc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import {
  AdminListOrdersQueryParams,
  UpdateOrderStatusBody,
  UpdateOrderStatusParams,
  GetRecentActivityQueryParams,
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

router.get("/admin/dashboard", requireAdmin, async (req, res): Promise<void> => {
  try {
    const [
      totalOrdersResult,
      totalRevenueResult,
      totalProductsResult,
      totalCustomersResult,
      pendingOrdersResult,
      ordersByStatusResult,
      recentRevenueResult,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)::int` }).from(ordersTable),
      db.select({ sum: sql<number>`coalesce(sum(total_price::numeric), 0)::float` }).from(ordersTable),
      db.select({ count: sql<number>`count(*)::int` }).from(productsTable),
      db
        .select({ count: sql<number>`count(distinct user_id)::int` })
        .from(ordersTable),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(ordersTable)
        .where(eq(ordersTable.status, "pending")),
      db
        .select({ status: ordersTable.status, count: sql<number>`count(*)::int` })
        .from(ordersTable)
        .groupBy(ordersTable.status),
      db
        .select({ sum: sql<number>`coalesce(sum(total_price::numeric), 0)::float` })
        .from(ordersTable)
        .where(sql`created_at >= now() - interval '30 days'`),
    ]);

    res.json({
      totalOrders: totalOrdersResult[0]?.count ?? 0,
      totalRevenue: totalRevenueResult[0]?.sum ?? 0,
      totalProducts: totalProductsResult[0]?.count ?? 0,
      totalCustomers: totalCustomersResult[0]?.count ?? 0,
      pendingOrders: pendingOrdersResult[0]?.count ?? 0,
      ordersByStatus: ordersByStatusResult,
      recentRevenue: recentRevenueResult[0]?.sum ?? 0,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get dashboard");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/admin/activity", requireAdmin, async (req, res): Promise<void> => {
  try {
    const parsed = GetRecentActivityQueryParams.safeParse(req.query);
    const limit = parsed.success ? (parsed.data.limit ?? 10) : 10;

    const orders = await db
      .select()
      .from(ordersTable)
      .orderBy(desc(ordersTable.createdAt))
      .limit(limit);

    res.json(
      orders.map((o) => ({
        id: o.id,
        orderId: o.id,
        userId: o.userId,
        totalPrice: Number(o.totalPrice),
        status: o.status,
        shippingName: o.shippingName,
        createdAt: o.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to get recent activity");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/admin/orders", requireAdmin, async (req, res): Promise<void> => {
  try {
    const parsed = AdminListOrdersQueryParams.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid query params" });
      return;
    }

    const { status, page = 1, limit = 20 } = parsed.data;
    const offset = (page - 1) * limit;

    const where = status ? eq(ordersTable.status, status as typeof ordersTable.$inferSelect.status) : undefined;

    const [orders, countResult] = await Promise.all([
      db
        .select()
        .from(ordersTable)
        .where(where)
        .orderBy(desc(ordersTable.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ count: sql<number>`count(*)::int` }).from(ordersTable).where(where),
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
    req.log.error({ err }, "Failed to list admin orders");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/admin/orders/:id/status", requireAdmin, async (req, res): Promise<void> => {
  try {
    const paramsParsed = UpdateOrderStatusParams.safeParse({ id: Number(req.params.id) });
    if (!paramsParsed.success) {
      res.status(400).json({ error: "Invalid order id" });
      return;
    }

    const bodyParsed = UpdateOrderStatusBody.safeParse(req.body);
    if (!bodyParsed.success) {
      res.status(400).json({ error: "Invalid body" });
      return;
    }

    const updated = await db
      .update(ordersTable)
      .set({ status: bodyParsed.data.status })
      .where(eq(ordersTable.id, paramsParsed.data.id))
      .returning();

    if (!updated[0]) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.json(formatOrder(updated[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to update order status");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
