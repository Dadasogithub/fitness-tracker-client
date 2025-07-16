import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
 
 

function App() {
  const [apiStatus, setApiStatus] = useState("pinging...");

  useEffect(() => {
    fetch("http://localhost:5000/healthz")
      .then((r) => r.json())
      .then((json) => setApiStatus(json.status))
      .catch(() => setApiStatus("offline"));
  }, []);

  return (
    <div className="p-4 font-sans">
      <h1 className="text-2xl font-bold mb-2">Fitness Tracker</h1>
      <p className="mb-4 text-sm text-gray-600">API status: {apiStatus}</p>

      <nav className="space-x-2 mb-4">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  );
}

export default App;