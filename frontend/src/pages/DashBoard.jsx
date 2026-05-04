import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Summary } from "../components/Summary";
import { TransactionTable } from "../components/TransactionTable";
import { useEffect,useState } from "react";
import axios from "axios";
export function DashBoard(){
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
    useEffect(()=>{
      fetchTransactions();
    },[])
  return (
    <div className="app-layout flex min-h-screen ">
      <Sidebar />
      <main className="flex-1 bg-gray-100 py-8 px-10">
        <Header fetchTransactions={fetchTransactions}/>
        <Summary/>
        <TransactionTable transactions={transactions} fetchTransactions={fetchTransactions}/>
      </main>
     
    </div>
  );
}