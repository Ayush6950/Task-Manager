import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running ✓' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    message: err.message || 'Internal Server Error' 
  });
});

export default app;