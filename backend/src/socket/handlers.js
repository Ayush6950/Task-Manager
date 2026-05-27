import jwt from 'jsonwebtoken';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('SocketHandlers');

// Store active users
const activeUsers = new Map(); // userId -> { socketId, name, email, connectTime }

export const registerSocketHandlers = (io) => {
  // Middleware to authenticate socket connections
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication required'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.userId;
      socket.userName = socket.handshake.auth.userName || 'Anonymous';
      next();
    } catch (error) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const { userId, userName } = socket;
    logger.info('User connected', { userId, socketId: socket.id });

    // Track active user
    activeUsers.set(userId, {
      socketId: socket.id,
      name: userName,
      connectTime: new Date(),
    });

    // Broadcast user joined
    io.emit('user:joined', {
      userId,
      name: userName,
      totalActiveUsers: activeUsers.size,
    });

    // Send active users list to newly connected user
    socket.emit('users:active', Array.from(activeUsers.entries()).map(([id, data]) => ({
      userId: id,
      name: data.name,
    })));

    // Join task room for real-time updates
    socket.on('task:join', (taskId) => {
      socket.join(`task:${taskId}`);
      logger.debug('User joined task room', { userId, taskId });
    });

    // Leave task room
    socket.on('task:leave', (taskId) => {
      socket.leave(`task:${taskId}`);
      logger.debug('User left task room', { userId, taskId });
    });

    // Real-time task update
    socket.on('task:update', (data) => {
      const { taskId, updates } = data;
      io.to(`task:${taskId}`).emit('task:updated', {
        taskId,
        updates,
        updatedBy: userId,
        updatedByName: userName,
        timestamp: new Date(),
      });
      logger.debug('Task update broadcasted', { taskId, userId });
    });

    // Task status changed
    socket.on('task:status-changed', (data) => {
      const { taskId, status } = data;
      io.to(`task:${taskId}`).emit('task:status-changed', {
        taskId,
        status,
        changedBy: userId,
        changedByName: userName,
        timestamp: new Date(),
      });
      logger.debug('Task status change broadcasted', { taskId, status });
    });

    // Task assigned
    socket.on('task:assigned', (data) => {
      const { taskId, assignedTo, assignedToName } = data;
      io.to(`task:${taskId}`).emit('task:assigned', {
        taskId,
        assignedTo,
        assignedToName,
        assignedBy: userId,
        assignedByName: userName,
        timestamp: new Date(),
      });
      logger.debug('Task assignment broadcasted', { taskId, assignedTo });
    });

    // New comment on task
    socket.on('task:comment-added', (data) => {
      const { taskId, comment, commentId } = data;
      io.to(`task:${taskId}`).emit('task:comment-added', {
        taskId,
        comment,
        commentId,
        author: userId,
        authorName: userName,
        timestamp: new Date(),
      });
      logger.debug('Comment broadcasted', { taskId, commentId });
    });

    // User typing in task
    socket.on('task:typing-start', (taskId) => {
      socket.to(`task:${taskId}`).emit('task:user-typing', {
        userId,
        userName,
        taskId,
      });
    });

    // User stopped typing
    socket.on('task:typing-stop', (taskId) => {
      socket.to(`task:${taskId}`).emit('task:user-typing-stop', {
        userId,
        taskId,
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      activeUsers.delete(userId);
      io.emit('user:left', {
        userId,
        name: userName,
        totalActiveUsers: activeUsers.size,
      });
      logger.info('User disconnected', { userId, socketId: socket.id });
    });

    // Error handling
    socket.on('error', (error) => {
      logger.error('Socket error', { userId, error: error.message });
    });
  });
};
