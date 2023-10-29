import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose' 

const app= express()
dotenv.config();

const connect= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo is ready!")
     }catch(err){
         console.log(err)
     }
}


app.listen(8800,()=>{
    connect()
    console.log("Backend Server is connected!")
})