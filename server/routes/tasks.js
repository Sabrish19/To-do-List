const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create new task
router.post('/', async (req, res) => {
  try {
    const {
      text,
      status,
      assignee,
      startDate,
      endDate,
      startTime,
      endTime,
    } = req.body;

    const task = new Task({
      text,
      status: status || 'in progress',
      assignee: assignee || '',
      completed: status === 'completed',
      startDate,
      endDate,
      startTime,
      endTime,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  try {
    const {
      text,
      status,
      assignee,
      completed,
      startDate,
      endDate,
      startTime,
      endTime,
      sharedWith
    } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        text,
        status,
        assignee,
        completed,
        startDate,
        endDate,
        startTime,
        endTime,
      },
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});

// ✅ DELETE task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;