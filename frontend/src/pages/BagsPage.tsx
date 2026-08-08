import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export const BagsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/products/category/bags')
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Failed to fetch bags:', err));
  }, []);

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Handmade Bags Collection</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
        {products.map((item) => (
          <div key={item._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
            <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>₹{item.price}</p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
              <button
                onClick={() => addToCart(item)}
                style={{ padding: '0.5rem 1rem', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleBuyNow(item)}
                style={{ padding: '0.5rem 1rem', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BagsPage;
