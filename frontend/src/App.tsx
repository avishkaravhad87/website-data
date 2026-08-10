import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { BagsPage } from './pages/BagsPage';
import { ClothStoragePage } from './pages/ClothStoragePage';
import { EquipmentPage } from './pages/EquipmentPage';
import { CartPage } from './pages/CartPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { AdminPage } from './pages/AdminPage';
export default function App() {
  return (
    <Router>
      <div className="app">

        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bags" element={<BagsPage />} />
            <Route path="/cloth-storage" element={<ClothStoragePage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
	    <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
}
