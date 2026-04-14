export default function ProductDetail() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="bg-muted rounded-lg h-80"></div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Product Name</h1>
            <p className="text-muted-foreground mb-4">Product category</p>
            
            <div className="text-2xl font-bold text-primary mb-6">$499.99</div>
            
            <p className="text-muted-foreground mb-6">Product description would go here with details about features and specifications.</p>
            
            <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
