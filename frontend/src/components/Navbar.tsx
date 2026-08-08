import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav style={{ padding: '1rem 2rem', background: '#2c3e50', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2>Handcrafted Studio</h2>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        <Link to="/bags" style={{ color: '#fff', textDecoration: 'none' }}>Handbags</Link>
        <Link to="/cloth-storage" style={{ color: '#fff', textDecoration: 'none' }}>Cloth Storage</Link>
        <Link to="/equipment" style={{ color: '#fff', textDecoration: 'none' }}>Other Equipment</Link>
        <Link to="/cart" style={{ color: '#fff', textDecoration: 'none', background: '#e67e22', padding: '0.4rem 0.8rem', borderRadius: '4px', fontWeight: 'bold' }}>
          Cart ({itemCount})
        </Link>
      </div>
    </nav>
  );
};
