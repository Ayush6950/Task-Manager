import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,     //“Automatically remove unnecessary spaces before saving the string"
    },
    description:{
        type:String,
        default:'',

    },
    status:{
        type:String;
        enum: ['todo', 'in-progress','done'],
        default:'todo',
    },
    priority: {
        type:String,
        enum: ['low', 'medium', 'high'],
        default:'medium',
    },
    assignedTo:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'user',
     default:null,
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
    index: true, // Index for performance
    },
    updatedAt: {
    type: Date,
    default: Date.now,
  },

});


// Index for common queries
TaskSchema.index({ status: 1, createdAt: -1 });
TaskSchema.index({ assignedTo: 1 });
TaskSchema.index({ createdBy: 1 });



export default mongoose.model('Task', TaskSchema);