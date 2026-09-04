import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import toast from "react-hot-toast";
import { Lock, Eye, EyeOff, Wallet, ArrowRight } from "lucide-react";

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handlePassSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Invalid reset link");
      return;
    }
    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await api.post(`/api/auth/reset-password/${token}`, {
        password,
      });
      toast.success("Password updated successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset link expired or invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#010102] text-[#f7f8f8]">
      <div className="w-full max-w-sm rounded-[12px] bg-[#0f1011] border border-[#23252a] p-7 sm:p-8">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-[6px] bg-[#5e6ad2] flex items-center justify-center text-white mb-3">
            <Wallet size={17} strokeWidth={2.4} />
          </div>
          <h1 className="text-[20px] font-semibold tracking-[-0.6px] text-[#f7f8f8]">
            Set new password
          </h1>
          <p className="text-[13px] text-[#8a8f98] mt-1">
            Choose a new security credential for your account
          </p>
        </div>

        <form className="mt-6 space-y-3.5" onSubmit={handlePassSubmit} autoComplete="off">
          {/* New Password */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-[0.4px] text-[#8a8f98] mb-1 block">
              New Password (min 6 chars)
            </label>
            <div className="relative flex items-center">
              <Lock size={15} className="absolute left-3 text-[#62666d] pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-8 pr-8 py-2 rounded-[8px] border border-[#23252a] focus:border-[#5e69d1] focus:ring-1 focus:ring-[#5e69d1] bg-[#141516] text-[13px] text-[#f7f8f8] placeholder-[#62666d] outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 text-[#62666d] hover:text-[#8a8f98] cursor-pointer"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-[0.4px] text-[#8a8f98] mb-1 block">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <Lock size={15} className="absolute left-3 text-[#62666d] pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-[8px] border border-[#23252a] focus:border-[#5e69d1] focus:ring-1 focus:ring-[#5e69d1] bg-[#141516] text-[13px] text-[#f7f8f8] placeholder-[#62666d] outline-none transition"
              />
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-3.5 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] active:bg-[#5e69d1] text-white text-[14px] font-medium transition cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <span>{loading ? "Updating..." : "Save password"}</span>
              {!loading && <ArrowRight size={14} strokeWidth={2.4} />}
            </button>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="text-[12px] text-[#8a8f98] hover:text-[#f7f8f8] transition"
            >
              Cancel and return to sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
