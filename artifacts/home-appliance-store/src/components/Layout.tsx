import { Navbar } from "./Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Lumina Home Appliances. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
