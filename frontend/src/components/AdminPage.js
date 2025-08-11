import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await axios.get("/api/admin/urls", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUrls(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Visit Count</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id}>
              <td>{url.originalUrl}</td>
              <td>
                <a href={url.shortUrl} target="_blank" rel="noreferrer">
                  {url.shortUrl}
                </a>
              </td>
              <td>{url.visitCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
