import { useEffect, useState } from "react";
import { TransactionTable } from "../components/TransactionTable";
import { AddTransactionModal } from "../components/AddTransactionModal";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import {
  Search,
  X,
  Filter,
  IndianRupee,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import api from "../api/axios.js";
import toast from "react-hot-toast";

export function TransactionPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // all | income | expense
  const [categoryFilter, setCategoryFilter] = useState("all");

  const fetchUser = async () => {
    try {
      const res = await api.get("/api/auth/me");
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/api/transactions");
      setTransactions(res.data.data || []);
    } catch (err) {
      console.error("Error fetching transactions", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchUser();
  }, []);

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsOpen(true);
  };

  const handleAddTransaction = () => {
    setSelectedTransaction(null);
    setIsOpen(true);
  };

  const deleteTransaction = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;

    try {
      await api.delete(`/api/transactions/${id}`);
      fetchTransactions();
      toast.success("Transaction deleted successfully");
    } catch (err) {
      console.error("Error deleting transaction", err);
    }
  };

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const balance = totalIncome - totalExpense;

  // Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      typeFilter === "all" ? true : t.type === typeFilter;
    const matchesCategory =
      categoryFilter === "all" ? true : t.category === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  // Extract all unique categories
  const allCategories = Array.from(
    new Set(transactions.map((t) => t.category).filter(Boolean))
  );

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#0b0f19] transition-colors duration-200">
      <Sidebar
        handleAddTransaction={handleAddTransaction}
        balance={balance}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="flex-1 min-w-0 py-6 px-4 sm:px-8 lg:px-10 overflow-y-auto max-w-7xl mx-auto">
        <Header
          title="Transactions"
          subtitle="Explore, filter, and manage your full transaction history"
          handleAddTransaction={handleAddTransaction}
          user={user}
          setUser={setUser}
          onMobileMenuClick={() => setMobileOpen(true)}
        />

        {/* Filter & Search Bar Toolbar */}
        <div className="my-6 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search transactions by title or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xs transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Type & Category Filters */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Type segmented pills */}
              <div className="flex items-center p-1 rounded-xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <button
                  onClick={() => setTypeFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    typeFilter === "all"
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setTypeFilter("expense")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    typeFilter === "expense"
                      ? "bg-rose-600 text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-rose-600"
                  }`}
                >
                  Expenses
                </button>
                <button
                  onClick={() => setTypeFilter("income")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    typeFilter === "income"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-emerald-600"
                  }`}
                >
                  Income
                </button>
              </div>

              {/* Category selector */}
              {allCategories.length > 0 && (
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 outline-none focus:border-indigo-500 shadow-xs cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {allCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <Filter
                    size={13}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Filter results count & summary badges */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>
              Showing <strong className="text-slate-900 dark:text-white">{filteredTransactions.length}</strong> of{" "}
              {transactions.length} transactions
            </span>

            {(search || typeFilter !== "all" || categoryFilter !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setTypeFilter("all");
                  setCategoryFilter("all");
                }}
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Transactions Table */}
        <TransactionTable
          transactions={filteredTransactions}
          showViewAll={false}
          deleteTransaction={deleteTransaction}
          handleEdit={handleEdit}
          onAddTransaction={handleAddTransaction}
        />

        {isOpen && (
          <AddTransactionModal
            selectedTransaction={selectedTransaction}
            fetchTransactions={fetchTransactions}
            closeModal={() => {
              setIsOpen(false);
              setSelectedTransaction(null);
            }}
          />
        )}
      </main>
    </div>
  );
}
