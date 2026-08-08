const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();

// Connect to MongoDB
connectDB();

// Core Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Endpoints
app.use('/api/products', require('./routes/productRoutes'));

// Health Checks & Root Route
app.get('/', (req, res) => {
  res.json({ message: 'Handbag Store API is running' });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// 404 Fallback Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
