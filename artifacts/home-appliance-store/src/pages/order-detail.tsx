import { useParams, useLocation } from "wouter";
import { useGetOrder } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package, MapPin, AlertCircle, CheckCircle2 } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusSteps = ["pending", "confirmed", "shipped", "delivered"];

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const { data: order, isLoading, error } = useGetOrder(Number(id), {
    query: { enabled: !!user },
  });

  if (!user) {
    setLocation("/login");
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-8 max-w-3xl">
        <Skeleton className="h-8 w-40 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-3xl">
        <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order not found</h2>
        <p className="text-muted-foreground mb-6">This order doesn't exist or belongs to another account.</p>
        <Button onClick={() => setLocation("/orders")}>View All Orders</Button>
      </div>
    );
  }

  const currentStep = order.status === "cancelled" ? -1 : statusSteps.indexOf(order.status);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-8 max-w-3xl">
      <Button variant="ghost" onClick={() => setLocation("/orders")} className="mb-6 -ml-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>
          <p className="text-muted-foreground mt-1">
            Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric"
            })}
          </p>
        </div>
        <span className={`text-sm font-medium px-3 py-1.5 rounded-full capitalize ${statusColors[order.status] || "bg-gray-100 text-gray-800"}`}>
          {order.status}
        </span>
      </div>

      {order.status !== "cancelled" && (
        <div className="bg-card border rounded-xl p-6 mb-6">
          <h2 className="font-semibold mb-4">Order Progress</h2>
          <div className="flex items-center justify-between">
            {statusSteps.map((step, i) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      i <= currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i <= currentStep ? <CheckCircle2 className="h-4 w-4" /> : <span>{i + 1}</span>}
                  </div>
                  <span className="text-xs mt-2 capitalize text-muted-foreground hidden sm:block">{step}</span>
                </div>
                {i < statusSteps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full ${i < currentStep ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-card border rounded-xl p-6 mb-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Items Ordered
        </h2>
        <div className="space-y-4">
          {order.items?.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-16 h-16 bg-muted/30 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                {item.product?.imageUrl ? (
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-contain p-1 mix-blend-multiply"
                  />
                ) : (
                  <Package className="h-6 w-6 text-muted-foreground opacity-30" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium line-clamp-2">{item.product?.name || "Product"}</p>
                <p className="text-sm text-muted-foreground mt-0.5">${item.unitPrice.toFixed(2)} each</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold">${(item.unitPrice * item.quantity).toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Shipping Address
        </h2>
        <p className="text-muted-foreground whitespace-pre-wrap">{order.shippingAddress}</p>
        {order.notes && (
          <>
            <Separator className="my-3" />
            <h3 className="font-medium mb-1 text-sm">Order Notes</h3>
            <p className="text-muted-foreground text-sm">{order.notes}</p>
          </>
        )}
      </div>
    </div>
  );
}
