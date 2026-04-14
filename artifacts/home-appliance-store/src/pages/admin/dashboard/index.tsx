export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-muted-foreground text-sm font-medium mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-foreground">0</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-muted-foreground text-sm font-medium mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-foreground">$0.00</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-muted-foreground text-sm font-medium mb-2">Products</h3>
            <p className="text-3xl font-bold text-foreground">0</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-muted-foreground text-sm font-medium mb-2">Users</h3>
            <p className="text-3xl font-bold text-foreground">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
