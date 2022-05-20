/**
 * Server
 * @name server
 * @requires express
 * @requires mongoose
 * @requires cors
 * @requires express-fileupload
 * @requires cookie-parser
 * @requires path
 */
 require('dotenv').config()
 const express = require('express')
 const mongoose = require('mongoose')
 const cors = require('cors')
 const fileUpload = require('express-fileupload')
 const cookieParser = require('cookie-parser')
 const path = require('path')
 
 //swagger
 const swaggerUI = require("swagger-ui-express");
 const swaggerJsDoc = require("swagger-jsdoc");
 const options = {
     definition: {
         openapi: "3.0.0",
         info: {
             title: "Dog API",
             version: "1.0.0",
             description: "A simple Express Dog API",
             contact:{
                email: "217014391@stu.vtc.edu.hk",
                name: "Chan Cheuk Wai"}
         },
         servers: [
             {
                 url: "http://localhost:4000",
             },
         ],
     },
     apis: ["./routes/*.js","./controllers/*.js","./models/*.js" ],
 };
 const specs = swaggerJsDoc(options);
 //swagger
 
 const app = express()
 app.use(express.json())
 app.use(cookieParser())
 app.use(cors())
 app.use(fileUpload({
     useTempFiles: true
 }))
 
 
 //Swagger
 app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
 
 /**
  * Router
  * @requires routes/userRouter
  * @requires routes/categoryRouter
  * @requires routes/upload
  * @requires routes/dogRouter
  */
 app.use('/user', require('./routes/userRouter'))
 app.use('/api', require('./routes/categoryRouter'))
 app.use('/api', require('./routes/upload'))
 app.use('/api', require('./routes/dogRouter'))
 
 /**
  * Mongodb connection
  */
 const URI = process.env.MONGODB_URL
 mongoose.connect(URI, {
     useCreateIndex: true,
     useFindAndModify: false,
     useNewUrlParser: true,
     useUnifiedTopology: true
 }, err =>{
     if(err) throw err;
     console.log('Connected to MongoDB')
 })
 
 if(process.env.NODE_ENV === 'production'){
     app.use(express.static('client/build'))
     app.get('*', (req, res) => {
         res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
     })
 }
 
 /**
  * Server is running on Port 4000
  */
 const PORT = process.env.PORT || 4000
 app.listen(PORT, () =>{
     console.log('Server is running on port', PORT)
 })