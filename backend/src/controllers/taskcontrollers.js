import Task from '../models/task.js';

export const createTask = async( req , res) => {
    try{
        const{ title , description ,priority , dueDate} = req.body;
        const userId = req.userId;
        
        const task = new Task({
            title,
            discription,
            proiority,
            dueDate,
            CreatedBy:userId,
        });
        await task.save();
        await task.populate('createdBy', 'name email');
        res.status(201).json(task);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
};


export const getTasks = async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 20 } = req.query;
    
    // Build query
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    // Pagination
    const skip = (page - 1) * limit;

    const tasks = await Task.find(query)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(query);

    res.json({
      tasks,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findByIdAndUpdate(id, updates, {
      new: true,
    })
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};