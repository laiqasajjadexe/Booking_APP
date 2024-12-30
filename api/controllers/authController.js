import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const register= async (req,res,next) =>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser= new User({
        username:req.body.username,
        email:req.body.email,
        country:req.body.country,
        city:req.body.city,
        phone:req.body.phone,
        password:hash,});

        await newUser.save();
        res.status(200).send("User has been created.");
    }catch(err){
        next(err);
    }
    
};
export const login= async (req,res,next) =>{
    try{
        const user= await User.findOne({username:req.body.username}); //mongodb method
        if (!user) 
            return next (createError(404, "User not found"));

        const isPasswordCorrect= await bcrypt.compare(req.body.password,user.password);
        if (!isPasswordCorrect) 
            return next (createError(400, "Wrong password or User!"));

        const token=jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT);

        const {password, isAdmin, ...otherDetails}=user._doc;

        res.cookie("access_token", token, {httpOnly:true,}).status(200).json({...otherDetails});
    }catch(err){
        next(err);
    }
    
};