import { Link, useLocation } from "wouter";
import { useListOrders } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, ArrowRight, ShoppingBag } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

export default function Orders() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { data: orders, isLoading } = useListOrders({ query: { enabled: !!user } });

  if (!user) {
    setLocation("/login");
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-8 max-w-3xl">
        <Skeleton className="h-8 w-40 mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-3xl">
        <ShoppingBag className="h-20 w-20 text-muted-foreground mx-auto mb-6 opacity-30" />
        <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
        <p className="text-muted-foreground mb-8">
          Start shopping to see your orders here.
        </p>
        <Link href="/">
          <Button size="lg">
            <Package className="mr-2 h-5 w-5" />
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link key={order.id} href={`/orders/${order.id}`}>
            <div className="border rounded-xl p-5 bg-card hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-foreground">Order #{order.id}</span>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${statusColors[order.status] || "bg-gray-100 text-gray-800"}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {order.shippingAddress}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold text-lg text-primary">${order.totalAmount.toFixed(2)}</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
