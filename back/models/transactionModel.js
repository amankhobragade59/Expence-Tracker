import mongoose, { now } from "mongoose";
const transactionSchema = mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
});


const Transaction = mongoose.model('transactions',transactionSchema);

export default Transaction;