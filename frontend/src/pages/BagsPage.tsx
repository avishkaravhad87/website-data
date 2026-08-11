import React, {
  useEffect,
  useState
} from 'react';

import ProductCard, {
  Product
} from '../components/ProductCard';

export const BagsPage: React.FC = () => {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetch('/api/products/category/bags')
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          Array.isArray(data)
            ? data
            : []
        );
      })
      .catch((err) => {
        console.error(
          'Failed to fetch bags:',
          err
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container">

      <div className="collection-header">
        <p className="page-eyebrow">
          HANDCRAFTED COLLECTION
        </p>

        <h1>
          Handmade Bags
        </h1>

        <p>
          Discover our collection of
          handcrafted bags made with
          care and attention to detail.
        </p>
      </div>

      {loading ? (
        <div className="loading">
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="empty-products">
          No handbags available.
        </div>
      ) : (
        <div className="product-grid">
          {products.map(
            (product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            )
          )}
        </div>
      )}

    </div>
  );
};

export default BagsPage;
