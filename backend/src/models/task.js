import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    default: '',
  },

  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo',
  },

  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  dueDate: {
    type: Date,
    default: null,
  },

  tags: [String],

  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
// Indexes
TaskSchema.index({ status: 1, createdAt: -1 });
TaskSchema.index({ assignedTo: 1 });
TaskSchema.index({ createdBy: 1 });

export default mongoose.model('Task', TaskSchema);
