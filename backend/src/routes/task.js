import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  assignTask,
  getMyTasks,
} from '../controllers/taskController.js';
import { authenticate } from '../middlewares/auth.js';
import { createTaskLimiter, apiLimiter } from '../middlewares/rateLimiter.js';
import {
  validateTaskCreate,
  validateTaskUpdate,
  validateTaskDelete,
  validateTaskGet,
  handleValidationErrors,
} from '../middlewares/validation.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);
router.use(apiLimiter);

// Get current user's tasks
router.get('/my-tasks', getMyTasks);

// Get all tasks with pagination and filters
router.get(
  '/',
  validateTaskGet,
  handleValidationErrors,
  getTasks
);

// Get specific task
router.get('/:id', getTaskById);

// Create task
router.post(
  '/',
  createTaskLimiter,
  validateTaskCreate,
  handleValidationErrors,
  createTask
);

// Update task
router.patch(
  '/:id',
  validateTaskUpdate,
  handleValidationErrors,
  updateTask
);

// Delete task
router.delete(
  '/:id',
  validateTaskDelete,
  handleValidationErrors,
  deleteTask
);

// Assign task to user
router.patch(
  '/:id/assign',
  validateTaskDelete,
  handleValidationErrors,
  assignTask
);

export default router;