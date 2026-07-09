import { ChevronDown, LogOut, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function AvatarDropdown({ user}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    toast.success("Logged out successfully");
    navigate("/login");
  }

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
          {user?.username?.charAt(0).toUpperCase()}
        </div>

        <ChevronDown
          className={`text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          size={18}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 rounded-xl border border-gray-700 bg-[#10151F] shadow-2xl overflow-hidden z-50">

          {/* User Info */}
          <div className="px-5 py-4 border-b border-gray-700">
            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                {user?.username?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3 className="text-white font-semibold">
                  {user?.username}
                </h3>

                <p className="text-sm text-gray-400">
                  {user?.email}
                </p>
              </div>

            </div>
          </div>


          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-3 text-red-400 hover:bg-red-500/10 transition cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      )}
    </div>
  );
}