const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// API Endpoints
app.use('/api/products', require('./routes/productRoutes'));

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));