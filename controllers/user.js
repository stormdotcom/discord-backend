import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from "../models/User.js";
import jwt from 'jsonwebtoken';

export const login = (async(req, res)=> {

    const {email, password} = req.body; 

    try {
        const user = await User.findOne({ email: email})
        console.log(user)
        const id = user._id.toString()
        if(!user)  return res.status(404).json({message:"No user found"})

        const isPassword = await bcrypt.compare(password, user.password)

        if(!isPassword) return res.status(403).json({message: "Invalid Credentials"})

        const token = jwt.sign({userId:id, email, }, process.env.SECRET_KEY, {expiresIn: '2h' })

        res.status(200).json({userDetails: {email:user.email, username: user.username, token }})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Something went wrong"})
    }
}) 


export const register = (async(req, res)=> {

    const {username, password, email} = req.body;
    try {
       const isUserExists = await User.findOne({email:email});

       if(isUserExists) return res.status(409).json({message: "User already exists, Please try another Email"})

        const hashedPassword = await bcrypt.hash(password, 10); 

        const result = await User.create({email, username, password:hashedPassword})
        const id = result._id.toString()
        const token = jwt.sign({userId:id.toString(), email, }, process.env.SECRET_KEY, {expiresIn: '2h' })

        res.status(201).json({userDetails: {email:result.email, username:isUserExists?.username, token}})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Something went wrong"})
    }
}) 