import express from 'express';

import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';

// Load env vars MUST be done before importing route modules
import dotenv from 'dotenv';
dotenv.config();

// Route imports
import aiRoutes from './routes/aiRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Connect to database
connectDB();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
    origin: '*', // Allow all for dev, restrict in prod
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Body parser
// Increase payload limit for base64 image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/chat', aiRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('AI Medical Assistant API is running');
});

// Setup server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
