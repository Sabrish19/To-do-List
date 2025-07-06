const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  status: { type: String, default: 'in progress' },
  assignee: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
  startDate: { type: String },
  endDate: { type: String },
  startTime: { type: String },
  endTime: { type: String },
});

module.exports = mongoose.model('Task', taskSchema);
