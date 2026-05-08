import { useState } from "react";
import axios from "axios";
export function AddTransactionModal({ closeModal, fetchTransactions }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "",
    date: "",
  });

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setFormData((prev)=>{
      return {...prev,[name]:value}
    })

    
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:3000/api/transactions", formData);
      closeModal();
      fetchTransactions();
    }catch(err){
      console.log("Error adding transaction", err);
    }
  }


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded"
            name="title"
            value = {formData.title}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 rounded"
            min={1}
            name="amount"
            value = {formData.amount}
            onChange={handleChange}
          />
          <select className="border p-2 rounded" name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          <select className="border p-2 rounded" name="type" value={formData.type} onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="date"
            className="border p-2 rounded"
            name="date"
            value = {formData.date}
            onChange={handleChange}
          />
          <div className="flex items-center justify-between ">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-3 rounded cursor-pointer"
            
            >
              Submit
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
