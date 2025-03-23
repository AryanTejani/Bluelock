import { createContext, useState, useEffect } from "react";
import { authService } from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await authService.getCurrentUser();
          setUser(data.data);
        } catch (err) {
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // src/context/AuthContext.jsx (update the login method)

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await authService.login(credentials);

      if (data.notVerified) {
        localStorage.setItem("tempEmail", credentials.email);
        navigate("/verify-otp");
        return { notVerified: true };
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      const userData = await authService.getCurrentUser();
      setUser(userData.data.data);

      return { success: true, role: data.role };
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      // Make sure the role is included in the signup request
      const { data } = await authService.signup(userData);
      localStorage.setItem("tempEmail", userData.email);
      localStorage.setItem("tempRole", userData.role); // Store role for later use
      return { success: true };
    } catch (err) {
      console.error("Signup error:", err);
      const errorMessage = err.response?.data?.message || "Signup failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login");
  };

  const requestOtp = async (email) => {
    try {
      setLoading(true);
      await authService.getOtp({ emailId: email });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Failed to send OTP",
      };
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp) => {
    try {
      setLoading(true);
      const { data } = await authService.verifyOtp({ userOtp: otp });
      return { success: data.success };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "OTP verification failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      const { data } = await authService.forgotPassword(email);
      return { success: data.status };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Failed to process request",
      };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, passwords) => {
    try {
      setLoading(true);
      const { data } = await authService.resetPassword(token, passwords);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Password reset failed",
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        requestOtp,
        verifyOtp,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
