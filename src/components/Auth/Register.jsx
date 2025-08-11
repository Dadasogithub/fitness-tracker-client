import { useState } from "react";
import React from "react";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", {
        email,
        password
      });
      setMessage("Registered! Please login.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 max-w-sm">
      <h2 className="text-xl font-medium">Register</h2>
      {message && <p className="text-green-600 text-sm">{message}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded">
        Register
      </button>
    </form>
  );
}