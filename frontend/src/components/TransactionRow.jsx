import { IndianRupee, Pencil, Trash2 } from "lucide-react";

export function TransactionRow({ transaction, deleteTransaction, handleEdit }) {
  const isExpense = transaction.type === "expense";
  const dateObj = new Date(transaction.date);
  const formattedDate = isNaN(dateObj)
    ? "—"
    : dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

  return (
    <div className="grid grid-cols-12 items-center px-4 py-3 text-[13px] hover:bg-[#141516] transition-colors duration-100 border-b border-[#23252a] last:border-b-0 group">
      {/* Date (2 cols) in JetBrains Mono */}
      <div className="col-span-3 sm:col-span-2 text-[#8a8f98] font-mono text-[12px]">
        {formattedDate}
      </div>

      {/* Description / Title (4 cols mobile, 3 cols desktop) */}
      <div className="col-span-4 sm:col-span-3 font-medium text-[#f7f8f8] truncate pr-2 tracking-[-0.05px]">
        {transaction.title}
      </div>

      {/* Category Pill (2 cols) */}
      <div className="hidden sm:block sm:col-span-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-medium bg-[#141516] text-[#d0d6e0] border border-[#23252a] truncate max-w-full">
          {transaction.category}
        </span>
      </div>

      {/* Type (hidden mobile, 2 cols desktop) */}
      <div className="hidden md:flex md:col-span-2 items-center">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-medium border border-[#23252a] bg-[#141516] ${
            isExpense ? "text-[#eb5757]" : "text-[#27a644]"
          }`}
        >
          {isExpense ? "Expense" : "Income"}
        </span>
      </div>

      {/* Amount (3 cols mobile, 2 cols desktop) in JetBrains Mono */}
      <div
        className={`col-span-3 sm:col-span-2 flex items-center font-mono font-medium justify-end pr-2 text-[13px] ${
          isExpense ? "text-[#eb5757]" : "text-[#27a644]"
        }`}
      >
        <span>{isExpense ? "-" : "+"}</span>
        <IndianRupee size={13} className="ml-0.5 inline shrink-0" />
        <span className="truncate">
          {Number(transaction.amount).toLocaleString("en-IN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>

      {/* Action Buttons (2 cols mobile, 1 col desktop) */}
      <div className="col-span-2 sm:col-span-1 flex items-center justify-end gap-1">
        <button
          onClick={() => handleEdit(transaction)}
          title="Edit"
          className="p-1 rounded-[6px] text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#18191a] transition cursor-pointer"
        >
          <Pencil size={13} />
        </button>
        <button
          onClick={() => deleteTransaction(transaction._id)}
          title="Delete"
          className="p-1 rounded-[6px] text-[#8a8f98] hover:text-[#eb5757] hover:bg-[#18191a] transition cursor-pointer"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}