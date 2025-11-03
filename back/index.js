import express from 'express'
import {connect_db} from './lib/connect_db.js'
import userRoute from './routes/userRoute.js'
import transactionRoute from './routes/transactionRoute.js'
import authRoute from './routes/authRoute.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
import {verifyToken} from './middleware/AuthMiddleware.js'
import dotenv from 'dotenv'

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.send("hello");
})
app.use('/user',userRoute);
app.use('/auth',verifyToken,authRoute);
app.use('/transaction',verifyToken,transactionRoute);

app.listen(3000,()=>{
    console.log(`server running at ${port}`);
    connect_db();
})