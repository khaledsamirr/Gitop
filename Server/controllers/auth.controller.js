import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import createError from "../utils/createError.js";

export const register=async(req,res,next)=>{

    try{
        if(req.body.password===""||req.body.country===""||req.body.username===""||req.body.email===""){
            return res.status(400).send("Please fill in all the form!")
        }
        if(req.body.password.length<8){
            return res.status(400).send("Password length can't be less than 8 characters")
        }
        if(req.body.isSeller===true){
            if(req.body.desc===""||req.body.phone===""){
                return res.status(400).send("As a seller you must enter your phone number and short description about yourself.")
            }
        }
        const hash= bcrypt.hashSync(req.body.password,5);
        const newUser= new User({
            ...req.body,
            password:hash
        })

        await newUser.save();
        res.status(201).send("User has been created.")
    }catch(err){
        next(err)
    }

}
export const login=async(req,res,next)=>{

    try{
        const user=await User.findOne({username:req.body.username});
        if(!user) return next(createError(404,"User not found!"))

        const passwordUnhashed=bcrypt.compareSync(req.body.password,user.password)
        if(!passwordUnhashed) return next(createError(400,"Wrong password or username!"))

        const token=jwt.sign({
            id:user._id,
            isSeller:user.isSeller
        }, process.env.JWT_KEY )

        const {password,...info}=user._doc;
        res.cookie("accessToken",token,{
            httpOnly: true,
        }).status(200).json(info);

    }catch(err){
        next(err)
    }

}
export const logout= async(req,res)=>{
    res.clearCookie("accessToken",{
        sameSite:"none",
        secure:true
    }).status(200).send("User has been logged out!")

}