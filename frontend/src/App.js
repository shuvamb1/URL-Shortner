import React from "react";
import AdminPage from "./components/AdminPage";
import AdminLogin from "./components/AdminLogin";  // import AdminLogin
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setAuthToken } from "./api";

const token = localStorage.getItem("adminToken");
if (token) setAuthToken(token);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/login" element={<AdminLogin />} /> {/* Add this */}
      </Routes>
    </Router>
  );
}
