import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { BagsPage } from './pages/BagsPage';
import { ClothStoragePage } from './pages/ClothStoragePage';
import { EquipmentPage } from './pages/EquipmentPage';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bags" element={<BagsPage />} />
        <Route path="/cloth-storage" element={<ClothStoragePage />} />
        <Route path="/equipment" element={<EquipmentPage />} />
      </Routes>
    </Router>
  );
}