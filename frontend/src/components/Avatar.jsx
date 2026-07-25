import { ChevronDown, LogOut, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import api from "../api/axios.js";
export function AvatarDropdown({ user, setUser }) {
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await api.patch("/api/auth/avatar", formData);
      console.log(res.data);
      setUser({
        ...user,
        avatar: res.data.avatar,
      });

      toast.success("Avatar updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleAvatarChange}
      />
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div className="w-11 h-11 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-lg">
              {user?.username?.charAt(0).toUpperCase()}
            </span>
          )}
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
        <div className="absolute right-0 mt-3 w-70 rounded-xl border border-gray-700 bg-[#10151F] shadow-2xl overflow-hidden z-50">
          {/* User Info */}
          <div className="px-5 py-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div
                onClick={() => fileInputRef.current.click()}
                className="cursor-pointer w-14 h-14 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center shrink-0"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-lg">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-white font-semibold">{user?.username}</h3>

                <p className="text-sm text-gray-400">{user?.email}</p>
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
