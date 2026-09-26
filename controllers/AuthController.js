import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


export const Signup=async (req,res)=>{
    try {
        const {name,email,password}=req.body
        if(!name || !email || !password){
            res.status(400).json({
                error:"Details missing fro request body"
            })
        }
        const emailExists=await User.findByEmail(email);

        if(emailExists){
            res.status(409).json({
                error:"User Already exists"
            })
        }
        const hashedPassword=await bcrypt.hash(password, 10);

        //Save user in DB
        const user=await User.create({
            name,
            email,
            password:hashedPassword
        });

        //create JWT Token

        const token=jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );

        res.status(201).json({
            message:"User Created",
            token:token
        })
    } catch (error) {
        res.status(500).json({
            error:error
        })
    }
}

export const Login=async (req,res)=>{
    try {
        const[email,password]=req.body
        if(!email || !password){
            res.status(400).json({
                error:"Details missing fro request body"
            })
        }
        const user=await User.findByEmail(email);
        if(!user){
            res.status(404).json({
                error:"User Does not exists"
            })
        }
        

        const isMatch=await bcrypt.compare(
            password,
            user.password
        )

        if(!isMatch){
            res.status(401).json({
                error:"Wrong Credentials"
            })
        }
        

        const token=jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );

        res.status(200).json({
            message:"User Created",
            token:token
        })
    } catch (error) {
        res.status(500).json({
            error:error,
            message:"Error creating user"
        });
    }
}

