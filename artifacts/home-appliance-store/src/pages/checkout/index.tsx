export default function Checkout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Shipping Address</h2>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input 
                  type="text" 
                  placeholder="Address" 
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="City" 
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input 
                    type="text" 
                    placeholder="ZIP Code" 
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </form>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Payment Method</h2>
              <p className="text-muted-foreground">Payment options would appear here</p>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>
            <p className="text-muted-foreground mb-6">No items in order</p>
            
            <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
