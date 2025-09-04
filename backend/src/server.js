import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/database.js';
import authRoutes from './routes/auth.js';  // Add this import

dotenv.config();

const app = express();

// Middleware
app.use(helmet());  // Add security headers
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);  // Add auth routes

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: '🚀 Backend is working!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});