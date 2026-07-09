import Transaction from '../models/Transaction.js';

const getAllTransactions = async(req,res)=>{
  try{
    const transaction = await Transaction.find({user:req.userId}).sort({createdAt:-1});
    res.status(200).json({message:"Transactions fetched successfully", data:transaction});
  }catch(err){
    res.status(500).json({message:"Error fetching transactions", error:err.message});
  }
} 

const addTransaction = async(req,res)=>{
  try{
    const newTransaction = await Transaction.create({...req.body,user:req.userId});
    res.status(201).json({message:"Transaction added successfully", data:newTransaction});
  }catch(err){
    res.status(400).json({message:"Error adding transaction", error:err.message});
  }
}

const deleteTransaction = async(req,res)=>{
  try{
    const deletedtransaction = await Transaction.findOneAndDelete({
      _id:req.params.id,user:req.userId
    });
    if(!deletedtransaction){
      return res.status(404).json({message:"Transaction not found"});
    }
    res.status(200).json({message:"Transaction deleted successfully"});
  }catch(err){
    res.status(500).json({message:"Error deleting transaction",error:err.message})
  }
}

const updateTransaction = async(req,res)=>{
  try{
    const {id} = req.params;
    const {amount,title,type,category,date} = req.body;
  
    const updatedNote = await Transaction.findByIdAndUpdate({_id:id,user:req.userId},{amount,title,type,category,date},{new : true});
    if(!updatedNote){
      return res.status(404).json({message:"Transaction not found"});
    }
    res.status(200).json({message:"Transaction updated successfully", data:updatedNote});
  }catch(err){
    res.status(500).json({message:"Error updating transaction", error:err.message});
  }

}

const getTransactionById = async(req,res)=>{
  try{
    const transaction = await Transaction.findById({_id:req.params.id,user:req.userId});
    if(!transaction){
      return res.status(404).json({message:"Transaction not found"});
    }
    res.status(200).json({message:"Transaction fetched successfully", data:transaction});
  }catch(err){
    res.status(500).json({message:"Error fetching transaction", error:err.message});
  }
}

export {getAllTransactions, addTransaction, deleteTransaction, getTransactionById, updateTransaction};