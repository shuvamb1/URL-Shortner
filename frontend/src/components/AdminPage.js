import axios from "axios";
import React, { useEffect, useState } from "react";
import { API, setAuthToken } from "../api";
import AdminLogin from "./AdminLogin";
import "./AdminPage.css"; // <-- we'll create this

export default function AdminPage() {
  const [urls, setUrls] = useState([]);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setAuthToken(token);
      setAdmin({});
      fetchUrls();
    }
  }, []);

  const fetchUrls = async () => {
    try {
      const res = await API.get("/admin/list");
      setUrls(res.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        logout();
      } else {
        alert("Failed to fetch URLs");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAuthToken(null);
    setAdmin(null);
    setUrls([]);
  };

  if (!localStorage.getItem("adminToken") || !admin) {
    return <AdminLogin onLogin={(adm) => { setAdmin(adm); fetchUrls(); }} />;
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>🔑 Admin Dashboard</h1>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </header>

      <div className="table-wrapper">
        <table className="url-table">
          <thead>
            <tr>
              <th>Short Code</th>
              <th>Original URL</th>
              <th>Visits</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((u) => (
              <tr key={u._id}>
                <td>{u.short_code}</td>
                <td>
                  <a href={u.original_url} target="_blank" rel="noreferrer">
                    {u.original_url}
                  </a>
                </td>
                <td>{u.visit_count}</td>
                <td>{new Date(u.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
