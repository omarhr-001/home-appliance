import { Navbar } from "./Navbar";
import { Phone, MapPin, Mail, Facebook, Instagram } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <footer className="bg-[#3a3d42] text-white mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/hme-logo.jpg" alt="HME" className="h-14 w-14 rounded-full object-cover border-2 border-primary/40" />
                <div>
                  <p className="font-bold text-lg leading-tight" style={{fontFamily:'Outfit,sans-serif'}}>Hamroun Meuble</p>
                  <p className="text-primary text-sm font-semibold">& Electro</p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Votre destination pour les meilleurs appareils électroménagers et meubles de qualité. Service de confiance depuis des années.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest text-primary mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5 text-white/70 text-sm">
                  <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span>Algérie</span>
                </li>
                <li className="flex items-center gap-2.5 text-white/70 text-sm">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span>Contactez-nous</span>
                </li>
                <li className="flex items-center gap-2.5 text-white/70 text-sm">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span>info@hme.dz</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest text-primary mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                {["Tous les produits", "Réfrigérateurs", "Lave-linge", "Climatiseurs", "Micro-ondes", "Fours"].map((item) => (
                  <li key={item}>
                    <a href="/" className="text-white/60 text-sm hover:text-primary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs">
              &copy; {new Date().getFullYear()} Hamroun Meuble & Electro. Tous droits réservés.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
