import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to handle user login
  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8090/api/login", {
        username,
        password,
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      await axios.post("http://localhost:8090/api/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
