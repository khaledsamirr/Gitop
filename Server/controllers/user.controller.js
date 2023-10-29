import User from "../models/user.model.js"
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const deleteUser=async(req,res,next)=>{

    try{
        const user = await User.findById(req.params.id);
        if(!user) return next(createError(404,"User not found"))
        
        if(req.userId!==user._id.toString()){
            return next(createError(403,"You can only delete your own account"))
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("Account has been deleted!")
        

    }catch(err){
        next(err)
    }
}