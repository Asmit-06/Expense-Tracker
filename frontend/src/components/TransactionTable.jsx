import { ShipWheel } from "lucide-react";
import { TransactionRow } from "./TransactionRow";

import { Link } from "react-router-dom";
export function TransactionTable({
  transactions,
  fetchTransactions,
  deleteTransaction,
  handleEdit,
  showViewAll = true,
}) {
  return (
    <div className="mt-8 shadow-sm border border-gray-200 rounded-[7px] overflow-hidden">
      <div className="bg-white px-4 py-4">
        {showViewAll && <h1 className="font-bold text-2xl">Recent Transactions</h1>}
        
      </div>

      <div className="flex justify-between font-semibold px-5 py-4">
        <p>Date</p>
        <p>Description</p>
        <p>Category</p>
        <p>Type</p>
        <p>Amount</p>
        <p>Actions</p>
      </div>

      <hr className="text-gray-200" />

      {transactions.map((t) => (
        <>
          <TransactionRow
            key={t._id}
            transaction={t}
            deleteTransaction={deleteTransaction}
            handleEdit={handleEdit}
          />
          <hr className="text-gray-200" />
        </>
      ))}

      {showViewAll && (
        <div className="flex justify-center py-4 text-blue-600 font-semibold cursor-pointer ">
          <Link to="/transactions">View All Transactions →</Link>
        </div>
      )}
    </div>
  );
}
