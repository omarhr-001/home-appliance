import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

export default function OrderDetail() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/orders">
          <Button variant="ghost" className="mb-6">
            Retour aux commandes
          </Button>
        </Link>

        <h1 className="text-3xl font-black mb-8">Détail de la commande</h1>
        
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-24 w-24 rounded-full bg-muted/60 flex items-center justify-center mb-6">
            <Package className="h-12 w-12 text-muted-foreground/40" />
          </div>
          <h2 className="text-xl font-bold mb-2">Commande non trouvée</h2>
          <p className="text-muted-foreground max-w-sm mb-6">
            Cette commande n&apos;existe pas ou appartient à un autre compte.
          </p>
          <Link href="/orders">
            <Button>Retour aux commandes</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
