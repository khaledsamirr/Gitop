import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose' 
import userRoute from './routes/user.route.js'
import gigRoute from './routes/gig.route.js'
import reviewRoute from './routes/review.route.js'
import messageRoute from './routes/message.route.js'
import conversationRoute from './routes/conversation.route.js'
import orderRoute from './routes/order.route.js'
import authRoute from './routes/auth.route.js'
import bodyParser from 'body-parser'
import cors from "cors";
import cookieParser from "cookie-parser"

const app= express()
dotenv.config();

var whitelist = ['http://localhost:5174', /** other domains if any */ ]
var corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

const connect= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo is ready!")
     }catch(err){
         console.log(err)
     }
}



app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/conversations",conversationRoute);
app.use("/api/reviews",reviewRoute);
app.use("/api/orders",orderRoute);
app.use("/api/gigs",gigRoute);
app.use("/api/messages",messageRoute);



app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.listen(8800,()=>{
    connect()
    console.log("Backend Server is connected!")
})