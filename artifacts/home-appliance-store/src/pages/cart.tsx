import { Link, useLocation } from "wouter";
import { useGetCart, useUpdateCartItem, useRemoveFromCart, useClearCart, useListProducts } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";

export default function Cart() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: cartItems, isLoading } = useGetCart({ query: { enabled: !!user } });
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveFromCart();
  const clearCart = useClearCart();

  const total = cartItems?.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 0;

  if (!user) {
    setLocation("/login");
    return null;
  }

  const handleUpdateQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1) return;
    try {
      await updateItem.mutateAsync({ id: itemId, data: { quantity } });
    } catch {
      toast({ variant: "destructive", title: "Failed to update quantity" });
    }
  };

  const handleRemoveItem = async (itemId: number, name: string) => {
    try {
      await removeItem.mutateAsync({ id: itemId });
      toast({ title: "Item removed", description: `${name} removed from your cart.` });
    } catch {
      toast({ variant: "destructive", title: "Failed to remove item" });
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart.mutateAsync();
      toast({ title: "Cart cleared" });
    } catch {
      toast({ variant: "destructive", title: "Failed to clear cart" });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-8 max-w-4xl">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-48 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-4xl">
        <ShoppingBag className="h-20 w-20 text-muted-foreground mx-auto mb-6 opacity-30" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Add some appliances to get started.</p>
        <Link href="/">
          <Button size="lg">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => setLocation("/")} className="-ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive"
          onClick={handleClearCart}
          disabled={clearCart.isPending}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear all
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-6">
        Shopping Cart <span className="text-muted-foreground font-normal text-lg">({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})</span>
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border rounded-xl bg-card">
              <div className="w-24 h-24 bg-muted/30 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                {item.product.imageUrl ? (
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-contain p-2 mix-blend-multiply"
                  />
                ) : (
                  <ShoppingCart className="h-8 w-8 text-muted-foreground opacity-30" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.product.id}`}>
                  <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 cursor-pointer">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mt-0.5">{item.product.category}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-r-none"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1 || updateItem.isPending}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-l-none"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock || updateItem.isPending}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-foreground">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveItem(item.id, item.product.name)}
                      disabled={removeItem.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border rounded-xl p-6 h-fit sticky top-24">
          <h2 className="font-bold text-lg mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground line-clamp-1 max-w-[160px]">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="font-medium shrink-0">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <Separator className="mb-4" />
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
          <Button
            className="w-full h-11"
            onClick={() => setLocation("/checkout")}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
