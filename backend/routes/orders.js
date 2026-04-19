const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/auth');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, error: 'No order items' });
    }

    const order = new Order({
      user: req.user.id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount
    });

    const createdOrder = await order.save();
    res.status(201).json({ success: true, order: createdOrder });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   GET /api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'id name email').sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
