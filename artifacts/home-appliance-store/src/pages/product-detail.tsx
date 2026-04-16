import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PackageOpen } from "lucide-react";

export default function ProductDetail() {
  const product = {
    id: "1",
    name: "Samsung Refrigerator",
    description: "Modern refrigerator with smart features",
    price: 85000,
    category: "Refrigerators",
    stock: 10,
    specs: [
      { label: "Capacity", value: "650L" },
      { label: "Energy Class", value: "A+" },
      { label: "Cooling Type", value: "Dual Cooling" },
      { label: "Warranty", value: "3 Years" },
    ]
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l&apos;accueil
          </Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center bg-gray-50 rounded-xl border border-border aspect-square">
            <PackageOpen className="h-24 w-24 text-muted-foreground/20" />
          </div>

          <div>
            <div className="mb-4">
              <span className="text-sm text-muted-foreground uppercase tracking-wide">{product.category}</span>
              <h1 className="text-4xl font-black my-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl mb-6 border border-border">
              <div className="text-3xl font-black text-foreground mb-2">
                {product.price.toLocaleString("fr-DZ")} DA
              </div>
              <div className="text-sm text-muted-foreground">
                Stock: {product.stock > 0 ? `${product.stock} unités` : "Rupture"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {product.specs.map((spec) => (
                <div key={spec.label} className="border border-border rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">{spec.label}</p>
                  <p className="font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>

            <Button className="w-full h-12" disabled={product.stock === 0}>
              {product.stock > 0 ? "Ajouter au panier" : "Rupture de stock"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
