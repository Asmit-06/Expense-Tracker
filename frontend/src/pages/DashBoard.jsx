import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Summary } from "../components/Summary";
import { TransactionTable } from "../components/TransactionTable";
import { AddTransactionModal } from "../components/AddTransactionModal";
import { useEffect,useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export function DashBoard(){

  const[selectedTransaction,setSelectedTransaction] = useState(null);
  const handleEdit = (transaction)=>{
    setSelectedTransaction(transaction);
    toggleModal();
  }

  //all transactions
  const [transactions, setTransactions] = useState([]);
  
    const fetchTransactions = async()=>{
      try{
        const res = await axios.get("http://localhost:3000/api/transactions");
    
        setTransactions(res.data.data);
       
        
      }
      catch(err){
        console.log("Error fetching transactions", err);
      }
     

    }

    const[isOpen,setisOpen] = useState(false);
    const toggleModal = ()=>{
      setisOpen(!isOpen);
    }
    const closeModal = ()=>{
      setisOpen(false);
    }

    const deleteTransaction = async(id)=>{
      if(!window.confirm("Are you sure you want to delete this transaction?"))return;
      try{
        await axios.delete(`http://localhost:3000/api/transactions/${id}`);
        fetchTransactions();
        toast.success("Transaction deleted successfully");

      }catch(err){
        console.log("Error deleting transaction", err);

      }

    }

    //calculate summary

    const totalIncome = ()=>{
      return transactions.reduce((acc,transaction)=>{
        if(transaction.type === "income"){
          return acc + transaction.amount;
        }else{
          return acc;
        }
      },0)

    }

    const totalExpense = ()=>{
      return transactions.reduce((acc,transaction)=>{
        if(transaction.type === "expense"){
          return acc + transaction.amount;
        

        }
        else{
          return acc;
        }
      },0)
    }

    const totalTransactions =()=>{
      return transactions.length;
    }

    const income = totalIncome();
    const expense = totalExpense();
    const totalNoOfTransactions = totalTransactions();


    useEffect(()=>{
      fetchTransactions();
    
    },[])
  
  return (
    <div className="app-layout flex min-h-screen ">
      <Sidebar toggleModal={toggleModal} balance={income-expense}/>
      <main className="flex-1 bg-gray-100 py-8 px-10">
        <Header  toggleModal={toggleModal}/>
        <Summary income={income} expense={expense} balance={income-expense} totalNoOfTransactions={totalNoOfTransactions} />
        <TransactionTable transactions={transactions} fetchTransactions={fetchTransactions} deleteTransaction={deleteTransaction} handleEdit={handleEdit}/>
        {isOpen && <AddTransactionModal closeModal={closeModal} fetchTransactions={fetchTransactions} selectedTransaction={selectedTransaction}/>}
      </main>
     
    </div>
  );
}