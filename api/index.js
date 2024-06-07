import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose';
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("DataBase connected succesfully")
}).catch((err)=> {
    console.log(err);
})
const app = express()

app.listen(3000, () => {
    console.log('Server is runnning on port 3000');
})
