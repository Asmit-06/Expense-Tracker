import { useEffect,useState } from "react";
import { TransactionTable } from "../components/TransactionTable"
import { AddTransactionModal } from "../components/AddTransactionModal";
import { ArrowLeftIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
export function TransactionPage() {

  const[isOpen,setIsOpen] = useState(false);
  const[transactions,setTransactions] = useState([]);
  const[selectedTransaction,setSelectedTransaction] = useState(null);
  const handleEdit = (transaction)=>{
    setSelectedTransaction(transaction);
    setIsOpen(true)
    
  }

  const deleteTransaction = async(id)=>{
    if(!window.confirm("Are you sure you want to delete this transaction?")) return;

    try{
      await axios.delete(`http://localhost:3000/api/transactions/${id}`);
      fetchTransactions();
      toast.success("Transaction deleted successfully");
    }catch(err){
      console.error("Error deleting transaction",err);
    }
   }

  const fetchTransactions =async()=>{
    try{
      const res = await axios.get("http://localhost:3000/api/transactions");
      setTransactions(res.data.data);

    }catch(err){
      console.error("Error fetching transactions",err);
    }
  }

  const[search,setSearch] = useState("");
  const filteredTransactions = transactions.filter((t)=>{
    return t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()) ||
    t.type.toLowerCase().includes(search.toLowerCase())
  })

  useEffect(()=>{
    fetchTransactions();
  },[])
  return(
    <>
    <div className="relative">
    <ArrowLeftIcon className="size-10 cursor-pointer  absolute ml-4 " onClick={()=>window.history.back()} />
    <h1 className="text-2xl text-center mt-3 font-bold uppercase">Transaction Page</h1>

    <div className="flex items-center justify-center">
      <input type="text" placeholder="Search Transactions..." value={search} onChange={(e)=>setSearch(e.target.value)} className="border border-gray-300 mt-3 px-3 rounded-lg outline-none focus:border-blue-400" />
    </div>

    <TransactionTable transactions={filteredTransactions} showViewAll={false} deleteTransaction={deleteTransaction} handleEdit={handleEdit}  />

    {isOpen && <AddTransactionModal selectedTransaction={selectedTransaction} fetchTransactions={fetchTransactions} closeModal={()=>{setIsOpen(false); setSelectedTransaction(null)}} />}
    </div>
   
    </>
  )
}