import Transaction from '../models/Transaction.js';

const getAllTransactions = async(req,res)=>{
  try{
    const transaction = await Transaction.find().sort({createdAt:-1});
    res.status(200).json({message:"Transactions fetched successfully", data:transaction});
  }catch(err){
    res.status(500).json({message:"Error fetching transactions", error:err.message});
  }
} 

const addTransaction = async(req,res)=>{
  try{
    const newTransaction = await Transaction.create(req.body);
    res.status(201).json({message:"Transaction added successfully", data:newTransaction});
  }catch(err){
    res.status(400).json({message:"Error adding transaction", error:err.message});
  }
}

const deletedTransaction = async(req,res)=>{
  try{
    const deletedtransaction = await Transaction.findByIdAndDelete(req.params.id);
    if(!deletedtransaction){
      return res.status(404).json({message:"Transaction not found"});
    }
    res.status(200).json({message:"Transaction deleted successfully"});
  }catch(err){
    res.status(500).json({message:"Error deleting transaction",error:err.message})
  }
}

const getTransactionById = async(req,res)=>{
  try{
    const transaction = await Transaction.findById(req.params.id);
    if(!transaction){
      return res.status(404).json({message:"Transaction not found"});
    }
    res.status(200).json({message:"Transaction fetched successfully", data:transaction});
  }catch(err){
    res.status(500).json({message:"Error fetching transaction", error:err.message});
  }
}

export {getAllTransactions, addTransaction, deletedTransaction, getTransactionById};