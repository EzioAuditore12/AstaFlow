import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
// Import models
import './models/user.model.js'
import './models/video.model.js'

const app = express()

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length', 'Content-Type']
}));

// Increase payload limit for video uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

import userRouter from './routes/user.routes.js'

//routes declaration
app.use('/api/v1/users',userRouter)
// http://localhost:8000/api/v1/users/register
export default app

