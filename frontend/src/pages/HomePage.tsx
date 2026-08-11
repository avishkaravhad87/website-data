import React, {
  useEffect,
  useState
} from 'react';

import ProductCard, {
  Product
} from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetch('/api/products')
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
    <div>

      {/* HERO */}

      <section className="home-hero">

        <div className="hero-content">

          <p className="hero-eyebrow">
            HANDMADE • UNIQUE • BEAUTIFUL
          </p>

          <h1>
            Crafted With
            <br />
            <span>Care & Passion</span>
          </h1>

          <p>
            Discover beautiful handcrafted
            products made for everyday life.
          </p>

          <div className="hero-actions">

            <a
              href="/bags"
              className="hero-button"
            >
              Explore Collection
            </a>

            <a
              href="/contact"
              className="hero-button secondary"
            >
              Contact Us
            </a>

          </div>

        </div>

      </section>

      {/* CATEGORY CARDS */}

      <section className="home-section">

        <div className="section-title">

          <p className="page-eyebrow">
            SHOP BY CATEGORY
          </p>

          <h2>
            Find Something Special
          </h2>

        </div>

        <div className="category-grid">

          <a
            href="/bags"
            className="category-card bags-category"
          >
            <span>
              👜
            </span>

            <h3>
              Handbags
            </h3>

            <p>
              Handmade bags for
              everyday style.
            </p>
          </a>

          <a
            href="/cloth-storage"
            className="category-card storage-category"
          >
            <span>
              🧺
            </span>

            <h3>
              Cloth Storage
            </h3>

            <p>
              Beautiful storage
              solutions for your home.
            </p>
          </a>

          <a
            href="/equipment"
            className="category-card equipment-category"
          >
            <span>
              🛠️
            </span>

            <h3>
              Other Equipment
            </h3>

            <p>
              Useful products
              for everyday needs.
            </p>
          </a>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="home-section">

        <div className="section-title">

          <p className="page-eyebrow">
            OUR PRODUCTS
          </p>

          <h2>
            Featured Products
          </h2>

          <p>
            Products added from the
            Admin dashboard appear here
            automatically.
          </p>

        </div>

        {loading ? (
          <div className="loading">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="empty-products">
            No products available yet.
          </div>
        ) : (
          <div className="product-grid">

            {products.slice(0, 8).map(
              (product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              )
            )}

          </div>
        )}

      </section>

      {/* CTA */}

      <section className="home-cta">

        <h2>
          Have a Question?
        </h2>

        <p>
          We would love to hear from you.
        </p>

        <a href="/contact">
          Contact Us
        </a>

      </section>

    </div>
  );
};

export default HomePage;
