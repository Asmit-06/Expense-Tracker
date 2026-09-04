import { useEffect, useState } from "react";
import api from "../api/axios.js";
import toast from "react-hot-toast";
import {
  X,
  IndianRupee,
  Calendar,
  Tag,
  ArrowUpRight,
  ArrowDownLeft,
  Layers,
} from "lucide-react";

export function AddTransactionModal({
  closeModal,
  fetchTransactions,
  selectedTransaction,
}) {
  const isEditMode = Boolean(selectedTransaction);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        title: selectedTransaction.title || "",
        amount: selectedTransaction.amount || "",
        category: selectedTransaction.category || "",
        type: selectedTransaction.type || "expense",
        date: selectedTransaction.date
          ? selectedTransaction.date.split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
    } else {
      setFormData({
        title: "",
        amount: "",
        category: "",
        type: "expense",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [selectedTransaction, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (newType) => {
    setFormData((prev) => ({
      ...prev,
      type: newType,
      category: "", // Reset category when switching type
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.amount ||
      !formData.category ||
      !formData.type ||
      !formData.date
    ) {
      toast.error("Please fill in all the required fields");
      return;
    }

    if (Number(formData.amount) <= 0) {
      toast.error("Amount must be greater than zero");
      return;
    }

    if (Number(formData.amount) > 99999999) {
      toast.error("Amount exceeds maximum supported limit");
      return;
    }

    setSubmitting(true);
    try {
      if (isEditMode) {
        await api.put(`/api/transactions/${selectedTransaction._id}`, formData);
        toast.success("Transaction updated successfully");
      } else {
        await api.post("/api/transactions", formData);
        toast.success("Transaction added successfully");
      }
      closeModal();
      fetchTransactions();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save transaction");
    } finally {
      setSubmitting(false);
    }
  };

  const expenseCategories = [
    "Food",
    "Transport",
    "Entertainment",
    "Shopping",
    "Rent",
    "Bills & Utilities",
    "Healthcare",
    "Education",
    "Travel",
    "Technology",
    "Gifts",
    "Other",
  ];

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Investments",
    "Bonus",
    "Refund",
    "Gifts",
    "Other",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {isEditMode ? "Edit Transaction" : "New Transaction"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isEditMode ? "Update your transaction details" : "Record your income or expense"}
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Segmented Type Toggle (Expense / Income) */}
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50">
              <button
                type="button"
                onClick={() => handleTypeChange("expense")}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  formData.type === "expense"
                    ? "bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <ArrowDownLeft size={15} strokeWidth={2.5} />
                <span>Expense</span>
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange("income")}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  formData.type === "income"
                    ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <ArrowUpRight size={15} strokeWidth={2.5} />
                <span>Income</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
              Title / Description
            </label>
            <div className="relative flex items-center">
              <Tag size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Grocery Store, Salary, Coffee"
                value={formData.title}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/90 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
              Amount (INR)
            </label>
            <div className="relative flex items-center">
              <IndianRupee size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
              <input
                type="number"
                name="amount"
                required
                min="0.01"
                step="any"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/90 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
              />
            </div>
          </div>

          {/* Category & Date in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Category */}
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
                Category
              </label>
              <div className="relative flex items-center">
                <Layers size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/90 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition cursor-pointer"
                >
                  <option value="">Select Category</option>
                  {(formData.type === "expense" ? expenseCategories : incomeCategories).map(
                    (cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
                Date
              </label>
              <div className="relative flex items-center">
                <Calendar size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/90 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-3 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={closeModal}
              disabled={submitting}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs sm:text-sm font-bold shadow-sm shadow-indigo-500/25 active:scale-[0.98] transition cursor-pointer disabled:opacity-60"
            >
              {submitting ? "Saving..." : isEditMode ? "Save Changes" : "Create Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
