const express = require('express');
const Message = require('../models/Message');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// @desc    Submit a contact message
// @route   POST /api/messages
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc    Get all messages (Admin only)
// @route   GET /api/messages
router.get('/', protect, admin, async (req, res) => {
  try {
    const messages = await Message.find().sort('-createdAt');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
router.put('/:id/read', protect, admin, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    message.isRead = true;
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Delete a message
// @route   DELETE /api/messages/:id
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    await message.deleteOne();
    res.json({ message: 'Message removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
