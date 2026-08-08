import React, { useEffect, useState } from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export const BagsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products/category/bags')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch(err => console.error('Failed to fetch bags:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Handmade Bags Collection</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
        {products.map(item => (
          <div key={item._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
            <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>${item.price}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BagsPage;
