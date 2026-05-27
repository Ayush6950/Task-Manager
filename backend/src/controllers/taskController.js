import Task from '../models/task.js';
import Activity from '../models/activity.js';
import { 
  NotFoundError, 
  AuthorizationError, 
  ValidationError 
} from '../utils/errors.js';
import { buildQuery, getPaginationParams } from '../utils/helpers.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('TaskController');

const logActivity = async (taskId, userId, action, description, changes = null) => {
  try {
    await Activity.create({
      taskId,
      userId,
      action,
      description,
      changes,
    });
  } catch (error) {
    logger.error('Failed to log activity', { error: error.message });
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate, tags, assignedTo } = req.body;
    const userId = req.userId;

    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      tags,
      assignedTo,
      createdBy: userId,
    });

    await task.save();
    await task.populate('createdBy', 'name email');
    await task.populate('assignedTo', 'name email');

    await logActivity(
      task._id,
      userId,
      'created',
      `Task "${title}" created`,
    );

    logger.info('Task created', { taskId: task._id, userId });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    logger.error('Failed to create task', { error: error.message });
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const { status, priority, page = 1, limit = 20, assignedTo, search } = req.query;

    // Build query
    const query = buildQuery({ status, priority, assignedTo, search });

    // Pagination
    const { pageNum, limitNum, skip } = getPaginationParams(page, limit);

    const tasks = await Task.find(query)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Task.countDocuments(query);

    res.json({
      success: true,
      tasks,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    logger.error('Failed to get tasks', { error: error.message });
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate({
        path: 'comments',
        populate: {
          path: 'createdBy',
          select: 'name email',
        },
      });

    if (!task) {
      throw new NotFoundError('Task');
    }

    // Get activity log
    const activities = await Activity.find({ taskId: id })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      task,
      activities,
    });
  } catch (error) {
    logger.error('Failed to get task', { error: error.message });
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const updates = req.body;

    const task = await Task.findById(id);
    if (!task) {
      throw new NotFoundError('Task');
    }

    // Check authorization - only creator or assignee can update
    if (task.createdBy.toString() !== userId && task.assignedTo?.toString() !== userId) {
      throw new AuthorizationError('You can only update your own tasks');
    }

    // Track changes
    const changes = {};
    const allowedFields = ['title', 'description', 'status', 'priority', 'assignedTo', 'dueDate', 'tags'];

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        changes[field] = {
          old: task[field],
          new: updates[field],
        };
        task[field] = updates[field];
      }
    }

    task.updatedAt = new Date();
    await task.save();
    await task.populate('createdBy', 'name email');
    await task.populate('assignedTo', 'name email');

    // Log activity
    await logActivity(
      id,
      userId,
      'updated',
      'Task updated',
      changes,
    );

    logger.info('Task updated', { taskId: id, userId });

    res.json({
      success: true,
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    logger.error('Failed to update task', { error: error.message });
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const task = await Task.findById(id);
    if (!task) {
      throw new NotFoundError('Task');
    }

    // Check authorization - only creator can delete
    if (task.createdBy.toString() !== userId) {
      throw new AuthorizationError('You can only delete your own tasks');
    }

    const title = task.title;
    await Task.findByIdAndDelete(id);

    // Log activity
    await logActivity(
      id,
      userId,
      'deleted',
      `Task "${title}" deleted`,
    );

    logger.info('Task deleted', { taskId: id, userId });

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    logger.error('Failed to delete task', { error: error.message });
    next(error);
  }
};

export const assignTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { assignedTo } = req.body;
    const userId = req.userId;

    const task = await Task.findById(id);
    if (!task) {
      throw new NotFoundError('Task');
    }

    // Check authorization - only creator can assign
    if (task.createdBy.toString() !== userId) {
      throw new AuthorizationError('Only creator can assign tasks');
    }

    const oldAssignee = task.assignedTo;
    task.assignedTo = assignedTo;
    await task.save();
    await task.populate('createdBy', 'name email');
    await task.populate('assignedTo', 'name email');

    // Log activity
    await logActivity(
      id,
      userId,
      'assigned',
      `Task assigned to ${task.assignedTo?.name || 'unassigned'}`,
      { oldAssignee, newAssignee: assignedTo },
    );

    logger.info('Task assigned', { taskId: id, userId, assignedTo });

    res.json({
      success: true,
      message: 'Task assigned successfully',
      task,
    });
  } catch (error) {
    logger.error('Failed to assign task', { error: error.message });
    next(error);
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { status, priority } = req.query;

    const query = {
      $or: [
        { createdBy: userId },
        { assignedTo: userId },
      ],
    };

    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    logger.error('Failed to get user tasks', { error: error.message });
    next(error);
  }
};
