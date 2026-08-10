import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
}

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }

        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Handbag Store</h1>

      <p>
        Explore our collection of handmade bags, cloth storage and
        equipment.
      </p>

      <h2 style={{ marginTop: '2rem' }}>Our Products</h2>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '1rem',
          }}
        >
          {products.map((item) => (
            <div
              key={item._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                textAlign: 'center',
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />

              <h3>{item.name}</h3>

              <p>{item.description}</p>

              <p
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                }}
              >
                ₹{item.price}
              </p>

              <p>Category: {item.category}</p>

              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'center',
                  marginTop: '1rem',
                }}
              >
                <button
                  onClick={() => addToCart(item)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#3498db',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => handleBuyNow(item)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#2ecc71',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
