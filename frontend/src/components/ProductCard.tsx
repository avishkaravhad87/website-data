import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock?: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="product-card">

      <div className="product-image-wrapper">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />

        {product.stock !== undefined && product.stock <= 5 && (
          <span className="stock-badge">
            Only {product.stock} left
          </span>
        )}
      </div>

      <div className="product-card-content">

        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-bottom">

          <span className="product-price">
            ₹{product.price.toLocaleString('en-IN')}
          </span>

        </div>

        <div className="product-actions">

          <button
            className="btn-cart"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <button
            className="btn-buy"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;
