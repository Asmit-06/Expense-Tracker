import { Mail, Lock, Eye } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js"
import toast from "react-hot-toast";
export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res =await api.post("/api/auth/login",{
        email,
        password
      })
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken",res.data.refreshToken)
      toast.success("Login successful!");
      navigate("/");
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
          Welcome back! Sign in to continue.
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={handleLogin}
          autoComplete="off"
        >
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

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Password</label>

            <div className="flex items-center border border-gray-700 rounded-lg px-3 bg-[#181E29]">
              <Lock size={18} className="text-gray-400" />

              <input
                type={showPassword?"text":"password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-3 bg-transparent outline-none text-white"
              />

              <Eye size={18} className="text-gray-400 cursor-pointer" onClick={()=>setShowPassword(!showPassword)} />
            </div>
          </div>

          <div className="flex justify-end text-sm">
            

            <button type="button" className="text-blue-500 hover:text-blue-400" >
              <Link to="/forgotPassword" >Forgot Password?</Link>
         
            </button>
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-400 font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
