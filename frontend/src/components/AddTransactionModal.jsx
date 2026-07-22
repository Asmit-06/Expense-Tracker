import { useEffect, useState } from "react";

import api from "../api/axios.js"
import toast from "react-hot-toast";
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
    type: "",
    date: "",
  });
  useEffect(() => {
    if (isEditMode) {
      setFormData({
        title: selectedTransaction.title,
        amount: selectedTransaction.amount,
        category: selectedTransaction.category,
        type: selectedTransaction.type,
        date: selectedTransaction.date.split("T")[0],
      });
    } else {
      setFormData({
        title: "",
        amount: "",
        category: "",
        type: "",
        date: "",
      });
    }
  }, [selectedTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.title ||
        !formData.amount ||
        !formData.category ||
        !formData.type ||
        !formData.date
      ) {
        toast.error("Please fill all the fields");
        return;

      }
      if (formData.amount > 9999999) {
        toast.error("Amount should be less than 9999999");
        return;
      }

      if (isEditMode) {
       
        await api.put(
          `/api/transactions/${selectedTransaction._id}`,
          formData
        );
        toast.success("Transaction updated successfully");
        closeModal();
        fetchTransactions();

        return;
      }
      console.log(import.meta.env.VITE_API_URL);
      await api.post(
        `/api/transactions/`,
        formData
      );
      closeModal();
      fetchTransactions();
      toast.success("Transaction added successfully");
    } catch (err) {
      console.log("Error adding transaction", err);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg w-[400px]  dark:bg-[#0C1017]">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          {isEditMode ? "Update Transaction" : "Add Transaction"}
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title "
            className="border p-2 rounded dark:bg-[#080B12] dark:placeholder:text-gray-400 dark:text-white"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 rounded dark:bg-[#080B12] dark:placeholder:text-gray-400 dark:text-white"
            min={1}
            max={9999999}
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />

          <select
            className="border p-2 rounded dark:bg-[#080B12] dark:text-gray-400"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="" >Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            className="border p-2 rounded dark:bg-[#080B12] dark:text-gray-400"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>

            {formData.type === "expense" ? (
              <>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Rent">Rent</option>
                <option value="Bills & Utilities">Bills & Utilities</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Travel">Travel</option>
                <option value="Technology">Technology</option>
                <option value="Gifts">Gifts</option>
                <option value="Other">Other</option>
              </>
            ) : (
              <>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Investments">Investments</option>
                <option value="Gifts">Gifts</option>
                <option value="Bonus">Bonus</option>
                <option value="Refund">Refund</option>
                <option value="Other">Other</option>
              </>
            )}
          </select>

          <input
            type="date"
            className="border p-2 rounded dark:bg-[#080B12] bg-white dark:text-gray-400 "
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <div className="flex items-center justify-between ">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-3 rounded cursor-pointer"
            >
              {isEditMode ? "Update" : "Add"}
            </button>
            <button
              type="button"
              className="bg-red-600 text-white py-2 px-3 rounded cursor-pointer"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
