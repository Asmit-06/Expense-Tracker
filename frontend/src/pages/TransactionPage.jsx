import { useEffect, useState } from "react";
import { TransactionTable } from "../components/TransactionTable";
import { AddTransactionModal } from "../components/AddTransactionModal";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Search, X, Filter } from "lucide-react";
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
  const [typeFilter, setTypeFilter] = useState("all");
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
      toast.success("Transaction deleted");
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

  const allCategories = Array.from(
    new Set(transactions.map((t) => t.category).filter(Boolean))
  );

  return (
    <div className="min-h-screen flex bg-[#010102] text-[#f7f8f8]">
      <Sidebar
        handleAddTransaction={handleAddTransaction}
        balance={balance}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="flex-1 min-w-0 py-6 px-4 sm:px-8 lg:px-10 overflow-y-auto max-w-7xl mx-auto">
        <Header
          title="Transactions"
          subtitle="Full activity register and filterable records"
          handleAddTransaction={handleAddTransaction}
          user={user}
          setUser={setUser}
          onMobileMenuClick={() => setMobileOpen(true)}
        />

        {/* Linear Toolbar */}
        <div className="my-5 space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input (Linear surface-1) */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8f98] pointer-events-none"
              />
              <input
                type="text"
                placeholder="Filter by description or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-8 py-1.5 rounded-[8px] border border-[#23252a] focus:border-[#5e69d1] focus:ring-1 focus:ring-[#5e69d1] bg-[#0f1011] text-[13px] text-[#f7f8f8] placeholder-[#62666d] outline-none transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a8f98] hover:text-[#f7f8f8]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Linear Pill Tabs (pricing-tab-default & pricing-tab-selected) */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center p-0.5 rounded-full bg-[#0f1011] border border-[#23252a]">
                <button
                  onClick={() => setTypeFilter("all")}
                  className={`px-3 py-1 rounded-full text-[12px] font-medium transition cursor-pointer ${
                    typeFilter === "all"
                      ? "bg-[#141516] text-[#f7f8f8] border border-[#34343a]"
                      : "text-[#8a8f98] hover:text-[#f7f8f8]"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setTypeFilter("expense")}
                  className={`px-3 py-1 rounded-full text-[12px] font-medium transition cursor-pointer ${
                    typeFilter === "expense"
                      ? "bg-[#141516] text-[#eb5757] border border-[#34343a]"
                      : "text-[#8a8f98] hover:text-[#eb5757]"
                  }`}
                >
                  Expenses
                </button>
                <button
                  onClick={() => setTypeFilter("income")}
                  className={`px-3 py-1 rounded-full text-[12px] font-medium transition cursor-pointer ${
                    typeFilter === "income"
                      ? "bg-[#141516] text-[#27a644] border border-[#34343a]"
                      : "text-[#8a8f98] hover:text-[#27a644]"
                  }`}
                >
                  Income
                </button>
              </div>

              {/* Category Dropdown */}
              {allCategories.length > 0 && (
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="appearance-none pl-3 pr-7 py-1 rounded-[8px] text-[12px] font-medium bg-[#0f1011] border border-[#23252a] text-[#d0d6e0] outline-none focus:border-[#5e69d1] cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {allCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <Filter
                    size={11}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a8f98] pointer-events-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Results count indicator */}
          <div className="flex items-center justify-between text-[12px] text-[#8a8f98] px-1 font-mono">
            <span>
              Showing <strong className="text-[#f7f8f8]">{filteredTransactions.length}</strong> of{" "}
              {transactions.length} entries
            </span>

            {(search || typeFilter !== "all" || categoryFilter !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setTypeFilter("all");
                  setCategoryFilter("all");
                }}
                className="text-[#5e6ad2] hover:text-[#828fff] text-[12px] font-medium cursor-pointer"
              >
                Reset filters
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
