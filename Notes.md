# Backend Creation

## Steps to follow in BackEnd creation

1. First Create a BackEnd Folder and change directory to BackEnd

    ``` bash
	cd BackEnd
    ```

2. Run command 
	

    ``` bash
	npm init - y
    ```

3. install following packages
	
    ``` bash
	npm i express cors mongoose
    
    ```

4. install the following dependency packages

    ``` bash
	npm i -D nodemon
    ```

5. Create a .env and place port number there for now to use
    
    ``` bash
	PORT=8000  // you can give any here
    ```


6. Create a src folder and put index.js there
	
	In index.js for testing

    ``` js
	import express from 'express'
	import dotenv from 'dotenv'

	const app=express()

	dotenv.config({
    	path:'./.env'
	})

	console.log(process.env.PORT)
	```
	
7. Change the type to module in package.json if need modular syntax and add a following script

    ```bash
	"type":"module"
	
	scripts:{
	"start":"nodemon nodemon -r dotenv/config --experimental-json-modules src/index.js"
	}
    ```

8. Run the following command in terminal
	
    ``` bash
	npm run start
    ```

## Now setting connection with mongoose databse

1. In .env file add following details
   
   For more details look in mongoose documentation and if not created accound in atlas , create one first

   ``` bash
   MongoDB_URI = //Here enter your url as provided in atlas
   ```

2. Now create a file constants.js and choose a name for your database and export it

    ```js
    export const DB_NAME='DB_Name' //Here you can enter any name of your choice
    ```
3. Now create a folder inside src folder named db and create file index.js

    ```js
    const connectDB= async()=>{  
    import mongoose from 'mongoose'
    import { DB_NAME } from '../constants.js' //From the above step

    const connectDB = async () =>{//Here async and await are used because connecting to database is a crucial step and no concurrent procces should be allowed to execute until our database is connected
    try{
      const connectionInstance= await mongoose.connect
      (`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`\n MONGODB connected ! ! DB HOST: 
        ${connectionInstance.connection.host}`)
        }
        catch(error){
        console.log("MONODB conntection Failed",error)
        process.exit(1)
        }
    }

    export default connectDB
    ```

4. Now in .env add cors origin in order to allow particular ports or domains to access your code

    ```bash
    CORS_ORIGIN=* //by default star allows all domains or ports
    ```

5. Now in src directory create a file app.js 
   
      ```js
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
    ```

6. Now in index.js in src folder add connectDB method and app method
   
    ```js
         import connectDB from './db/index.js'
         import app from './app.js'
          connectDB()
          .then(()=>{
          app.listen(process.env.PORT || 8000, ()=>{
              console.log(`Server is running at port : ${process.env.PORT}`)
          })
          })
          .catch((err)=>{
          console.log('MONG db conntection failed !!!',err)
          })
    ```
7. Now create necessary models required in my case  and add them
   
    1. User Model(user.model.js)

        ```js
                import mongoose, { Schema } from "mongoose";

                  const userSchema=new Schema({
                  username: {
                  type: String,
                  required: true,
                  unique: true,
                  lowercase: true,
                  trim: true,
                  index: true
                  },
                  email: {
                  type: String,
                  required: true,
                  unique: true,
                  lowecase: true,
                  trim: true,
                  },
                  fullName: {
                  type: String,
                  required: true,
                  trim: true,
                  index: true
                  },
                  avatar: {
                  type: String, // cloudinary url
                  required: true,
                  },
                  coverImage: {
                  type: String, // cloudinary url
                  },
                  watchHistory: [
                  {
                  type: Schema.Types.ObjectId,
                  ref: "Video"
                  }
                  ],
                  password: {
                  type: String,
                  required: [true, 'Password is required']
                  },
                  refreshToken: {
                  type: String
                  }
                  },{timestamps:true})

                  export const User=new mongoose.model('User',userSchema)
        ```
             
             
    2. Video(video.model.js)

        ```js
                import mongoose,{Schema} from "mongoose";

                const videoSchema=new Schema({
                    videoFile:{
                        type:String, // from a cloudanary url because of 
                        required:true
                    },
                    thumbnail:{
                        type:String,
                        required:true
                    },
                    title:{
                        type:String, 
                        required:true
                    },
                    description:{
                        type:Number,
                        required:true
                    },
                    views:{
                        type:Number,
                        default:0
                    },
                    isPublished:{
                        type:Boolean,
                        default: true
                    },
                    owner:{
                        type:Schema.Types.ObjectId,
                        ref:'User'
                    }
                },{timestamps:true})

                export const Video=new mongoose.model('Video',videoSchema)
        ```
   
## Now creating utilities

1. Create a file name ApiResponse.js to store Responses from Api

   ```js
   class ApiResponse{
    constructor(statusCode,data,message='success'){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.sucesss = statusCode<400;
    }
    }

    export {ApiResponse}
   ```

2. Now create another file ApiError.js
   
   ```js
   class ApiError extends Error {
    constructor(statusCode, 
        message = 'Something went wrong', 
        error = [], 
        stack = ''
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
            }
        }
    }

    export {ApiError}

