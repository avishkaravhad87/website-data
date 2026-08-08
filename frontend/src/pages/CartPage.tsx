import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, totalAmount } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any handcrafted items yet.</p>
        <Link to="/bags" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>
          Browse Bags Collection
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Shopping Cart</h1>
      <div style={{ marginTop: '1.5rem' }}>
        {cart.map((item) => (
          <div key={item._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '1rem 0' }}>
            <img src={item.imageUrl} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
            <div style={{ flex: 1, marginLeft: '1rem' }}>
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price * item.quantity}</p>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              style={{ padding: '0.4rem 0.8rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'right' }}>
        <h2>Total Amount: ₹{totalAmount}</h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button
            onClick={clearCart}
            style={{ padding: '0.6rem 1.2rem', background: '#95a5a6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Clear Cart
          </button>
          <button
            onClick={() => alert('Payment gateway integration in progress...')}
            style={{ padding: '0.6rem 1.2rem', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
