import { TransactionRow } from "./TransactionRow";
import { Link } from "react-router-dom";
import { ArrowRight, Receipt, PlusCircle } from "lucide-react";

export function TransactionTable({
  transactions = [],
  deleteTransaction,
  handleEdit,
  showViewAll = true,
  onAddTransaction,
}) {
  return (
    <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors duration-200">
      {/* Table Header / Title */}
      {showViewAll && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Receipt size={16} />
            </div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Recent Transactions
            </h2>
          </div>
          <Link
            to="/transactions"
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
          >
            <span>View all</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Grid Table Columns Header */}
      <div className="grid grid-cols-12 px-4 py-3 bg-slate-50/80 dark:bg-slate-800/40 border-b border-slate-200/70 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
            <Receipt size={24} />
          </div>
          <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200 mb-1">
            No transactions found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-4">
            Start tracking your expenses and income by adding your first transaction.
          </p>
          {onAddTransaction && (
            <button
              onClick={onAddTransaction}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition cursor-pointer"
            >
              <PlusCircle size={15} />
              <span>Add Transaction</span>
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800/70">
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
        <div className="px-5 py-3 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800/70 text-center">
          <Link
            to="/transactions"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
          >
            <span>View Full Transaction History</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
