import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
dotenv.config()

const app=express();

connectDB();

// setup json encoder middleware

app.use(express.json())

//Auth Routes

app.use("/auth",authRoutes);

// Health Check
app.get("/health",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Server is running"
    });
})


app.listen(process.env.PORT,()=>{
    console.log("Server running on port 4000");
})