3. Create a file asyncHandler.js , it is used for detecting errors in asynchrnous functions and helps in passing them to next middleware

    ```js
    const asyncHandler=(fn)=>async(req,res,next)=>{
        try{
            await fn(req,res,next)
        }
        catch(error){
            res.status(error.code || 500).json({
                success: false,
                message: error.message,
            });
        }
    }

    export {asyncHandler}
    ```

## Now storing images in cloud 

### Here we are using cloudinary to store images in cloud 
https://cloudinary.com/homepage , you can visit this for creating account in it

After creating follow these steps,

1. Take cloud name,api key and secret api key from your cloudinary account and put them in .env like this
   
   ```bash
   CLOUDINARY_CLOUD_NAME= your_cloud_name
   CLOUDINARY_API_KEY= your_api_key
   CLOUDINARY_API_SECRET= your_api_secret_key
   ```

2. Now in src/utils directory add cloudinary.js and install clodinary packages of node


    ```bash
    touch cloudinary.js
    ```

    ```bash
    npm i cloudinary
    ```
3. Paste the content in cloudinary.js

    ```js
    import {v2 as cloudinary} from 'cloudinary' // For cloudinary dependencies
    
    import fs from 'fs' //Fs

    //These are config files which are taken from .env
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    ```
4. Paste this upload function in it and export it

    ```js
    const uploadOnCloudinary= async(localFilePath)=>{
        try{
            if(!localFilePath){
                return null;
            }
            //upload file on cloudinary
            const response=await cloudinary.uploader.upload(localFilePath,{
                resource_type:'auto'
            })
            //file has been successfully uploaded
            fs.unlinkSync(localFilePath)
            console.log('File is uploaded on cloudinary',response.url)
            return response
        }catch(error){
            fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation.failed
            return null
        }
        }

    export {uploadOnCloudinary}
    ```
### Creating middleware for uploading images or videos

1. Install multer 

    ```bash
    npm i multer
    ```

2. Now create a folder middlewares and create a file multer.middleware.js

    ```bash
    touch multer.middleware.js
    ```

    Now paster the following code in it

    Here,
    The destination function determines where uploaded files will be saved. In this case, it uses the callback cb to specify the ./public/temp directory as the storage location. The null as the first parameter indicates no errors occurred.
    ```js
    import multer from "multer"; 

    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop();
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
    }
    })

    export const upload = multer({ 
    storage
    })
    ```
### Creating controllers for registeration of user

1. Create a folder controllers and create a file user.controller.js

    ```bash
    touch user.controller.js
    ```
2. Import all utilities function from utils

    ```js
    import { asyncHandler } from "../utils/asyncHandler.js";
    import {ApiError} from "../utils/ApiError.js"
    import {uploadOnCloudinary} from "../utils/cloudinary.js"
    import { ApiResponse } from "../utils/ApiResponse.js";
    ```
3. Import the userSchema from models and mongoose dependency for various functionalities
   
   ```js
    import { User} from "../models/user.model.js"
    import mongoose from 'mongoose'
   ```

