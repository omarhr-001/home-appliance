import { useState } from "react";
import { useListProducts, useListCategories, getListProductsQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Search, SlidersHorizontal, PackageX } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>();
  const [page, setPage] = useState(1);

  const { data: categoriesData } = useListCategories();
  
  const { data: productsData, isLoading } = useListProducts({
    search: search || undefined,
    category: category && category !== "all" ? category : undefined,
    page,
    limit: 12,
  }, {
    query: {
      queryKey: getListProductsQueryKey({ search: search || undefined, category: category && category !== "all" ? category : undefined, page, limit: 12 })
    }
  });

  return (
    <div className="container mx-auto px-4 py-8 sm:px-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-muted/50 p-6 rounded-xl border">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">Premium Appliances</h1>
            <p className="text-muted-foreground mt-1">Upgrade your home with our curated selection.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-9 bg-background"
              />
            </div>
            <Select
              value={category || "all"}
              onValueChange={(val) => {
                setCategory(val);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[180px] bg-background">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoriesData?.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-1/4 mt-2" />
              </div>
            ))}
          </div>
        ) : productsData?.products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border rounded-xl border-dashed">
            <PackageX className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No products found</h3>
            <p className="text-muted-foreground max-w-sm mt-1">
              We couldn't find any products matching your current filters. Try adjusting your search or category.
            </p>
            <Button 
              variant="outline" 
              className="mt-6"
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productsData?.products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="h-full overflow-hidden hover-elevate transition-all duration-300 border-border/50 hover:border-primary/50 group cursor-pointer bg-card/50 backdrop-blur-sm">
                    <div className="aspect-square bg-muted/30 flex items-center justify-center p-6 relative overflow-hidden">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">
                          <PackageX className="h-8 w-8 mb-2 opacity-50" />
                          <span className="text-xs uppercase tracking-wider font-medium">{product.category}</span>
                        </div>
                      )}
                      {product.stock <= 5 && product.stock > 0 && (
                        <Badge variant="destructive" className="absolute top-3 right-3 shadow-sm">
                          Only {product.stock} left
                        </Badge>
                      )}
                      {product.stock === 0 && (
                        <Badge variant="secondary" className="absolute top-3 right-3 shadow-sm bg-background/80 backdrop-blur-md">
                          Out of stock
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <div className="text-xs font-medium text-primary/80 uppercase tracking-wider mb-1.5">
                        {product.category}
                      </div>
                      <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </CardContent>
                    <CardFooter className="px-5 pb-5 pt-0 flex items-center justify-between">
                      <div className="text-lg font-bold text-foreground">
                        ${product.price.toFixed(2)}
                      </div>
                      <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>

            {productsData && productsData.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <div className="text-sm font-medium px-4">
                  Page {page} of {productsData.totalPages}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(productsData.totalPages, p + 1))}
                  disabled={page === productsData.totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
