import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const url = process.env.MONGODB_URL;

export const connect_db = ()=>{
    mongoose.connect(url).then(()=>{
        const conn = mongoose.connection;
        console.log("Mongodb connected at "+conn.port);
    }).catch((err)=>{
        console.error("connction failed "+err);
    });
}