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

  // Close dropdown on click outside
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
    toast.success("Signed out");
    navigate("/login");
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File exceeds 5MB limit");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    setUploading(true);
    const toastId = toast.loading("Updating avatar...");
    try {
      const res = await api.patch("/api/auth/avatar", formData);
      setUser({
        ...user,
        avatar: res.data.avatar,
      });
      toast.success("Avatar updated", { id: toastId });
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
        className="flex items-center gap-2 p-1 rounded-[8px] hover:bg-[#0f1011] transition cursor-pointer"
        aria-label="User menu"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#18191a] border border-[#23252a] hover:border-[#5e6ad2] flex items-center justify-center text-[#f7f8f8] font-medium text-[12px] transition">
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
          className={`text-[#8a8f98] transition-transform duration-150 hidden sm:block ${
            open ? "rotate-180 text-[#f7f8f8]" : ""
          }`}
          size={14}
        />
      </button>

      {/* Dropdown Menu - Surface-2 #141516 */}
      {open && (
        <div className="absolute right-0 mt-2 w-60 rounded-[8px] border border-[#23252a] bg-[#141516] shadow-xl overflow-hidden z-50 animate-in fade-in duration-100">
          {/* User Info Header */}
          <div className="p-3.5 border-b border-[#23252a]">
            <div className="flex items-center gap-2.5">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative w-10 h-10 rounded-full overflow-hidden bg-[#18191a] border border-[#23252a] flex items-center justify-center text-[#f7f8f8] font-medium text-xs cursor-pointer shrink-0"
                title="Change avatar"
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
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#000000]/60 transition">
                  <Camera size={13} className="text-[#f7f8f8]" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-[13px] text-[#f7f8f8] truncate">
                  {user?.username || "Account"}
                </h3>
                <p className="text-[11px] text-[#8a8f98] truncate flex items-center gap-1 mt-0.5">
                  <Mail size={11} className="shrink-0 text-[#62666d]" />
                  <span className="truncate">{user?.email}</span>
                </p>
              </div>
            </div>
            <p className="text-[10px] text-[#62666d] mt-2 text-center">
              {uploading ? "Uploading..." : "Click photo to change"}
            </p>
          </div>

          {/* Action List */}
          <div className="p-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-medium text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#18191a] rounded-[6px] transition cursor-pointer text-left"
            >
              <LogOut size={14} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
