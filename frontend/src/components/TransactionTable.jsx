import { ShipWheel } from "lucide-react";
import { TransactionRow } from "./TransactionRow";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
export function TransactionTable({
  transactions,
  fetchTransactions,
  deleteTransaction,
  handleEdit,
  showViewAll = true,
}) {
  const location = useLocation();
  return (
    <div className="mt-14 shadow-sm border border-gray-200 rounded-[7px] overflow-hidden dark:border-gray-600">
      {location.pathname !== "/transactions" && (
          <div className="bg-white px-4 py-4 dark:bg-[#0D1016]">
          {showViewAll && <h1 className="font-bold text-2xl dark:text-white">Recent Transactions</h1>}
          
        </div>
      )}
    

      <div className={location.pathname !== "/transactions" ? "head flex justify-between font-semibold px-5 py-4 dark:text-gray-400":"head flex justify-between font-semibold px-5 py-4 dark:text-gray-400 dark:bg-[#10151f]"}>
        <p>Date</p>
        <p>Description</p>
        <p>Category</p>
        <p>Type</p>
        <p>Amount</p>
        <p>Actions</p>
      </div>
      
      <hr className="text-gray-200 dark:text-gray-600" />

      {transactions.map((t) => (
        <>
          <TransactionRow
            
            key={t._id}
            transaction={t}
            deleteTransaction={deleteTransaction}
            handleEdit={handleEdit}
            
          />
          <hr className="text-gray-200 dark:text-gray-600" />
        </>
      ))}

      {showViewAll && (
        <div className="flex justify-center py-4 text-blue-600 font-semibold cursor-pointer dark:bg-[#0D1016]">
          <Link to="/transactions">View All Transactions →</Link>
        </div>
      )}
    </div>
  );
}
