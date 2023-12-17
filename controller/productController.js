const express = require('express');
const productRouter = express.Router();
const Product = require('../model/productModel');
const upload = require('../utils/multer');

// Post a new product with image upload
productRouter.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { name, price, volume, stars, description } = req.body;
    // Use the secure_url provided by Cloudinary instead of req.file.path
    const imageUrl = req.file.path;
    console.log(imageUrl)

    const newProduct = new Product({
      name,
      price,
      volume,
      stars,
      description,
      imageUrl,
    });

    const savedProduct = await newProduct.save();
    res.status(200).json({ message: 'Product uploaded', savedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products
productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = productRouter;
