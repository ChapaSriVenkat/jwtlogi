const express = require("express")
const dotEnv = require('dotenv')
const {MongoClient} = require("mongodb")
const app = express()

dotEnv.config()

MongoClient.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("MongoDB connected")
})
.catch((error)=>{
    console.log("error",error)
})
const PORT =5000

console.log(process.env)

app.listen(PORT,() =>{
    console.log('Server Started and running at  ${PORT}')
})










