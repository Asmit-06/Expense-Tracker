import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../api/axios.js"
import toast from "react-hot-toast";
export function ResetPassword() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const {token} = useParams()
  if (!token) {
    toast.error("Invalid reset link");
    return;
  }
  const navigate = useNavigate()
  const handlePassSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true)
    if(!password1 || !password2){
      toast.error("Please Enter Password");
      setLoading(false)
      return
    }
    if(password1.length<6 || password2.length<6){
      toast.error("Password must be of minimum 6 Characters")
      setLoading(false)
      return 
    }
    if(password1 !== password2){
      toast.error("Both the Password Must Match")
      setLoading(false)
      return 
    }
    try{
      await api.post(`/api/auth/reset-password/${token}`,{
        password:password1
      })
      toast.success("Password reset successfully!");
      setPassword1("")
      setPassword2("")
      setTimeout(()=>{
        navigate("/login");
      },1500)
      
    }catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
 
  return (
    <div className="min-h-screen bg-[#06070c] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#10151F] rounded-2xl shadow-xl border border-gray-800 p-8">
        <h1 className="text-3xl font-bold text-white text-center">
          Expense Tracker
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Welcome Enter New Password
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={handlePassSubmit}
          autoComplete="off"
        >
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              New Password
            </label>

            <div className="flex items-center border border-gray-700 rounded-lg px-3 bg-[#181E29] mb-4">
              <input
                 required
                type="password"
                placeholder="Enter new Password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                className="w-full px-3 py-3 bg-transparent outline-none text-white"
              />
            </div>

            <label className="text-sm text-gray-300 mb-2 block">
              Confirm Password
            </label>

            <div className="flex items-center border border-gray-700 rounded-lg px-3 bg-[#181E29] mb-4">
              <input
              required
                type="password"
                placeholder="Confirm new Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
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
              {loading ? "Submitting.." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
