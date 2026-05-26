import express from 'express';
import app from './app.js';
import connectDB from './config/database.js';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { registerSocketHandlers } from './socket/handlers.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();

//HTTP server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
});

registerSocketHandlers(io);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
