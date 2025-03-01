const express = require('express');
const router = express.Router();
const Store = require('../models/Store');
const Product = require('../models/Product');

// Home feed – shows business cards and hot products
router.get('/', async (req, res) => {
  try {
    // Get stores sorted from newest to oldest
    const stores = await Store.find().populate('owner').sort({ createdAt: -1 }).exec();
    // Get hot products (sorted by views and recency)
    const hotProducts = await Product.find().sort({ views: -1, createdAt: -1 }).limit(5).exec();
    res.render('index', { user: req.user, stores, hotProducts });
  } catch (err) {
    console.error(err);
    res.send('Error occurred');
  }
});

module.exports = router;
