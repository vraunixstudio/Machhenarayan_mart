const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth'); // Actually, protect is used in other files.

// Let's check middleware exports.
// `protect` is exported from `../middleware/auth`
const { protect } = require('../middleware/auth');

// @route   GET /api/wishlist
// @desc    Get user wishlist
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   POST /api/wishlist/:productId
// @desc    Add product to wishlist
// @access  Private
router.post('/:productId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (user.wishlist.includes(req.params.productId)) {
      return res.status(400).json({ success: false, error: 'Product already in wishlist' });
    }

    user.wishlist.push(req.params.productId);
    await user.save();
    
    // Repopulate to return full objects
    await user.populate('wishlist');

    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   DELETE /api/wishlist/:productId
// @desc    Remove product from wishlist
// @access  Private
router.delete('/:productId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.productId
    );
    await user.save();
    
    // Repopulate
    await user.populate('wishlist');

    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
