import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { checkAuth } from "services/auth";

// Create context
const AuthContext = createContext();

// Custom hook to access context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // Stores logged-in user info
  const [loading, setLoading] = useState(true); // Show loading during auth check

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const res = await checkAuth();
        if (res?.success) {
          setUser(res.userData);
        }
        else if(res?.error?.msg && res?.error?.msg!=="Not logged in") {
            toast.error("Your session has expired please re-login")
        }
        else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthStatus();
  }, []);


  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
