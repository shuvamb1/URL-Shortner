import React, { useState } from "react";
import { API, setAuthToken } from "../api";
import "./AdminLogin.css";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("auth/login", { email, password });
      const { token, admin } = res.data;
      localStorage.setItem("adminToken", token);
      setAuthToken(token);
      onLogin(admin);
    } catch (err) {
      alert(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="admin-login-container">
      <header className="admin-header">
        <div className="logo">🔗 URL Shortener</div>
      </header>
      <main className="home-main1">

      <div className="admin-login-box">
        <h2>Admin Login</h2>
        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
      </main>
    </div>
  );
}
