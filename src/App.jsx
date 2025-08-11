 
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
 
 

function App() {
   

  return (
    <div className="p-4 font-sans">
      <h1 className="text-2xl font-bold mb-2">Fitness Tracker</h1>
      

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