import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<
  ProductCardProps
> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const buyNow = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="product-card">

      <div className="product-image-wrapper">

        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />
        ) : (
          <div className="product-image-placeholder">
            📷
          </div>
        )}

      </div>

      <div className="product-card-content">

        <h3>
          {product.name}
        </h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-price">
          ₹
          {product.price.toLocaleString(
            'en-IN'
          )}
        </div>

        <div className="product-stock">
          {product.stock > 0
            ? `${product.stock} available`
            : 'Out of stock'}
        </div>

        <div className="product-actions">

          <button
            className="add-cart-button"
            disabled={
              product.stock <= 0
            }
            onClick={() =>
              addToCart(product)
            }
          >
            Add to Cart
          </button>

          <button
            className="buy-now-button"
            disabled={
              product.stock <= 0
            }
            onClick={buyNow}
          >
            Buy Now
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;
