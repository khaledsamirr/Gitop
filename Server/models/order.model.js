import mongoose from "mongoose"
const {Schema}= mongoose;

const orderSchema=new Schema({
   gigId:{
    type:String,
    required:true
   },
   title:{
    type:String,
    required:true
   },
   price:{
    type:Number,
    required:true
   },
   buyerId:{
    type:String,
    required:true
   },
   sellerId:{
    type:String,
    required:true
   },
   isCompleted:{
    type:Boolean,
    default:false
   },
   payment:{
    type:String,
    required:true
   }
},{
    timestamps: true
})

export default mongoose.model("Order",orderSchema)