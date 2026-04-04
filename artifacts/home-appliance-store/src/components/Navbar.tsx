import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useGetCart } from "@workspace/api-client-react";
import { ShoppingCart, User as UserIcon, Menu, Package, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const { user, profile, signOut } = useAuth();
  const [, setLocation] = useLocation();
  const { data: cartItems } = useGetCart({
    query: {
      enabled: !!user && profile?.role !== "admin",
    }
  });

  const cartCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleSignOut = async () => {
    await signOut();
    setLocation("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-semibold px-2">Home</Link>
                {profile?.role === "admin" ? (
                  <>
                    <Link href="/admin" className="text-lg font-semibold px-2">Dashboard</Link>
                    <Link href="/admin/products" className="text-lg font-semibold px-2">Products</Link>
                    <Link href="/admin/orders" className="text-lg font-semibold px-2">Orders</Link>
                  </>
                ) : (
                  <>
                    <Link href="/orders" className="text-lg font-semibold px-2">My Orders</Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
              <Package className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:inline-block text-primary">
              Lumina
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 ml-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Products
            </Link>
            {profile?.role === "admin" && (
              <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {profile?.role !== "admin" && (
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative hover-elevate">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full border border-border">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {profile?.name && <p className="font-medium">{profile.name}</p>}
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {profile?.role === "admin" ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer flex w-full items-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="cursor-pointer flex w-full items-center">
                        <Package className="mr-2 h-4 w-4" />
                        <span>My Orders</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:flex">Log in</Button>
              </Link>
              <Link href="/register">
                <Button>Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