4. Now creating Registeration function

    1. Define the function registerUser and use asyncHandler to handle async requests
             
        ```js         
         const registerUser = asyncHandler(async (req, res) => {
           //1.Get the user details from frontEnd

           const { fullName, email, username, password } = req.body;

           //2. Check if all the fields are entered

           if (
             [fullName, email, username, password].some((field) => field?.trim() === "")
           ) {
             throw new ApiError(400, "All fields are required");
           }

           //3. Check if the user alreaady exists throug either email or username

           const existedUser = await User.findOne({
             $or: [{ username }, { email }],
           });

           if (existedUser) {
             throw new ApiError(409, "User with email or username already exists");
           }

           //4. Check if user has entered profile photo which is mandotry and optinally coverImage

           const avatarLocalPath = req.files?.avatar[0]?.path;
           //const coverImageLocalPath = req.files?.coverImage[0]?.path;

           let coverImageLocalPath;
           if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
             coverImageLocalPath = req.files.coverImage[0].path;
           }

           if (!avatarLocalPath) {
             throw new ApiError(400, "Avatar file is required");
           }

           //5. upload both in cloudinary
           const avatar = await uploadOnCloudinary(avatarLocalPath);
           const coverImage = await uploadOnCloudinary(coverImageLocalPath);

           if (!avatar || !avatar.url) {
             throw new ApiError(400, "Avatar file is required");
           }

           //6. Now create user object and make the entry in db

           const user = await User.create({
             fullName,
             avatar: avatar.url,
             coverImage: coverImage?.url || "",
             email,
             password,
             username: username.toLowerCase(),
           });

           //6. Remove password and refresh token key from response
           const createdUser = await User.findById(user._id).select(
             "-password -refreshToken"
           );

           //7. Check if the user is created

           if (!createdUser) {
             throw new ApiError(500, "Something went wrong while registering the user");
           }

           //8. Return the response
           return res.status(201).json(
             new ApiResponse(200, createdUser, "User registered Successfully")
           );
         });

         export { registerUser };
         ```

    ### Now Hashing of password in an encrypted manner using bcrypt

      1. First Install bcrypt in node packages

            ```bash
            npm i bcrypt
            ```
      2. Go to models/user.model.js import bcrypt

            ```js
            import bcrypt from 'bcrypt'
            ```
      3. Now creating function of making password saved in hashed format
      
      ```js
        userSchema.pre("save", async function (next) {
        if(!this.isModified("password")) return next();

        this.password = await bcrypt.hash(this.password, 10) //Here 10 is just a number for hash rounds you can use any num you want
        next()
        })
      ```
      4. Now comparing hashed password with entered password

    ### Creating registeration route

      1. Create a folder routes and create a file user.routes.js

    ```bash
    touch user.routes.js
    ```
      2. Now in user.routes.js import Router from express for creating routes
    
    ```js
    import { Router } from "express";
    ```

    Now use it,
    ```js
    const router=Router()
    ```
      3. Now import the following components created from above steps
    ```js
    import { registerUser } from "../controllers/user.controller.js";
    import { upload } from "../middlewares/multer.middleware.js";
    ```
      4. Now create a register route
    ```js
    router.route('/register').post(
    upload.fields([
        { 
            name:'avatar',
            maxCount:1
        },
        {
            name:'coverImage',
            maxCount:1
        }
    ]),
    registerUser
    )
    ```
      5. Export the router
     
    ```js
    export default router
    ```
      6. Now go to app.js and import router component created there
    
    ```js
    import userRouter from './routes/user.routes.js'
    ```

      7. Now declare a route there and use it in app
   
    ```js
    import userRouter from './routes/user.routes.js'
    ```

    ### Login of User

    1. Open user.model.js and add functions to compare hashed password
    
    ```js
    userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
    }
    ```
    2. Now go to jwt webiste and create access token and refresh token and set expiry dates
    
    ```.env
    ACCESS_TOKEN_SECRET='Enter Here'
    ACCESS_TOKEN_EXPIRY='Enter day'
    REFRESH_TOKEN_SECRET='Enter here'
    REFRESH_TOKEN_EXPIRY='Enter day'
    ```
    3. Import jwt from json web token
   
    ```js
    import jwt from 'jsonwebtoken'
    ```

    4. Generate access token function
   
    ```js
    userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    }
    ```

    5. Generate refresh token
   
    ```js
    userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    }

    ```
    6. Now go to controllers/user.controller.js
    
    ```js

    ```

// Need to enter logout here




## Video Streaming setup

1. Install npm uuid

    ```js
    npm i uuid
    ```

    
   
        



