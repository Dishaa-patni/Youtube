import 'dotenv/config'
import connectDB from "./db/index.js";
import { app } from './app.js';




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