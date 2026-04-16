import { useState } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Star, Zap, Shield, Truck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categoryIcons: Record<string, string> = {
  "Refrigerators": "🧊",
  "Washing Machines": "🫧",
  "Air Conditioners": "❄️",
  "Microwaves": "📡",
  "Ovens": "🔥",
  "Dishwashers": "💧",
};

// Mock products
const mockProducts = [
  {
    id: "1",
    name: "Samsung Refrigerator",
    description: "Modern refrigerator with smart features",
    price: 85000,
    category: "Refrigerators",
    imageUrl: "",
    stock: 10,
  },
  {
    id: "2",
    name: "LG Washing Machine",
    description: "High-capacity washing machine",
    price: 65000,
    category: "Washing Machines",
    imageUrl: "",
    stock: 5,
  },
  {
    id: "3",
    name: "Daikin Air Conditioner",
    description: "Energy-efficient air conditioner",
    price: 95000,
    category: "Air Conditioners",
    imageUrl: "",
    stock: 12,
  },
  {
    id: "4",
    name: "Panasonic Microwave",
    description: "Compact microwave oven",
    price: 25000,
    category: "Microwaves",
    imageUrl: "",
    stock: 20,
  },
  {
    id: "5",
    name: "Bosch Oven",
    description: "Professional kitchen oven",
    price: 120000,
    category: "Ovens",
    imageUrl: "",
    stock: 3,
  },
  {
    id: "6",
    name: "Siemens Dishwasher",
    description: "Automatic dishwasher",
    price: 75000,
    category: "Dishwashers",
    imageUrl: "",
    stock: 8,
  },
];

const categories = ["Refrigerators", "Washing Machines", "Air Conditioners", "Microwaves", "Ovens", "Dishwashers"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>();

  const filteredProducts = mockProducts.filter((p) => {
    const matchesSearch = search === "" || p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const features = [
    { icon: Truck, label: "Livraison rapide", desc: "Partout en Algérie" },
    { icon: Shield, label: "Garantie officielle", desc: "Sur tous nos produits" },
    { icon: Star, label: "Service premium", desc: "Support client 7j/7" },
    { icon: Zap, label: "Meilleurs prix", desc: "Prix compétitifs" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#3a3d42]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-primary text-xs font-semibold tracking-wide uppercase">Nouveautés 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4" style={{fontFamily:'Outfit,sans-serif'}}>
              L&apos;électroménager{" "}
              <span className="text-primary">de qualité</span>{" "}
              à votre portée
            </h1>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Découvrez notre sélection de réfrigérateurs, lave-linge, climatiseurs et plus encore. Les meilleures marques au meilleur prix.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="text-base font-semibold rounded-full px-8 h-12"
                onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              >
                Voir tous les produits
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features bar */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {features.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3 py-4 px-4 md:px-6">
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <div className="hidden sm:block">
                  <p className="font-semibold text-sm text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <div className="sm:hidden">
                  <p className="font-medium text-xs text-foreground leading-tight">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories quick nav */}
      <div className="bg-background py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setCategory("all")}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                !category || category === "all"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-white"
              }`}
            >
              Tout afficher
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  category === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-white"
                }`}
              >
                <span>{categoryIcons[cat] || "📦"}</span>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products section */}
      <div id="products" className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Search & filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 bg-white border-border/80 rounded-xl"
            />
          </div>
          <Select
            value={category || "all"}
            onValueChange={(val) => setCategory(val)}
          >
            <SelectTrigger className="w-full sm:w-[200px] h-11 bg-white border-border/80 rounded-xl">
              <SelectValue placeholder="Toutes catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {categoryIcons[cat] || "📦"} {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-24 w-24 rounded-full bg-muted/60 flex items-center justify-center mb-6">
              <span className="text-4xl">📦</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Aucun produit trouvé</h3>
            <p className="text-muted-foreground max-w-sm mb-6">
              Aucun produit ne correspond à vos critères. Essayez d&apos;autres filtres.
            </p>
            <Button variant="outline" onClick={() => { setSearch(""); setCategory("all"); }}>
              Effacer les filtres
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredProducts.length}</span> produit{filteredProducts.length !== 1 ? "s" : ""} trouvé{filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div className="group bg-white rounded-2xl border border-border overflow-hidden card-hover cursor-pointer h-full flex flex-col">
                    <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                      <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/30">
                        <span className="text-5xl mb-2">{categoryIcons[product.category || ""] || "📦"}</span>
                      </div>
                      {/* Category pill */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#3a3d42]/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {product.category}
                        </span>
                      </div>
                      {/* Stock badges */}
                      {product.stock === 0 && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-white/90 backdrop-blur-sm text-muted-foreground text-[10px] font-semibold px-2.5 py-1 rounded-full border border-border">
                            Rupture
                          </span>
                        </div>
                      )}
                      {product.stock > 0 && product.stock <= 5 && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-orange-500 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                            Plus que {product.stock}!
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-foreground line-clamp-2 text-sm leading-snug mb-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-xs line-clamp-2 flex-1 mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/60">
                        <div>
                          <div className="text-xl font-black text-[#3a3d42]">
                            {product.price.toLocaleString("fr-DZ")} DA
                          </div>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                          <ArrowRight className="h-4 w-4 text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
