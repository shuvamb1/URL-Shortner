import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { API } from "../api";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await API.post("/shorten", { original_url: longUrl });
        setShortUrl(res.data.short_url);
      } catch (err) {
        alert("Error shortening URL");
      }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  return (
    <div className="home-container">
      {/* Top Header */}
      <header className="home-header">
        <div className="logo">🔗 URL Shortener</div>
        <button
  className="admin-btn"
  onClick={() => navigate("/admin")}
>
  Login as Admin
</button>
      </header>

      {/* Main Content */}
      <main className="home-main">
        <h1 className="title">Shorten Your Links in Seconds</h1>
        <p className="subtitle">Fast, secure, and mobile-friendly</p>

        <div className="input-container">
          <input
            type="text"
            placeholder="Paste your long URL here..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />
          <button onClick={handleSubmit} className="shorten-btn">Shorten</button>
        </div>

        {shortUrl && (
          <div className="result">
            <a href={shortUrl}>{shortUrl}</a>
            <button onClick={copyToClipboard} className="copy-btn">📋 Copy</button>
          </div>
        )}
      </main>
    </div>
  );
}
