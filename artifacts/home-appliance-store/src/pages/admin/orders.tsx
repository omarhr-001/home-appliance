import { useState } from "react";
import { Link } from "wouter";
import { useAdminListOrders, useUpdateOrderStatus } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Filter } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusOptions = ["all", "pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function AdminOrders() {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const { data: ordersData, isLoading } = useAdminListOrders({
    page,
    limit: 15,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = async (orderId: number, status: string) => {
    setUpdatingId(orderId);
    try {
      await updateStatus.mutateAsync({ id: orderId, data: { status } });
      toast({ title: "Order status updated" });
    } catch {
      toast({ variant: "destructive", title: "Failed to update status" });
    }
    setUpdatingId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((s) => (
                <SelectItem key={s} value={s}>
                  {s === "all" ? "All Statuses" : s.charAt(0).toUpperCase() + s.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
        </div>
      ) : (
        <div className="border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Order</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Date</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Customer</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {ordersData?.orders.map((order: any) => (
                  <tr key={order.id} className="bg-card hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-sm">#{order.id}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric"
                      })}
                    </td>
                    <td className="px-4 py-3 text-sm hidden md:table-cell">
                      <div>
                        <p className="font-medium">{order.profile?.name || "Customer"}</p>
                        <p className="text-muted-foreground text-xs">{order.profile?.email || ""}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-sm text-primary">${order.totalAmount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <Select
                        value={order.status}
                        onValueChange={(v) => handleStatusChange(order.id, v)}
                        disabled={updatingId === order.id}
                      >
                        <SelectTrigger className="w-[130px] h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.filter(s => s !== "all").map((s) => (
                            <SelectItem key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/orders/${order.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
                {ordersData?.orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {ordersData && ordersData.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button variant="outline" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
          <span className="text-sm font-medium px-4">Page {page} of {ordersData.totalPages}</span>
          <Button variant="outline" onClick={() => setPage(p => Math.min(ordersData.totalPages, p + 1))} disabled={page === ordersData.totalPages}>Next</Button>
        </div>
      )}
    </div>
  );
}
