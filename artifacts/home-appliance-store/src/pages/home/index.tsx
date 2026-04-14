export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">Welcome to Home Appliance Store</h1>
        <p className="text-lg text-muted-foreground mb-8">Discover quality home appliances at great prices</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border border-border rounded-lg bg-card hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Kitchen Appliances</h3>
            <p className="text-muted-foreground">Premium kitchen equipment for modern homes</p>
          </div>
          
          <div className="p-6 border border-border rounded-lg bg-card hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Laundry Solutions</h3>
            <p className="text-muted-foreground">Efficient washing and drying appliances</p>
          </div>
          
          <div className="p-6 border border-border rounded-lg bg-card hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Climate Control</h3>
            <p className="text-muted-foreground">Air conditioning and heating systems</p>
          </div>
        </div>
      </div>
    </div>
  );
}
