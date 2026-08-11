const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const Product = require('../models/Product');


// =====================================================
// UPLOAD DIRECTORY
// =====================================================

const uploadDir = path.join(
  __dirname,
  '../uploads'
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}


// =====================================================
// MULTER CONFIGURATION
// =====================================================

const storage =
  multer.diskStorage({

    destination: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        uploadDir
      );
    },

    filename: (
      req,
      file,
      cb
    ) => {

      const extension =
        path.extname(
          file.originalname
        );

      const filename =
        Date.now() +
        '-' +
        Math.round(
          Math.random() * 1e9
        ) +
        extension;

      cb(
        null,
        filename
      );
    },

  });


const upload = multer({

  storage,

  limits: {
    fileSize:
      2 * 1024 * 1024,
  },

  fileFilter: (
    req,
    file,
    cb
  ) => {

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (
      allowedTypes.includes(
        file.mimetype
      )
    ) {

      cb(
        null,
        true
      );

    } else {

      cb(
        new Error(
          'Only JPG, PNG and WEBP images are allowed'
        )
      );

    }

  },

});


// =====================================================
// GET ALL PRODUCTS
// =====================================================

router.get(
  '/',
  async (req, res) => {

    try {

      const products =
        await Product
          .find()
          .sort({
            createdAt: -1,
          });

      res.json(
        products
      );

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });

    }

  }
);


// =====================================================
// GET PRODUCTS BY CATEGORY
// =====================================================

router.get(
  '/category/:category',
  async (req, res) => {

    try {

      const products =
        await Product
          .find({
            category:
              req.params.category,
          })
          .sort({
            createdAt: -1,
          });

      res.json(
        products
      );

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });

    }

  }
);


// =====================================================
// UPLOAD IMAGE
// =====================================================

router.post(
  '/upload',
  upload.single('image'),
  async (req, res) => {

    try {

      if (!req.file) {

        return res
          .status(400)
          .json({
            message:
              'No image uploaded',
          });

      }

      const imageUrl =
        `/api/uploads/${req.file.filename}`;

      res.status(201).json({
        message:
          'Image uploaded successfully',

        imageUrl,
      });

    } catch (err) {

      res.status(400).json({
        message:
          err.message,
      });

    }

  }
);


// =====================================================
// CREATE PRODUCT
// =====================================================

router.post(
  '/',
  async (req, res) => {

    try {

      const product =
        new Product(
          req.body
        );

      const newProduct =
        await product.save();

      res
        .status(201)
        .json(
          newProduct
        );

    } catch (err) {

      res.status(400).json({
        message:
          err.message,
      });

    }

  }
);


// =====================================================
// UPDATE PRODUCT
// =====================================================

router.put(
  '/:id',
  async (req, res) => {

    try {

      const product =
        await Product
          .findByIdAndUpdate(
            req.params.id,
            req.body,
            {
              new: true,
              runValidators: true,
            }
          );

      if (!product) {

        return res
          .status(404)
          .json({
            message:
              'Product not found',
          });

      }

      res.json(
        product
      );

    } catch (err) {

      res.status(400).json({
        message:
          err.message,
      });

    }

  }
);


// =====================================================
// DELETE PRODUCT
// =====================================================

router.delete(
  '/:id',
  async (req, res) => {

    try {

      const product =
        await Product
          .findByIdAndDelete(
            req.params.id
          );

      if (!product) {

        return res
          .status(404)
          .json({
            message:
              'Product not found',
          });

      }

      res.json({

        message:
          'Product deleted successfully',

        product,

      });

    } catch (err) {

      res.status(400).json({
        message:
          err.message,
      });

    }

  }
);


module.exports = router;
