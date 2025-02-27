import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route.js'
import listingRoutes from "./routes/listing.route.js"
import bookingRoutes from "./routes/booking.route.js"
import userRoutes from "./routes/user.route.js"

dotenv.config();
const app=express();
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to mongo db")
}).catch((err)=>{
    console.log(err);
})

app.use(express.json())
app.use(cors());
app.use(express.static("public"))

app.listen(3000, ()=>{
    console.log("server is running in port 3000")
})

app.use("/api/auth",authRoutes);
app.use("/api/listing", listingRoutes)
app.use("/api/booking", bookingRoutes)
app.use("/api/user", userRoutes)