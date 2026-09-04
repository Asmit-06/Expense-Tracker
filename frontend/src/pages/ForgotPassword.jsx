import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import toast from "react-hot-toast";
import { Mail, Wallet, ArrowLeft, ArrowRight } from "lucide-react";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      await api.post("/api/auth/forgot-password", {
        email: email.trim(),
      });
      setSent(true);
      toast.success("Recovery link dispatched");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset email");
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
            Reset password
          </h1>
          <p className="text-[13px] text-[#8a8f98] mt-1">
            Enter your email to receive recovery instructions
          </p>
        </div>

        {sent ? (
          <div className="mt-6 text-center space-y-4">
            <div className="p-3 rounded-[8px] bg-[#141516] border border-[#23252a] text-[#27a644] text-[13px]">
              A password reset link has been sent to <strong>{email}</strong>.
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#5e6ad2] hover:text-[#828fff]"
            >
              <ArrowLeft size={14} /> Back to sign in
            </Link>
          </div>
        ) : (
          <form className="mt-6 space-y-3.5" onSubmit={handleSubmit} autoComplete="off">
            <div>
              <label className="text-[11px] font-medium uppercase tracking-[0.4px] text-[#8a8f98] mb-1 block">
                Account Email
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

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-3.5 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] active:bg-[#5e69d1] text-white text-[14px] font-medium transition cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <span>{loading ? "Sending..." : "Send link"}</span>
                {!loading && <ArrowRight size={14} strokeWidth={2.4} />}
              </button>
            </div>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1 text-[12px] text-[#8a8f98] hover:text-[#f7f8f8] transition"
              >
                <ArrowLeft size={13} /> Back to sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
