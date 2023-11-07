import Order from "../models/order.model.js"
import Gig from "../models/gig.model.js"
import Stripe from "stripe"


export const getOrders= async (req,res,next)=>{

    try{

        const orders=await Order.find({
            ...(req.isSeller?{sellerId:req.userId}:{buyerId:req.userId}),
            isCompleted:true
        })

        res.status(200).json(orders)
    }catch(err){
        next(err)
    }

}


export const payment= async (req,res,next)=>{
    
    const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)
    try{ 
         
    const gig= await Gig.findById(req.params.id);
    const payment=await stripe.paymentIntents.create({
        amount: gig.price*100,
        currency:"usd",
        automatic_payment_methods:{
            enabled:true
        }

    })

    const newOrder=new Order({
        gigId: gig._id,
        img:gig.cover,
        title:gig.title,
        buyerId:req.userId,
        sellerId:gig.userId,
        price:gig.price,
        payment:payment.id
    })
    await newOrder.save();
    res.status(200).send({clientSecret: payment.client_secret})

    }catch(err){
        next(err)
    }
}

export const confirm=async(req,res,next)=>{
    try{
        const order=await Order.findOneAndUpdate(
            {
                payment: req.body.payment
            },{
                $set:{
                    isCompleted:true
                }
            }
        )

        res.status(200).json(order)
    }catch(err){
        next(err);
    }

} 