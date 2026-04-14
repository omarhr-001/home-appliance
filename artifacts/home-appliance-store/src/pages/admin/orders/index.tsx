export default function AdminOrders() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Manage Orders</h1>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground">No orders to manage</p>
        </div>
      </div>
    </div>
  );
}
