const express = require('express');
const Task = require('../models/Task');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get all tasks with filtering and sorting
router.get('/', protect, async (req, res) => {
  try {
    const query = { user: req.user._id };
    
    // Search by title or description
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by priority
    if (req.query.priority) {
      query.priority = req.query.priority;
    }

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by due date range
    if (req.query.startDate && req.query.endDate) {
      query.dueDate = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    // Sorting
    const sortBy = {};
    if (req.query.sortField) {
      sortBy[req.query.sortField] = req.query.sortOrder === 'desc' ? -1 : 1;
    } else {
      sortBy.createdAt = -1; // Default sort by creation date
    }

    const tasks = await Task.find(query)
      .sort(sortBy)
      .populate('category', 'name color')
      .exec();

    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get single task
router.get('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('category', 'name color');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create task
router.post('/', protect, async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user._id
    });

    await task.populate('category', 'name color');
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update task
router.patch('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate('category', 'name color');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete task
router.delete('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;