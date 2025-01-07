import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const register=async(req,res,next)=>{
    try {
        const {firstName, lastName, email, password}= req.body;

        const profileImage = req.file;

        if(!profileImage)
        {
            return res.status(400).json({ message: "No profile image uploaded" });
        }
        const profileImagePath = profileImage.path;

        const existingUser =await User.findOne({email});
        if(existingUser)
        { 
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword =await bcrypt.hash(password,10);

        const newUser = new User({firstName, lastName,email, password:hashedPassword,profileImagePath});

        await newUser.save();
        res.status(201).json({message:"user created successfully", user:newUser});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}