// AuthContext.js
import React, { createContext, useContext, useState } from "react";

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your application and provide authentication context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to handle login
  const login = (userData) => {
    // Perform login logic here (e.g., send request to server, update state)
    setUser(userData);
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
  };

  // Function to check if user is authenticated
  const isAuthenticated = () => {
    // Check if user is logged in (e.g., check user state)
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
