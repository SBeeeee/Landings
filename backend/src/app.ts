import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from "./lib/database";
import userRoutes from './routes/user.routes';
import passport from './config/passport';
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});



app.use('/api/users', userRoutes);

const PORT = process.env['PORT'] || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;
