import { useEffect, useState } from "react";
import { TransactionRow } from "./TransactionRow";
import axios from "axios";
export function TransactionTable({transactions,fetchTransactions,deleteTransaction}) {
 
 

  return (
    <div className="mt-8 shadow-sm border border-gray-200 rounded-[7px] overflow-hidden">

  
      <div className="bg-white px-4 py-4">
        <h1 className="font-bold text-2xl">Recent Transactions</h1>
      </div>

     
      <div className="flex justify-between font-semibold px-5 py-4">
        <p>Date</p>
        <p>Description</p>
        <p>Category</p>
        <p>Type</p>
        <p>Amount</p>
        <p>Actions</p>
      </div>

      <hr className="text-gray-200"/>

      
      {transactions.slice(0,5).map((t) => (
        <>
          <TransactionRow key={t._id} transaction={t} deleteTransaction={deleteTransaction}  />
          <hr className="text-gray-200" />
        </>
      ))}

      
      <div className="flex justify-center py-4 text-blue-600 font-semibold cursor-pointer " onClick={fetchTransactions}>
        View All Transactions →
      </div>

    </div>
  );
}