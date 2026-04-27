import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    trim:true
  },
  amount:{
    type:Number,
    required:true,
    min:1,
    
  },
  type:{
    type:String,
    required:true,
    enum:["income","expense"]
  },
  category:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    required:true,
    default:Date.now
  }
},{timestamps:true});

const Transaction  = mongoose.model("Transaction",transactionSchema);
export default Transaction;