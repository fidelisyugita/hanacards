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

function App() {
  return (
    <>
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
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
