import {
  Wallet,
  LayoutDashboard,
  ReceiptText,
  Plus,
  IndianRupee,
  X,
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
    <aside className="w-60 h-full bg-[#010102] border-r border-[#23252a] flex flex-col justify-between p-4 select-none">
      {/* Top section */}
      <div>
        {/* Brand header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#23252a]">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            {/* Linear brand mark: signature lavender-blue #5e6ad2 */}
            <div className="w-7 h-7 rounded-[6px] bg-[#5e6ad2] flex items-center justify-center text-white shrink-0">
              <Wallet size={15} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold tracking-[-0.4px] text-[#f7f8f8] group-hover:text-white transition">
                ExpenseFlow
              </span>
            </div>
          </Link>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 rounded-[6px] text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#0f1011] transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[13px] transition ${
                  isActive
                    ? "bg-[#141516] text-[#f7f8f8] font-medium border border-[#23252a]"
                    : "text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#0f1011]"
                }`}
              >
                <Icon
                  size={16}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className={isActive ? "text-[#5e6ad2]" : "text-[#8a8f98]"}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Add transaction quick action */}
          {handleAddTransaction && (
            <button
              onClick={() => {
                setMobileOpen(false);
                handleAddTransaction();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[13px] text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#0f1011] transition cursor-pointer text-left"
            >
              <Plus size={16} strokeWidth={1.8} className="text-[#8a8f98]" />
              <span>Add Transaction</span>
            </button>
          )}
        </nav>
      </div>

      {/* Bottom section: Linear Surface-1 Panel for Total Balance */}
      <div className="rounded-[12px] bg-[#0f1011] border border-[#23252a] p-4">
        <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.4px] text-[#8a8f98] mb-1.5">
          <span>Total Balance</span>
          <span className="w-2 h-2 rounded-full bg-[#27a644]" title="Active ledger" />
        </div>
        <div className="flex items-baseline gap-1 text-[20px] font-semibold text-[#f7f8f8] font-mono tracking-[-0.6px]">
          <IndianRupee size={17} className="text-[#8a8f98] self-center shrink-0" />
          <span>
            {Number(balance).toLocaleString("en-IN", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <p className="text-[11px] text-[#62666d] mt-1 tracking-[-0.05px]">
          Net cash position
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

      {/* Mobile Drawer with pure black overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#000000]/80 transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 animate-in slide-in-from-left duration-150">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
