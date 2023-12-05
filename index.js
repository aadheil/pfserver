// to load .env file
require('dotenv').config()

// import express server
const express=require('express')

// import CORS
const cors=require('cors')

// import router js
const router=require('./Routes/routes')

// import db
require('./DB/connection')

// const middlewares =require('./Middlewares/appMiddleware')

// to create express server
const pfServer=express()

// use cors
pfServer.use(cors())

// parse json data using  server app
pfServer.use(express.json())
// pfServer.use(middlewares.appMiddleware)

// use router
pfServer.use(router)

// customise port for server app
const PORT=4000 || process.env.PORT

// export uploads folder
pfServer.use('/uploads',express.static('./uploads'))

// to run the server app
pfServer.listen(PORT,()=>{
    console.log(`project fair server started at port: ${PORT}`);
})

// resolve request to localhost:4000
pfServer.get('/',(req,res)=>{
    res.send(`<h1>Project Fair Server Started!!!</h1>`)
})



