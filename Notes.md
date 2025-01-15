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

   

