const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { validateMessage } = require('../middleware/validation');

// POST /api/messages — submit a contact form message
router.post('/', validateMessage, async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json({ success: true, data: { id: message._id, createdAt: message.createdAt } });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;