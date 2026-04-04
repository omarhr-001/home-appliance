import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useGetProduct, useAddToCart, useGetCart } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
  Package,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useGetProduct(Number(id));
  const { data: cartItems } = useGetCart({ query: { enabled: !!user && profile?.role !== "admin" } });
  const addToCart = useAddToCart();

  const cartItem = cartItems?.find((item) => item.productId === Number(id));
  const totalInCart = cartItem?.quantity || 0;
  const availableStock = (product?.stock || 0) - totalInCart;

  const handleAddToCart = async () => {
    if (!user) {
      setLocation("/login");
      return;
    }
    try {
      await addToCart.mutateAsync({ data: { productId: Number(id), quantity } });
      toast({ title: "Added to cart", description: `${product?.name} × ${quantity} added to your cart.` });
    } catch {
      toast({ variant: "destructive", title: "Failed to add to cart", description: "Please try again." });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-12 w-full mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Product not found</h2>
        <p className="text-muted-foreground mb-6">This product doesn't exist or has been removed.</p>
        <Button onClick={() => setLocation("/")}>Back to products</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-8">
      <Button variant="ghost" onClick={() => setLocation("/")} className="mb-6 -ml-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square bg-muted/30 rounded-2xl flex items-center justify-center p-8 border">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-contain w-full h-full mix-blend-multiply"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <Package className="h-24 w-24 opacity-20 mb-4" />
              <span className="text-sm uppercase tracking-wider">{product.category}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <Badge variant="secondary" className="mb-3">{product.category}</Badge>
            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
          </div>

          <div className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</div>

          <Separator />

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <Separator />

          <div className="flex items-center gap-3">
            {product.stock === 0 ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Out of stock</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">
                  {product.stock <= 5 ? `Only ${product.stock} left!` : "In stock"}
                </span>
              </div>
            )}
          </div>

          {product.stock > 0 && profile?.role !== "admin" && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-r-none"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium text-sm">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-l-none"
                    onClick={() => setQuantity((q) => Math.min(availableStock, q + 1))}
                    disabled={quantity >= availableStock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {totalInCart > 0 && (
                  <span className="text-sm text-muted-foreground">({totalInCart} in cart)</span>
                )}
              </div>

              <Button
                className="w-full h-12 text-base"
                onClick={handleAddToCart}
                disabled={addToCart.isPending || availableStock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {addToCart.isPending ? "Adding..." : availableStock === 0 ? "Max quantity in cart" : "Add to Cart"}
              </Button>
            </div>
          )}

          {profile?.role === "admin" && (
            <div className="rounded-lg bg-muted/50 p-4 border border-dashed">
              <p className="text-sm text-muted-foreground text-center">
                You're viewing as admin. Switch to a customer account to add items to cart.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
