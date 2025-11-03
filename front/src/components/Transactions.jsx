import React, { useEffect, useState } from "react";
import { useTransactionStore } from '../store/useTransactionStore.js'
import { useNavigate } from 'react-router-dom'
import IncomeExpenceChart from '../components/IncomeExpenceChart.jsx'
import {useAuthStore} from '../store/useAuthStore.js'
const Transactions = () => {
  const [show, setShow] = useState(false);
  const {
    transactions,
    summary,
    filters,
    loading,
    setFilters,
    fetchTransactions,
    deleteTransaction,
  } = useTransactionStore();

  const {logoutUser,isLoggingOut}= useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const handleDelete = (id) => {
    let sure = confirm("Are you sure to delete");
    if (!sure) return;
    try {
      deleteTransaction(id);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteId(null);
    }
  }
  const handleLogout = () =>{
    let sure = confirm("Are you sure to logout");
    if(sure){
    logoutUser();
    }
  }

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;a
    setFilters({ ...filters, [name]: value });
  };  

  return (

    <div className="min-h-screen bg-zinc-700 p-6">
      <div className="flex justify-center items-center">
        <div className="text-3xl w-[60%] flex gap-1 justify-center items-baseline font-semibold text-center text-white mb-8">
          <p>Transactions Summary</p>
          <p
            onClick={() => setShow(!show)}
            className=" text-yellow-500 text-xl rounded-lg cursor-pointer underline transition"
          >
            {show ? <>hide chart</> : <>show chart</>}
          </p>
        </div>
        <button onClick={handleLogout} className="bg-red-800 px-3 py-2 text-lg text-white rounded-lg cursor-pointer">
          {isLoggingOut ? <>Logout..</>:<>Logout</>}
        </button>
      </div>

      {show && <IncomeExpenceChart transactions={transactions} />}
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
        <div className="bg-green-100 p-4 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-medium text-green-700">Total Income</h3>
          <p className="text-2xl font-bold text-green-800">₹{summary.income}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-medium text-red-700">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-800">₹{summary.expenses}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-medium text-blue-700">Balance</h3>
          <p className="text-2xl font-bold text-blue-800">₹{summary.balance}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-zinc-800 p-5 rounded-xl shadow-md max-w-4xl mx-auto mb-6 flex flex-wrap gap-4 justify-center">
        <select
          name="type"
          value={filters.type}
          onChange={(e) => setFilters({ type: e.target.value })}
          className="border bg-zinc-800 border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          name="category"
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value })}
          className="border bg-zinc-800 border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="salary">Salary</option>
          <option value="gloceries">Gloceries</option>
          <option value="entertainment">Entertainment</option>
        </select>

        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={(e) => setFilters({ date: e.target.value })}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => setFilters({ type: "", category: "", date: "" })}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Clear
        </button>

        <button
          onClick={() => navigate("/add-transaction")}
          className="bg-green-800 text-green-400 font-bold px-4 py-2 rounded-lg hover:bg-green-900 cursor-pointer transition"
        >
          Add Transaction
        </button>
      </div>

      {/* Transaction List */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900 border-b-2">
            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-right">Amount</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-700 text-white">
            {loading
              ? (<tr><td colSpan="6" className="py-4 text-center text-white">Loading....</td></tr>)
              :
              (transactions.length > 0 ? (
                transactions.map((t) => (
                  <tr
                    key={t._id}
                    className="border-b hover:bg-zinc-800 transition duration-200"
                  >
                    <td className="py-3 px-4">{new Date(t.date).toLocaleDateString()}</td>
                    <td
                      className={` font-medium ${t.type === "income" ? "text-green-400 " : "text-red-400 "
                        }`}
                    >
                      {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                    </td>
                    <td className="py-3 px-4">{t.category}</td>
                    <td className="py-3 px-4">{t.description}</td>
                    <td className="py-3 px-4 text-right">₹{t.amount}</td>
                    <td className="py-3 px-4 flex justify-center items-center gap-1">
                      <button
                        onClick={() => handleDelete(t._id)}
                        className=" text-white bg-rose-700 px-4 py-2 rounded-lg hover:bg-rose-900 cursor-pointer transition"
                      >Delete</button>

                      <button
                        onClick={() => navigate(`/edit/${t._id}`)}
                        className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-900 cursor-pointer transition"
                      >Edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-white">
                    No transactions found
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
