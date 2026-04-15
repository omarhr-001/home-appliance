import { Router, Route } from 'wouter'
import Home from './pages/Home'
import Products from './pages/Products'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route component={NotFound} />
      </Layout>
    </Router>
  )
}

export default App
