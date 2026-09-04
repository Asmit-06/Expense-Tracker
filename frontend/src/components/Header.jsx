import { Plus, Sun, Moon, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { AvatarDropdown } from "./Avatar";
import { useTheme } from "../context/ThemeContext";

export function Header({
  handleAddTransaction,
  user,
  setUser,
  title = "Dashboard",
  subtitle,
  onMobileMenuClick,
}) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="flex items-center gap-3">
        {onMobileMenuClick && (
          <button
            onClick={onMobileMenuClick}
            aria-label="Open navigation menu"
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <Menu size={20} />
          </button>
        )}
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
            {subtitle || (user?.username ? `Welcome back, ${user.username} 👋` : "Track and optimize your cash flow")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        {/* Dark/Light Mode Switcher */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition shadow-xs cursor-pointer"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? (
            <Sun size={19} className="text-amber-400 transition-transform rotate-0 hover:rotate-45 duration-300" />
          ) : (
            <Moon size={19} className="text-slate-700 transition-transform rotate-0 hover:-rotate-12 duration-300" />
          )}
        </button>

        {/* Add Transaction Primary CTA */}
        {handleAddTransaction && (
          <button
            onClick={handleAddTransaction}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-indigo-500/25 active:scale-[0.98] transition cursor-pointer"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>Add Transaction</span>
          </button>
        )}

        {/* User Profile / Login */}
        {!user ? (
          <Link
            to="/login"
            className="inline-flex items-center text-sm font-semibold px-4 py-2.5 rounded-xl border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-500 dark:hover:text-white transition cursor-pointer"
          >
            Sign In
          </Link>
        ) : (
          <AvatarDropdown user={user} setUser={setUser} />
        )}
      </div>
    </header>
  );
}