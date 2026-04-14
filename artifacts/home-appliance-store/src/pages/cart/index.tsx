export default function Cart() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4 pb-4 border-b border-border">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
            </div>
            
            <div className="flex justify-between text-lg font-bold text-foreground mb-6">
              <span>Total</span>
              <span>$0.00</span>
            </div>
            
            <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
