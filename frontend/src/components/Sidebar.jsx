import {
  Wallet,
  LayoutDashboard,
  ReceiptText,
  PlusCircle,
  IndianRupee,
  X,
  Sparkles,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar({
  balance = 0,
  handleAddTransaction,
  mobileOpen = false,
  setMobileOpen = () => {},
}) {
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: ReceiptText,
    },
  ];

  const content = (
    <aside className="w-64 h-full bg-white dark:bg-[#0f1523] border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between p-5 transition-colors duration-200 select-none">
      {/* Top section: Brand Logo & Navigation */}
      <div>
        {/* Brand header */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800/80">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/25 group-hover:scale-105 transition">
              <Wallet className="w-5 h-5 text-white" strokeWidth={2.4} />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                ExpenseFlow
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Finance Hub
              </span>
            </div>
          </Link>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.3 : 2}
                  className={isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400"}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Add Transaction quick trigger */}
          {handleAddTransaction && (
            <button
              onClick={() => {
                setMobileOpen(false);
                handleAddTransaction();
              }}
              className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm text-slate-600 dark:text-slate-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer text-left"
            >
              <PlusCircle size={19} strokeWidth={2} className="text-slate-500 dark:text-slate-400" />
              <span>Add Transaction</span>
            </button>
          )}
        </nav>
      </div>

      {/* Bottom section: Modern Balance Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-4.5 text-white shadow-lg shadow-indigo-600/15">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200 flex items-center gap-1.5">
            <Sparkles size={13} className="text-indigo-300" /> Total Balance
          </span>
          <div className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center">
            <Wallet size={13} className="text-white" />
          </div>
        </div>
        <div className="flex items-baseline gap-1 mt-1">
          <IndianRupee size={20} strokeWidth={2.4} className="text-white/90" />
          <span className="text-2xl font-black tracking-tight">
            {Number(balance).toLocaleString("en-IN", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <p className="text-[11px] font-medium text-indigo-200/80 mt-1">
          Net income minus expenses
        </p>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block h-screen sticky top-0 shrink-0">
        {content}
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
