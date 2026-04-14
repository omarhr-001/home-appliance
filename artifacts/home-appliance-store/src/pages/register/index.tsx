export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card border border-border rounded-lg">
        <h1 className="text-2xl font-bold text-foreground mb-6">Create Account</h1>
        <p className="text-muted-foreground mb-6">Register for a new account</p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium"
          >
            Create Account
          </button>
        </form>
        
        <p className="text-center text-muted-foreground mt-4">
          Already have an account? <a href="/login" className="text-primary hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
