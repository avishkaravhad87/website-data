import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, totalAmount } = useCart();

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment order');
      }

      const order = await response.json();

      const options = {
        key: 'rzp_test_YOUR_KEY_ID', // Replace with your actual Razorpay Test Key ID
        amount: order.amount,
        currency: order.currency,
        name: 'Handcrafted Studio',
        description: 'Handbag Order Payment',
        order_id: order.id,
        handler: function (paymentResult: any) {
          alert(`Payment Successful! Payment ID: ${paymentResult.razorpay_payment_id}`);
          clearCart();
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
        },
        theme: {
          color: '#2c3e50',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment checkout failed:', err);
      alert('Could not initiate payment. Ensure the backend order route is active.');
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Your Cart is Empty</h2>
        <p style={{ margin: '1rem 0' }}>Looks like you haven't added any handcrafted items yet.</p>
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
          <div
            key={item._id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              borderBottom: '1px solid #ddd',
              padding: '1rem 0',
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
            />
            <div style={{ flex: 1, marginLeft: '1rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.name}</h3>
              <p style={{ margin: '0 0 0.25rem 0' }}>Quantity: {item.quantity}</p>
              <p style={{ margin: 0, fontWeight: 'bold' }}>Price: ₹{item.price * item.quantity}</p>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              style={{
                padding: '0.4rem 0.8rem',
                background: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
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
            style={{
              padding: '0.6rem 1.2rem',
              background: '#95a5a6',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Clear Cart
          </button>
          <button
            onClick={handlePayment}
            style={{
              padding: '0.6rem 1.2rem',
              background: '#2ecc71',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
