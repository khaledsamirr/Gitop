import createError from "../utils/createError.js"
import Gig from "../models/gig.model.js"

export const createGig=async(req,res,next)=>{
    if(!req.isSeller) return next(createError(403,"Only Sellers can create a gig"));
    const newGig= new Gig({
        userId: req.userId,
        ...req.body
    })

    try{    
        const savedGig= await newGig.save();
        res.status(201).json(savedGig);
    }catch(err){
        next(err);
    }
}
export const deleteGig=async(req,res,next)=>{

    try{
        const gig= await Gig.findById(req.params.id);
        if(gig.userId!==req.userId) return next(createError(403,"You can only delete your own gig"))

        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).send("Gig has been deleted!")

    }catch(err) {next(err)}

}
export const getGig=async(req,res,next)=>{

    try{
        const gig= await Gig.findById(req.params.id);
        if(!gig){
            return next(createError(404,"Gig is not found"))
        }
        res.status(200).json(gig);
    }catch(err){
        next(err);
    }
}
export const getAllGigs=async(req,res,next)=>{

    const query= req.query;
    const filters={
        ...(query.category&&{category:query.category}),
        ...((query.min || query.max) && {
            price: {
              ...(query.min && { $gt: query.min }),
              ...(query.max && { $lt: query.max }),
            },
          }),
        ...(query.search &&{title:{$regex:query.search,$options:"i"}} ),
        ...(query.userId&&{userId:query.userId}),
    }

    try{
        const gigs = await Gig.find(filters).sort({ [query.sort]: -1 });
        if(!gigs){ return next(createError(404,"No Gigs at all")) }

        res.status(200).json(gigs);
    }catch(err){
        next(err);
    }

}

