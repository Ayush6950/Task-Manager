import express from 'express';
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} from '../controllers/taskcontrollers.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate); // All routes require auth

router.post('/', createTask);
router.get('/', getTasks);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;