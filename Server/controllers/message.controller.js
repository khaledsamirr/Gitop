
import Message from "../models/message.model.js"
import Conversation from "../models/conversation.model.js";

export const createMessage=async(req,res,next)=>{

    const newMessage= new Message({
        conversationId: req.body.conversationId,
        userId:req.userId,
        msg:req.body.msg
    })
    try{

        const savedMessage = await newMessage.save();
        await Conversation.findOneAndUpdate({id:req.body.conversationId},{
            $set:{
               readBySeller:req.isSeller,
               readByBuyer:!req.isSeller,
               lastMessage: req.body.msg
            }

        },{new:true})

        res.status(201).send(savedMessage)

    }catch(err){
        next(err);
    }

}

export const getMessages=async(req,res,next)=>{


    try{
        const messages= await Message.find({conversationId:req.params.conversationId});
        res.status(200).json(messages);
    }catch(err){
        next(err);
    }

}