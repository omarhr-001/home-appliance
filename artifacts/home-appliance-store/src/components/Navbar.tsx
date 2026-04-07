import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useGetCart } from "@workspace/api-client-react";
import { ShoppingCart, User as UserIcon, Menu, LogOut, LayoutDashboard, Package, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const { user, profile, signOut } = useAuth();
  const [location, setLocation] = useLocation();
  const { data: cartItems } = useGetCart({
    query: { enabled: !!user && profile?.role !== "admin" }
  });

  const cartCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleSignOut = async () => {
    await signOut();
    setLocation("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Mobile menu */}
        <div className="flex items-center gap-3 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <div className="bg-[#3a3d42] p-6">
                <img src="/hme-logo.jpg" alt="HME Logo" className="h-16 w-16 rounded-full mx-auto object-cover border-2 border-primary/40" />
                <p className="text-white font-bold text-center mt-3 text-lg" style={{fontFamily:'Outfit,sans-serif'}}>Hamroun Meuble</p>
                <p className="text-primary text-center text-sm font-medium">&amp; Electro</p>
              </div>
              <nav className="flex flex-col p-4 gap-1">
                <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  Tous les produits
                </Link>
                {profile?.role === "admin" ? (
                  <>
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
                      <LayoutDashboard className="h-4 w-4 text-primary" /> Dashboard
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
                      <Package className="h-4 w-4 text-primary" /> Produits
                    </Link>
                    <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
                      <ShoppingCart className="h-4 w-4 text-primary" /> Commandes
                    </Link>
                  </>
                ) : (
                  <Link href="/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
                    <Package className="h-4 w-4 text-primary" /> Mes commandes
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src="/hme-logo.jpg"
              alt="HME"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all duration-300"
            />
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-lg leading-none text-[#3a3d42]" style={{fontFamily:'Outfit,sans-serif'}}>
              Hamroun Meuble
            </div>
            <div className="text-xs font-semibold text-primary tracking-widest uppercase">
              &amp; Electro
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 ml-8">
          <Link href="/">
            <Button variant="ghost" className={`text-sm font-medium ${location === '/' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              Produits
            </Button>
          </Link>
          {profile?.role === "admin" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground gap-1">
                  Administration <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4 text-primary" /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/products" className="flex items-center gap-2 cursor-pointer">
                    <Package className="h-4 w-4 text-primary" /> Produits
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/orders" className="flex items-center gap-2 cursor-pointer">
                    <ShoppingCart className="h-4 w-4 text-primary" /> Commandes
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {user && profile?.role !== "admin" && (
            <Link href="/orders">
              <Button variant="ghost" className={`text-sm font-medium ${location.startsWith('/orders') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                Mes commandes
              </Button>
            </Link>
          )}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {profile?.role !== "admin" && (
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative h-9 w-9 hover:bg-accent">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Button>
            </Link>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 gap-2 px-3 rounded-full border border-border hover:border-primary/40 transition-colors">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserIcon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium hidden sm:block max-w-[100px] truncate">
                    {profile?.name || user.email?.split("@")[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2 border-b border-border">
                  {profile?.name && <p className="font-semibold text-sm">{profile.name}</p>}
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  {profile?.role === "admin" && (
                    <span className="mt-1 inline-flex text-[10px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full uppercase tracking-wider">Admin</span>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hidden sm:flex text-sm font-medium">
                  Connexion
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="text-sm font-semibold rounded-full px-5">
                  S'inscrire
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
