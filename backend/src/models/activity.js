import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  action: {
    type: String,
    enum: ['created', 'updated', 'assigned', 'status_changed', 'commented', 'deleted'],
    required: true,
  },

  changes: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },

  description: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

ActivitySchema.index({ taskId: 1, createdAt: -1 });
ActivitySchema.index({ userId: 1 });

export default mongoose.model('Activity', ActivitySchema);