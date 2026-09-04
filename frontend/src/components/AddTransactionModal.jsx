import { useEffect, useState } from "react";
import api from "../api/axios.js";
import toast from "react-hot-toast";
import { X, IndianRupee } from "lucide-react";

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
      category: "",
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
      toast.error("Please fill in all required fields");
      return;
    }

    if (Number(formData.amount) <= 0) {
      toast.error("Amount must be greater than zero");
      return;
    }

    setSubmitting(true);
    try {
      if (isEditMode) {
        await api.put(`/api/transactions/${selectedTransaction._id}`, formData);
        toast.success("Transaction updated");
      } else {
        await api.post("/api/transactions", formData);
        toast.success("Transaction created");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/80">
      <div className="relative w-full max-w-md rounded-[12px] bg-[#0f1011] border border-[#23252a] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#23252a]">
          <div>
            <h2 className="text-[17px] font-semibold text-[#f7f8f8] tracking-[-0.4px]">
              {isEditMode ? "Edit Transaction" : "New Transaction"}
            </h2>
            <p className="text-[12px] text-[#8a8f98] mt-0.5">
              Record cash inflow or outflow entry
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-[6px] text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#141516] transition cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {/* Type selector (Surface-2) */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-[0.4px] text-[#8a8f98] block mb-1">
              Type
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-[8px] bg-[#141516] border border-[#23252a]">
              <button
                type="button"
                onClick={() => handleTypeChange("expense")}
                className={`py-1.5 rounded-[6px] text-[12px] font-medium transition cursor-pointer ${
                  formData.type === "expense"
                    ? "bg-[#18191a] text-[#eb5757] border border-[#34343a]"
                    : "text-[#8a8f98] hover:text-[#f7f8f8]"
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange("income")}
                className={`py-1.5 rounded-[6px] text-[12px] font-medium transition cursor-pointer ${
                  formData.type === "income"
                    ? "bg-[#18191a] text-[#27a644] border border-[#34343a]"
                    : "text-[#8a8f98] hover:text-[#f7f8f8]"
                }`}
              >
                Income
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-[0.4px] text-[#8a8f98] block mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. AWS Hosting, Salary, Groceries"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-[8px] border border-[#23252a] focus:border-[#5e69d1] focus:ring-1 focus:ring-[#5e69d1] bg-[#141516] text-[13px] text-[#f7f8f8] placeholder-[#62666d] outline-none transition"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-[0.4px] text-[#8a8f98] block mb-1">
              Amount (INR)
            </label>
            <div className="relative flex items-center">
              <IndianRupee size={14} className="absolute left-3 text-[#8a8f98] pointer-events-none" />
              <input
                type="number"
                name="amount"
                required
                min="0.01"
                step="any"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                className="w-full pl-8 pr-3 py-2 rounded-[8px] border border-[#23252a] focus:border-[#5e69d1] focus:ring-1 focus:ring-[#5e69d1] bg-[#141516] text-[13px] font-mono text-[#f7f8f8] placeholder-[#62666d] outline-none transition"
              />
            </div>
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium uppercase tracking-[0.4px] text-[#8a8f98] block mb-1">
                Category
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-2.5 py-2 rounded-[8px] border border-[#23252a] focus:border-[#5e69d1] focus:ring-1 focus:ring-[#5e69d1] bg-[#141516] text-[12px] text-[#f7f8f8] outline-none transition cursor-pointer"
              >
                <option value="">Select</option>
                {(formData.type === "expense" ? expenseCategories : incomeCategories).map(
                  (cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-medium uppercase tracking-[0.4px] text-[#8a8f98] block mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-2.5 py-1.5 rounded-[8px] border border-[#23252a] focus:border-[#5e69d1] focus:ring-1 focus:ring-[#5e69d1] bg-[#141516] text-[12px] text-[#f7f8f8] outline-none transition"
              />
            </div>
          </div>

          {/* Form Actions (Linear button-secondary & button-primary) */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              disabled={submitting}
              className="px-3.5 py-1.5 rounded-[8px] border border-[#23252a] bg-[#141516] hover:bg-[#18191a] text-[13px] font-medium text-[#f7f8f8] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-3.5 py-1.5 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] active:bg-[#5e69d1] text-[13px] font-medium text-white transition cursor-pointer disabled:opacity-60"
            >
              {submitting ? "Saving..." : isEditMode ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
