import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Store from '@/pages/Store';
import Cart from '@/pages/Cart';
import Packs from '@/pages/Packs';
import Services from '@/pages/Services';
import ProductDetail from '@/pages/ProductDetail';

// Auth & Admin
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminRoute from '@/components/auth/AdminRoute';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Account from '@/pages/Account';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminOrders from '@/pages/admin/AdminOrders';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/packs" element={<Packs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* Public Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Customer Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Account />} />
            {/* Any checkout routes would go here */}
          </Route>
          
          {/* Admin Protected */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOrders />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="products" element={<AdminProducts />} />
            </Route>
          </Route>
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
