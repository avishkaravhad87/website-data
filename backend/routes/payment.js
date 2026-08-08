const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

// Initialize Razorpay with key credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET',
});

// Route to create a Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    
    const options = {
      amount: amount * 100, // Amount in paise (₹1 = 100 paise)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    res.status(500).json({ message: 'Error creating payment order', error });
  }
});

module.exports = router;
