import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      toast.error("Please enter your email");
      setLoading(false);
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        {
          email,
        }
      );
      toast.success("Reset link sent to your email.");
      setEmail("");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#06070c] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#10151F] rounded-2xl shadow-xl border border-gray-800 p-8">
        <h1 className="text-3xl font-bold text-white text-center">
          Expense Tracker
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Welcome Enter Your Email
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Email</label>

            <div className="flex items-center border border-gray-700 rounded-lg px-3 bg-[#181E29] mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 bg-transparent outline-none text-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition
    ${
      loading
        ? "bg-blue-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
    }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
