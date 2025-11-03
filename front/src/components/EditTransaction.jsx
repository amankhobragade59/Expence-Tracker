import React, { useEffect, useState } from "react";
import { useTransactionStore } from "../store/useTransactionStore.js";
import {useParams} from 'react-router-dom'
const EditTransaction = () => {
  const {id} = useParams();
  const {updateTransaction,isEditing,getTransaction} = useTransactionStore();
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    description: "",
    category: "",
    date: "",
  });

  useEffect(()=>{
    const fetchData = async (id)=>{
      const data = await getTransaction(id);
      setFormData({
          type: data.type || "",
          amount: data.amount || "",
          description: data.description || "",
          category: data.category || "",
          date: data.date?.split("T")[0] || "", // if date is ISO string
        });
    }
    fetchData(id);
  },[id]);

  


  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.type || !formData.amount || !formData.description || !formData.category) {
      alert("All fields are required!");
      return;
    }
    updateTransaction(id,formData);
    // reset form
    setFormData({
      type: "",
      amount: "",
      description: "",
      category: "",
      date: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-700">
      <div className="bg-zinc-800 shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Edit Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-white font-medium mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border bg-zinc-800 border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-white font-medium mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-white font-medium mb-1">Type</label>
            <select
              name="category"              
              value={formData.category}
              onChange={handleChange}
              className="w-full border bg-zinc-800 border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              <option value="salary">Salary</option>
              <option value="gloceries">Gloceries</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-white font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            disabled={isEditing}
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
           {isEditing
           ?<>Submitting...</>:<>Update</>} 
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;
