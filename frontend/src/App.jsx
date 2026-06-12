import { Toaster } from "react-hot-toast";
import { DashBoard } from "./pages/DashBoard";
import { TransactionPage } from "./pages/TransactionPage";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";
function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const location = useLocation();
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };
  return (
    <div className={darkMode ? "dark" : ""}>
      {location.pathname !== "/transactions" && (
        <button
          onClick={() => toggleTheme()}
          className="fixed top-8.5 right-70 z-50 bg-blue-500 text-white px-4 py-4 rounded-[80px] cursor-pointer"
          showViewAll={true}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      )}

      <Toaster />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/transactions" element={<TransactionPage />} />
      </Routes>
    </div>
  );
}

export default App;
