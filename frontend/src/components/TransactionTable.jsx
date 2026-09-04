import { TransactionRow } from "./TransactionRow";
import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";

export function TransactionTable({
  transactions = [],
  deleteTransaction,
  handleEdit,
  showViewAll = true,
  onAddTransaction,
}) {
  return (
    <div className="rounded-[12px] bg-[#0f1011] border border-[#23252a] overflow-hidden">
      {/* Table Header / Title */}
      {showViewAll && (
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#23252a]">
          <div>
            <h2 className="font-medium text-[15px] text-[#f7f8f8] tracking-[-0.2px]">
              Recent Activity
            </h2>
            <p className="text-[12px] text-[#8a8f98]">
              Latest ledger entries
            </p>
          </div>
          <Link
            to="/transactions"
            className="inline-flex items-center gap-1 text-[13px] font-medium text-[#5e6ad2] hover:text-[#828fff] transition"
          >
            <span>View all</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      )}

      {/* Grid Table Columns Header */}
      <div className="grid grid-cols-12 px-4 py-2.5 bg-[#0f1011] border-b border-[#23252a] text-[11px] font-medium uppercase tracking-[0.4px] text-[#8a8f98]">
        <div className="col-span-3 sm:col-span-2">Date</div>
        <div className="col-span-4 sm:col-span-3">Description</div>
        <div className="hidden sm:block sm:col-span-2">Category</div>
        <div className="hidden md:block md:col-span-2">Type</div>
        <div className="col-span-3 sm:col-span-2 text-right pr-2">Amount</div>
        <div className="col-span-2 sm:col-span-1 text-right">Actions</div>
      </div>

      {/* Transaction Rows or Empty State */}
      {transactions.length === 0 ? (
        <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
          <p className="font-medium text-[13px] text-[#f7f8f8] mb-1">
            No transactions found
          </p>
          <p className="text-[12px] text-[#8a8f98] max-w-sm mb-4">
            Record cash inflows and outflows to start tracking.
          </p>
          {onAddTransaction && (
            <button
              onClick={onAddTransaction}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium px-3 py-1.5 rounded-[8px] bg-[#141516] border border-[#23252a] hover:border-[#34343a] text-[#f7f8f8] transition cursor-pointer"
            >
              <Plus size={14} />
              <span>Add Transaction</span>
            </button>
          )}
        </div>
      ) : (
        <div>
          {transactions.map((t) => (
            <TransactionRow
              key={t._id}
              transaction={t}
              deleteTransaction={deleteTransaction}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {/* Table Footer */}
      {showViewAll && transactions.length > 0 && (
        <div className="px-5 py-3 border-t border-[#23252a] text-center bg-[#0f1011]">
          <Link
            to="/transactions"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#5e6ad2] hover:text-[#828fff] transition"
          >
            <span>View all transactions</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </div>
  );
}
