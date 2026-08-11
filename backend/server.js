const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./db');

const app = express();


// =====================================================
// DATABASE
// =====================================================

connectDB();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors()
);

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true,
  })
);


// =====================================================
// STATIC UPLOADED IMAGES
// =====================================================

app.use(
  '/api/uploads',
  express.static(
    path.join(
      __dirname,
      'uploads'
    )
  )
);


// =====================================================
// API ROUTES
// =====================================================

app.use(
  '/api/products',
  require(
    './routes/productRoutes'
  )
);

app.use(
  '/api/payment',
  require(
    './routes/payment'
  )
);


// =====================================================
// ROOT
// =====================================================

app.get(
  '/',
  (req, res) => {

    res.json({
      message:
        'Handbag Store API is running',
    });

  }
);


// =====================================================
// HEALTH CHECK
// =====================================================

app.get(
  '/health',
  (req, res) => {

    res
      .status(200)
      .send('OK');

  }
);


// =====================================================
// 404
// =====================================================

app.use(
  (req, res) => {

    res
      .status(404)
      .json({
        error:
          'Route not found',
      });

  }
);


// =====================================================
// ERROR HANDLER
// =====================================================

app.use(
  (
    err,
    req,
    res,
    next
  ) => {

    console.error(
      err.stack
    );

    res
      .status(500)
      .json({

        error:
          'Internal Server Error',

        message:
          err.message,

      });

  }
);


// =====================================================
// SERVER
// =====================================================

const PORT =
  process.env.PORT ||
  5000;

app.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }
);
