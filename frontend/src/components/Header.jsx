import { Plus, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { AvatarDropdown } from "./Avatar";

export function Header({
  handleAddTransaction,
  user,
  setUser,
  title = "Dashboard",
  subtitle,
  onMobileMenuClick,
}) {
  return (
    <header className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-[#23252a]">
      {/* Title & Metadata */}
      <div className="flex items-center gap-3">
        {onMobileMenuClick && (
          <button
            onClick={onMobileMenuClick}
            aria-label="Open navigation menu"
            className="lg:hidden p-2 rounded-[8px] border border-[#23252a] bg-[#0f1011] text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#141516] transition cursor-pointer"
          >
            <Menu size={18} />
          </button>
        )}
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-semibold text-[#f7f8f8] tracking-[-0.6px]">
            {title}
          </h1>
          <p className="text-[13px] text-[#8a8f98] mt-0.5 tracking-[-0.05px]">
            {subtitle || (user?.username ? `Logged in as ${user.username}` : "Personal finance & liquidity tracker")}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Primary CTA (button-primary in Linear spec: #5e6ad2, rounded 8px, 14px text) */}
        {handleAddTransaction && (
          <button
            onClick={handleAddTransaction}
            className="bg-[#5e6ad2] hover:bg-[#828fff] active:bg-[#5e69d1] text-white text-[14px] font-medium leading-[1.2] px-[14px] py-[8px] rounded-[8px] transition duration-150 flex items-center gap-2 cursor-pointer shadow-none"
          >
            <Plus size={15} strokeWidth={2.4} />
            <span className="hidden sm:inline">Add Transaction</span>
            <span className="sm:hidden">Add</span>
          </button>
        )}

        {/* User Profile / Login */}
        {!user ? (
          <Link
            to="/login"
            className="bg-[#0f1011] hover:bg-[#141516] text-[#f7f8f8] text-[14px] font-medium leading-[1.2] px-[14px] py-[8px] rounded-[8px] border border-[#23252a] transition cursor-pointer"
          >
            Sign in
          </Link>
        ) : (
          <AvatarDropdown user={user} setUser={setUser} />
        )}
      </div>
    </header>
  );
}