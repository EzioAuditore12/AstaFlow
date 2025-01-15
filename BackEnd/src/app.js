import express from 'express'
import cors from 'cors'

const app=express()

// Method to be used in all middlewares
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

//To limit the database access
app.use(express.json({
    limit:'16kb'
}))

//for url encodded like %20% generally seen in website
app.use(express.urlencoded({
    extended:true,
    limit:'16kb'
}))

export default app

