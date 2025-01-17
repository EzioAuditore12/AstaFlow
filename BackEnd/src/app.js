import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app=express()

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//To limit the database access
app.use(express.json({
    limit:'16kb'
}))

//for url encodded like %20% generally seen in website
app.use(express.urlencoded({
    extended:true,
    limit:'16kb'
}))

//use cookie parser here
app.use(cookieParser())

import userRouter from './routes/user.routes.js'

//routes declaration
app.use('/api/v1/users',userRouter)
// http://localhost:8000/api/v1/users/register
export default app

