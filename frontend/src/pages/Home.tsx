import { Link } from 'wouter'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to Home Appliance Store
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover the best home appliances at unbeatable prices
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Shop Now
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Quality Products</h2>
            <p className="text-gray-600">High-quality appliances from trusted brands</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Best Prices</h2>
            <p className="text-gray-600">Competitive prices with regular discounts</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Fast Shipping</h2>
            <p className="text-gray-600">Quick and reliable delivery to your door</p>
          </div>
        </div>
      </div>
    </div>
  )
}
