import { ChevronDown, LogOut, Camera, Mail } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export function AvatarDropdown({ user, setUser }) {
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    setUploading(true);
    const toastId = toast.loading("Uploading new avatar...");
    try {
      const res = await api.patch("/api/auth/avatar", formData);
      setUser({
        ...user,
        avatar: res.data.avatar,
      });
      toast.success("Avatar updated successfully!", { id: toastId });
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const initial = user?.username ? user.username.charAt(0).toUpperCase() : "U";

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleAvatarChange}
      />

      {/* Avatar Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/80 transition cursor-pointer"
        aria-label="User menu"
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm ring-2 ring-indigo-500/20 shadow-xs">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.username || "avatar"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{initial}</span>
          )}
        </div>

        <ChevronDown
          className={`text-slate-400 dark:text-slate-400 transition-transform duration-200 hidden sm:block ${
            open ? "rotate-180" : ""
          }`}
          size={16}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2.5 w-64 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User Info Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {/* Clickable avatar with hover camera icon */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-base cursor-pointer shrink-0 ring-2 ring-indigo-500/30"
                title="Click to change profile picture"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-full h-full object-cover group-hover:opacity-40 transition"
                  />
                ) : (
                  <span className="group-hover:opacity-40 transition">{initial}</span>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition">
                  <Camera size={16} className="text-white" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                  {user?.username || "Account"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1 mt-0.5">
                  <Mail size={12} className="shrink-0" />
                  <span className="truncate">{user?.email}</span>
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2.5 text-center">
              {uploading ? "Uploading photo..." : "Click avatar to change photo"}
            </p>
          </div>

          {/* Action List */}
          <div className="p-1.5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition cursor-pointer text-left"
            >
              <LogOut size={16} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
