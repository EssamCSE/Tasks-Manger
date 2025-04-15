const express = require('express');
const Category = require('../models/Category');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get all categories
router.get('/', protect, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id })
      .sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get single category
router.get('/:id', protect, async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create category
router.post('/', protect, async (req, res) => {
  try {
    const category = await Category.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update category
router.patch('/:id', protect, async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete category
router.delete('/:id', protect, async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;