import { IndianRupeeIcon,Edit,Trash } from "lucide-react";
import axios from "axios";
export function TransactionRow({ transaction,deleteTransaction,handleEdit }) {
  
  return (
    <div className="flex justify-between font-semibold text-[15px] px-3 py-5 items-center bg-white">
      <p>{new Date(transaction.date).toDateString()}</p>
      <p>{transaction.title}</p>
      <p className="text-blue-500">{transaction.category}</p>

      <p className={transaction.type === "expense" ? "text-red-500" : "text-green-500"}>
        {transaction.type}
      </p>

      <div className={`flex items-center ${transaction.type === "expense" ? "text-red-500" : "text-green-500"}`}>
        <p>{transaction.type === "expense" ? "-" : "+"}</p>
        <IndianRupeeIcon size={15} />
        <p>{transaction.amount}</p>
      </div>

      <div className="flex gap-6 items-center cursor-pointer">
        <Edit color="gray" onClick={()=>handleEdit(transaction)} />
        <Trash color="red" onClick={()=>deleteTransaction(transaction._id)} />
      </div>
    </div>
  );
}