import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";

const AdminLink = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch current Eupheus link
  useEffect(() => {
    api.get("/api/home/eupheus-link")
      .then(res => {
        setUrl(res.data.link);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    api.put("/api/home/admin/link", { url })   // ✅ FIXED
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage("Error updating link"));
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Update Eupheus Link</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          className="w-full p-2 border rounded-lg"
          placeholder="Enter Eupheus link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Save Link
        </button>
      </form>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
};

export default AdminLink;
