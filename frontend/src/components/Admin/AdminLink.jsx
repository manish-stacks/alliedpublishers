import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import Sidebar from "./Sidebar";

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
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />
      <div className="flex flex-1 justify-center items-center px-12 ml-64">
        <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
          <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
            Admin Panel - Update School Books Link
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-bold text-black uppercase mb-1">
                School Books Link:
              </label>
              <input
                type="url"
                className="w-full p-3 text-center text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg"
                placeholder="Enter School Books link"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95"
            >
              Save Link
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLink;
