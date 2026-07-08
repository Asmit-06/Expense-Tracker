import { User, Mail, Lock, Eye } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!username || !email || !password) {
      toast.error("Please fill all fields");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          username,
          email:email.trim(),
          password,
        }
      );

      localStorage.setItem("token", res.data.accessToken);
      toast.success("Account created successfully!");

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#06070c] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#10151F] rounded-2xl shadow-xl border border-gray-800 p-8">
        <h1 className="text-3xl font-bold text-white text-center">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Join Expense Tracker and manage your finances.
        </p>

        <form
          className="mt-8 space-y-5"
          autoComplete="off"
          onSubmit={handleRegister}
        >
          {/* Username */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Username</label>

            <div className="flex items-center border border-gray-700 rounded-lg px-3 bg-[#181E29]">
              <User size={18} className="text-gray-400" />

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-3 bg-transparent outline-none text-white"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Email</label>

            <div className="flex items-center border border-gray-700 rounded-lg px-3 bg-[#181E29]">
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 bg-transparent outline-none text-white"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Password</label>

            <div className="flex items-center border border-gray-700 rounded-lg px-3 bg-[#181E29]">
              <Lock size={18} className="text-gray-400" />

              <input
                type={showPassword ? "text":"password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-3 bg-transparent outline-none text-white"
              />

              <Eye size={18} className="text-gray-400 cursor-pointer" onClick={()=>setShowPassword(!showPassword)} />
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold text-white transition
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              }`}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-400 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
