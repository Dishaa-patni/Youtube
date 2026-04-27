import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config({
    path : './.env'
})

const Port = process.env.PORT || 8000
// db is connected now it should listen to the server 
connectDB()
.then(()=>{
app.listen(Port , ()=>{
    console.log(`Server is running on PORT : ${Port}`)
  })
})
.catch((err)=>{
console.log("MONGO DB connection failed !!!",err)
})