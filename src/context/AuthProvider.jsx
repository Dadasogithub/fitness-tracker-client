import React from "react";
import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // On initial load, fetch user if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const { data } = await axios.get("http://localhost:5000/api/v1/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(data.user); // assuming { user: { email, name, ... } }
        } catch (err) {
          console.error("Failed to fetch user:", err);
          logout(); // clear invalid token
        }
      }
    };
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const { data } = await axios.post("http://localhost:5000/api/v1/auth/login", {
      email,
      password,
    });
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
