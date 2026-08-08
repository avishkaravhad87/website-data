import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav style={{ padding: '1rem 2rem', background: '#2c3e50', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
      <h2>Handcrafted Studio</h2>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        <Link to="/bags" style={{ color: '#fff', textDecoration: 'none' }}>Handbags</Link>
        <Link to="/cloth-storage" style={{ color: '#fff', textDecoration: 'none' }}>Cloth Storage</Link>
        <Link to="/equipment" style={{ color: '#fff', textDecoration: 'none' }}>Other Equipment</Link>
      </div>
    </nav>
  );
};
