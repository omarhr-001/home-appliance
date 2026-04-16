import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function Orders() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black mb-8">Mes commandes</h1>
        
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-24 w-24 rounded-full bg-muted/60 flex items-center justify-center mb-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
          </div>
          <h2 className="text-xl font-bold mb-2">Aucune commande</h2>
          <p className="text-muted-foreground max-w-sm mb-6">
            Vous n&apos;avez pas encore passé de commande. Commencez à faire vos achats!
          </p>
          <Link href="/">
            <Button>Continuer vos achats</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
