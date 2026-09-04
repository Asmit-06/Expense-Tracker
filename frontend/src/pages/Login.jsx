import { Mail, Lock, Eye, EyeOff, Wallet, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import toast from "react-hot-toast";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", {
        email: email.trim(),
        password,
      });
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      toast.success("Welcome back");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
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
            Sign in to ExpenseFlow
          </h1>
          <p className="text-[13px] text-[#8a8f98] mt-1">
            Welcome back. Enter your credentials to continue.
          </p>
        </div>

        <form className="mt-6 space-y-3.5" onSubmit={handleLogin} autoComplete="off">
          {/* Email */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-[0.4px] text-[#8a8f98] mb-1 block">
              Email
            </label>
            <div className="relative flex items-center">
              <Mail size={15} className="absolute left-3 text-[#62666d] pointer-events-none" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-[8px] border border-[#23252a] focus:border-[#5e69d1] focus:ring-1 focus:ring-[#5e69d1] bg-[#141516] text-[13px] text-[#f7f8f8] placeholder-[#62666d] outline-none transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-medium uppercase tracking-[0.4px] text-[#8a8f98]">
                Password
              </label>
              <Link
                to="/forgotPassword"
                className="text-[11px] text-[#5e6ad2] hover:text-[#828fff]"
              >
                Forgot password?
              </Link>
            </div>
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

          {/* Submit CTA (Linear button-primary: #5e6ad2, rounded 8px) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-3.5 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] active:bg-[#5e69d1] text-white text-[14px] font-medium transition cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <span>{loading ? "Signing in..." : "Continue"}</span>
              {!loading && <ArrowRight size={14} strokeWidth={2.4} />}
            </button>
          </div>
        </form>

        <p className="text-center text-[12px] text-[#8a8f98] mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#5e6ad2] hover:text-[#828fff] font-medium"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
