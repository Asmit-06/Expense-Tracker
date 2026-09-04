import { Toaster } from "react-hot-toast";
import { DashBoard } from "./pages/DashBoard";
import { TransactionPage } from "./pages/TransactionPage";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";

function App() {
  return (
    <div className="min-h-screen bg-[#010102] text-[#f7f8f8] selection:bg-[#5e6ad2]/30 selection:text-white">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#0f1011",
            color: "#f7f8f8",
            border: "1px solid #23252a",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 500,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
          },
          success: {
            iconTheme: {
              primary: "#27a644",
              secondary: "#0f1011",
            },
          },
          error: {
            iconTheme: {
              primary: "#eb5757",
              secondary: "#0f1011",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><TransactionPage /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/forgotPassword" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/reset-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />
      </Routes>
    </div>
  );
}

export default App;
