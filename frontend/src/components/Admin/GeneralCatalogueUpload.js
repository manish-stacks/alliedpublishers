import React, { useState } from "react";
import api from "../../axiosConfig";
import Sidebar from "./Sidebar";

const GeneralCatalogueUpload = () => {
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/home/admin/catalogue/general/upload`, { fileUrl });
      alert("General Catalogue link saved successfully!");
      setFileUrl("");
    } catch (error) {
      console.error("Error saving General Catalogue:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 justify-center items-center px-12 ml-64">
        <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
          <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
            Admin Panel - General Catalogue Upload
          </h3>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <label className="block text-lg font-bold text-black uppercase mb-1">
              Google Drive Link:
            </label>
            <input
              type="text"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              required
              placeholder="Paste Google Drive link here"
              className="w-full p-3 text-center text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95"
              >
                Save Catalogue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeneralCatalogueUpload;
