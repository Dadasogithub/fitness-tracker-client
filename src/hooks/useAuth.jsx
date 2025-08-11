 // src/hooks/useAuth.js
import React from "react";
 
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider.jsx"; // adjust path if needed

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
