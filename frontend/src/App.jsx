// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import FarmerDashboard from "./pages/FarmerDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import Home from "./HomeComp/Home";
import Ai from "./Farmers/Ai"
import Navbar from "./HomeComp/Navbar";
// Protected route component
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && role !== allowedRole) {
    // Redirect to the appropriate dashboard based on role
    return (
      <Navigate
        to={role === "user" ? "/farmer-dashboard" : "/agent-dashboard"}
      />
    );
  }

  return children;
};

const App = () => {
  return (
    
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />

        {/* Dashboard Routes */}
        <Route
          path="/farmer-dashboard"
          element={
            <ProtectedRoute allowedRole="user">
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
      <Route path="/personalised-ai" element={<Ai />} />
        {/* Default Route */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
