import { IndianRupee, Pencil, Trash2, ArrowDownLeft, ArrowUpRight } from "lucide-react";

export function TransactionRow({ transaction, deleteTransaction, handleEdit }) {
  const isExpense = transaction.type === "expense";
  const dateObj = new Date(transaction.date);
  const formattedDate = isNaN(dateObj)
    ? "Invalid date"
    : dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

  return (
    <div className="grid grid-cols-12 items-center px-4 py-3.5 text-xs sm:text-sm hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors border-b border-slate-100 dark:border-slate-800/70 last:border-b-0 group">
      {/* Date (2 cols) */}
      <div className="col-span-3 sm:col-span-2 text-slate-500 dark:text-slate-400 font-medium">
        {formattedDate}
      </div>

      {/* Description / Title (4 cols on mobile, 3 cols on desktop) */}
      <div className="col-span-4 sm:col-span-3 font-semibold text-slate-900 dark:text-white truncate pr-2">
        {transaction.title}
      </div>

      {/* Category Pill (2 cols, hidden on very small screens) */}
      <div className="hidden sm:block sm:col-span-2">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 truncate max-w-full">
          {transaction.category}
        </span>
      </div>

      {/* Type (hidden on mobile, 2 cols on desktop) */}
      <div className="hidden md:flex md:col-span-2 items-center gap-1.5">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
            isExpense
              ? "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40"
              : "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
          }`}
        >
          {isExpense ? (
            <ArrowDownLeft size={12} strokeWidth={2.5} />
          ) : (
            <ArrowUpRight size={12} strokeWidth={2.5} />
          )}
          {isExpense ? "Expense" : "Income"}
        </span>
      </div>

      {/* Amount (3 cols on mobile, 2 cols on desktop) */}
      <div
        className={`col-span-3 sm:col-span-2 flex items-center font-bold tracking-tight text-right justify-end pr-2 ${
          isExpense
            ? "text-rose-600 dark:text-rose-400"
            : "text-emerald-600 dark:text-emerald-400"
        }`}
      >
        <span>{isExpense ? "-" : "+"}</span>
        <IndianRupee size={14} className="ml-0.5 inline shrink-0" />
        <span className="truncate">
          {Number(transaction.amount).toLocaleString("en-IN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>

      {/* Action Buttons (2 cols on mobile, 1 col on desktop) */}
      <div className="col-span-2 sm:col-span-1 flex items-center justify-end gap-1">
        <button
          onClick={() => handleEdit(transaction)}
          title="Edit transaction"
          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400 transition cursor-pointer"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={() => deleteTransaction(transaction._id)}
          title="Delete transaction"
          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 dark:hover:text-rose-400 transition cursor-pointer"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}