import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// Import models
import './models/user.model.js'
import './models/video.model.js'

const app = express()

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Increase payload limit for video uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Static files for uploads
app.use('/uploads', express.static('uploads'));

import userRouter from './routes/user.routes.js'

//routes declaration
app.use('/api/v1/users',userRouter)
// http://localhost:8000/api/v1/users/register
export default app

