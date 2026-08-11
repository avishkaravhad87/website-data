import React, {
  useEffect,
  useState
} from 'react';

import ProductCard, {
  Product
} from '../components/ProductCard';

export const ClothStoragePage: React.FC =
  () => {
    const [products, setProducts] =
      useState<Product[]>([]);

    const [loading, setLoading] =
      useState(true);

    useEffect(() => {
      fetch(
        '/api/products/category/cloth-storage'
      )
        .then((res) => res.json())
        .then((data) => {
          setProducts(
            Array.isArray(data)
              ? data
              : []
          );
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

    return (
      <div className="page-container">

        <div className="collection-header">

          <p className="page-eyebrow">
            ORGANIZATION COLLECTION
          </p>

          <h1>
            Cloth Storage
          </h1>

          <p>
            Practical and beautiful
            handmade storage solutions
            for your home.
          </p>

        </div>

        {loading ? (
          <div className="loading">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="empty-products">
            No cloth storage products
            available yet.
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

export default ClothStoragePage;
