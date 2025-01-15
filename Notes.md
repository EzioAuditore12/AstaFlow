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
