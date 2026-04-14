import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminRoute } from "@/components/AdminRoute";
import { Layout } from "@/components/Layout";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import ProductDetail from "@/pages/product-detail";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import Orders from "@/pages/orders";
import OrderDetail from "@/pages/order-detail";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProducts from "@/pages/admin/products";
import AdminOrders from "@/pages/admin/orders";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Layout><Home /></Layout>
      </Route>
      <Route path="/login">
        <Layout><Login /></Layout>
      </Route>
      <Route path="/register">
        <Layout><Register /></Layout>
      </Route>
      <Route path="/products/:id">
        {(params) => (
          <Layout>
            <ProductDetail />
          </Layout>
        )}
      </Route>
      <Route path="/cart">
        <Layout>
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        </Layout>
      </Route>
      <Route path="/checkout">
        <Layout>
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        </Layout>
      </Route>
      <Route path="/orders/:id">
        <Layout>
          <ProtectedRoute>
            <OrderDetail />
          </ProtectedRoute>
        </Layout>
      </Route>
      <Route path="/orders">
        <Layout>
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        </Layout>
      </Route>
      <Route path="/admin">
        <Layout>
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        </Layout>
      </Route>
      <Route path="/admin/products">
        <Layout>
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        </Layout>
      </Route>
      <Route path="/admin/orders">
        <Layout>
          <AdminRoute>
            <AdminOrders />
          </AdminRoute>
        </Layout>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base === "/" ? "/" : base.replace(/\/$/, "");
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={normalizedBase}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
