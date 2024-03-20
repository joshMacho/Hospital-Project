import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("currentuser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to handle user login
  const login = async (username, password) => {
    try {
      await axios
        .post(
          "http://localhost:8090/api/login",
          {
            username,
            password,
          },
          { withCredentials: true }
        )
        .then((response) => {
          setUser(response.data);
          console.log(response.data);
          console.log("first sign in - ", response.data.firstSignIn);
          localStorage.setItem("currentuser", JSON.stringify(response.data));
        });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      //await axios.post("http://localhost:8090/api/logout");
      setUser(null);
      localStorage.removeItem("currentuser");
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

//export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};
