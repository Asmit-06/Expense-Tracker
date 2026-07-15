import { Toaster } from "react-hot-toast";
import { DashBoard } from "./pages/DashBoard";
import { TransactionPage } from "./pages/TransactionPage";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";
import {Login} from "./pages/Login"
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { ForgotPassword } from "./pages/ForgotPassword";
function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const location = useLocation();
  const hideThemeButton = [
    "/login",
    "/register",
    "/forgotPassword"
  ].includes(location.pathname);
 
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };
  return (
    <div className={darkMode ? "dark" : ""}>
      {location.pathname !== "/transactions" && !hideThemeButton && (
        <button
          onClick={() => toggleTheme()}
          className="absolute top-8.5 right-100 z-50 bg-blue-500 text-white px-4 py-4 rounded-[80px] cursor-pointer"
          showViewAll={true}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      )}

      <Toaster />
      <Routes>
        <Route path="/" element={<ProtectedRoute><DashBoard/></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><TransactionPage/></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register/></PublicRoute>} />
        <Route path="/forgotPassword" element={<PublicRoute><ForgotPassword/></PublicRoute>} />
      </Routes>
    </div>
  );
}

export default App;
