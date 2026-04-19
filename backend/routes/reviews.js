const express = require('express');
const Review = require('../models/Review');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all reviews for a product
// @route   GET /api/reviews/product/:id
router.get('/product/:id', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id })
      .populate('user', 'name')
      .sort('-createdAt');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Create a review
// @route   POST /api/reviews
router.post('/', protect, async (req, res) => {
  try {
    const { product, rating, comment } = req.body;

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ product, user: req.user._id });
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product' });
    }

    const review = await Review.create({
      product,
      user: req.user._id,
      rating,
      comment
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc    Get all reviews (Admin only)
// @route   GET /api/reviews
router.get('/', protect, admin, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name email')
      .populate('product', 'name')
      .sort('-createdAt');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Only Admin or the owner can delete
    if (req.user.role !== 'admin' && review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    await review.deleteOne();
    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
