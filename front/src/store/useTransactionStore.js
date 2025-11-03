import { create } from "zustand";
import axiosInstance from "../api/axios.js";
import toast from "react-hot-toast";
export const useTransactionStore = create((set, get) => ({
  transactions: [],
  summary: { income: 0, expenses: 0, balance: 0 },
  filters: { type: "", category: "", date: "" },
  loading: false,
  error: null,
  isEditing: false,
  isAdding: false,

  // 🔹 Fetch all transactions (with filters)
  fetchTransactions: async () => {
    const { filters } = get();
    set({ loading: true, error: null });

    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axiosInstance.get(`/transaction?${query}`);
      const data = res.data.allTransactions;

      // Calculate summary
      let income = 0;
      let expenses = 0;
      data.forEach((t) => {
        if (t.type === "income") income += t.amount;
        else if (t.type === "expense") expenses += t.amount;
      });

      set({
        transactions: data,
        summary: {
          income,
          expenses,
          balance: income - expenses,
        },
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      set({ loading: false, error: error.message });
    }
  },
  getTransaction: async (id) => {
    try {
      const res = await axiosInstance.get(`/transaction/${id}`)
      return res.data.transaction;
    } catch (error) {
      console.error(error);
    }
  },

  // 🔹 Add a new transaction
  addTransaction: async (transaction) => {
    try {
      set({ isAdding: true });
      const res = await axiosInstance.post("/transaction/add", transaction);
      const newTransaction = res.data.transaction;
      toast.success("New transaction added");

      // Recalculate summary
      get().fetchTransactions();
    } catch (error) {
      console.error("Error adding transaction:", error);
    } finally {
      set({ isAdding: false });
    }
  },

  updateTransaction: async (id, transaction) => {
    try {
      const res = await axiosInstance.put(`/transaction/update/${id}`, transaction);
      toast.success("Transaction updated successfully");

      // Recalculate summary
      get().fetchTransactions();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  },

  deleteTransaction: async (id) => {
    try {
      setTimeout(
        async () => {
          const res = await axiosInstance.delete(`/transaction/delete/${id}`);
          const deletedTransaction = res.data.transaction;

          toast.success(`${deletedTransaction.category} transaction deleted`);

          // Recalculate summary
          get().fetchTransactions();
        },2000);
    } catch (error) {
      console.error("Error adding transaction:", error);
    } 
  },

  // 🔹 Update filters
  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },
}));
