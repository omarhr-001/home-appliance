import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetCart, usePlaceOrder } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Package, ArrowLeft, CreditCard, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

const checkoutSchema = z.object({
  shippingAddress: z.string().min(10, "Please enter your full shipping address"),
  notes: z.string().optional(),
});

export default function Checkout() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: cartItems, isLoading } = useGetCart({ query: { enabled: !!user } });
  const placeOrder = usePlaceOrder();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { shippingAddress: "", notes: "" },
  });

  const total = cartItems?.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 0;

  if (!user) {
    setLocation("/login");
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-8 max-w-4xl">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="h-80" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-4xl">
        <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-30" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add items before checking out.</p>
        <Link href="/"><Button>Browse Products</Button></Link>
      </div>
    );
  }

  async function onSubmit(values: z.infer<typeof checkoutSchema>) {
    try {
      const order = await placeOrder.mutateAsync({
        data: {
          shippingAddress: values.shippingAddress,
          notes: values.notes || undefined,
        },
      });
      toast({
        title: "Order placed!",
        description: "Your order has been confirmed. We'll notify you when it ships.",
      });
      setLocation(`/orders/${order.id}`);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Order failed",
        description: err?.data?.message || "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-8 max-w-5xl">
      <Button variant="ghost" onClick={() => setLocation("/cart")} className="mb-6 -ml-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cart
      </Button>

      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Shipping Information
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="shippingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="123 Main St, Apt 4B&#10;New York, NY 10001&#10;United States"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special delivery instructions..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="bg-muted/50 border border-dashed rounded-lg p-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="font-medium text-foreground">Demo Mode</span>
                </div>
                Payment is simulated for this demo. No real charge will be made.
              </div>
              <Button type="submit" className="w-full h-12 text-base" disabled={placeOrder.isPending}>
                {placeOrder.isPending ? "Placing Order..." : `Place Order · $${total.toFixed(2)}`}
              </Button>
            </form>
          </Form>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Order Summary
          </h2>
          <div className="bg-card border rounded-xl p-5">
            <div className="space-y-4 mb-5">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-14 h-14 bg-muted/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.product.imageUrl ? (
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
                    <p className="font-medium text-sm line-clamp-2">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-sm shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="mb-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
