import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [urlInput, setUrlInput] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://url-shortner-backend-ppht.onrender.com/api/shorten", {
        original_url: urlInput
      });
      setShortUrl(res.data.short_url);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="home-container">
      {/* Top Header */}
      <header className="home-header">
        <div className="logo">🔗 URL Shortener</div>
        <button className="admin-btn" onClick={() => navigate("/admin")}>
          Login as Admin
        </button>
      </header>

      {/* Main Content */}
      <main className="home-main">
        <h1 className="title">Shorten Your Links in Seconds</h1>
        <p className="subtitle">Fast, secure, and mobile-friendly</p>

        <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          required
        />
        &nbsp;&nbsp;
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
        </p>
      )}
      </main>
    </div>
  );
}
