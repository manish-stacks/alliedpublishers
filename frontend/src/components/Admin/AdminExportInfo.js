import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminExportInfo = () => {
  const [exportInfo, setExportInfo] = useState({
    description: "",
    exports: [],
    coreAreas: [],
    customerCategories: [],
    contact: {
      name: "",
      address: "",
      mobile: "",
      phone: [],
      email: [],
      note: "",
    },
  });

  useEffect(() => {
    fetchExportInfo();
  }, []);

  const fetchExportInfo = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/home/export-info");
      if (res.data) {
        setExportInfo(res.data);
      }
    } catch (err) {
      console.error("Error fetching export info:", err);
    }
  };

  const handleChange = (field, value) => {
    setExportInfo({ ...exportInfo, [field]: value });
  };

  const handleContactChange = (field, value) => {
    setExportInfo({
      ...exportInfo,
      contact: { ...exportInfo.contact, [field]: value },
    });
  };

  const handleArrayChange = (field, value) => {
    setExportInfo({ ...exportInfo, [field]: value.split(",") });
  };

  const handleContactArrayChange = (field, value) => {
    setExportInfo({
      ...exportInfo,
      contact: { ...exportInfo.contact, [field]: value.split(",") },
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:5001/api/home/admin/export-info", exportInfo);
      alert("Export Info updated successfully!");
      fetchExportInfo();
    } catch (err) {
      console.error("Error updating export info:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />
      
      {/* Main Content Area Shifted Right */}
      <div className="flex-1 flex justify-center items-center px-10 ml-[260px]">
        <div className="w-full max-w-3xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
          <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
            Manage Export Information
          </h3>

          <div className="flex flex-col items-center space-y-4">
            <label className="text-lg font-bold text-black uppercase text-center">Description</label>
            <textarea
              value={exportInfo.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />

            <label className="text-lg font-bold text-black uppercase text-center">Exports (Comma-separated)</label>
            <input
              type="text"
              value={exportInfo.exports.join(", ")}
              onChange={(e) => handleArrayChange("exports", e.target.value)}
              className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />

            <label className="text-lg font-bold text-black uppercase text-center">Core Areas (Comma-separated)</label>
            <input
              type="text"
              value={exportInfo.coreAreas.join(", ")}
              onChange={(e) => handleArrayChange("coreAreas", e.target.value)}
              className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />

            <label className="text-lg font-bold text-black uppercase text-center">Customer Categories (Comma-separated)</label>
            <input
              type="text"
              value={exportInfo.customerCategories.join(", ")}
              onChange={(e) => handleArrayChange("customerCategories", e.target.value)}
              className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />

            <h3 className="text-2xl font-bold text-black mt-6 uppercase text-center">Contact Details</h3>

            <label className="text-lg font-bold text-black uppercase text-center">Name</label>
            <input
              type="text"
              value={exportInfo.contact.name}
              onChange={(e) => handleContactChange("name", e.target.value)}
              className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />

            <label className="text-lg font-bold text-black uppercase text-center">Address</label>
            <input
              type="text"
              value={exportInfo.contact.address}
              onChange={(e) => handleContactChange("address", e.target.value)}
              className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />

            <label className="text-lg font-bold text-black uppercase text-center">Mobile</label>
            <input
              type="text"
              value={exportInfo.contact.mobile}
              onChange={(e) => handleContactChange("mobile", e.target.value)}
              className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />

            <label className="text-lg font-bold text-black uppercase text-center">Phone Numbers (Comma-separated)</label>
            <input
              type="text"
              value={exportInfo.contact.phone.join(", ")}
              onChange={(e) => handleContactArrayChange("phone", e.target.value)}
              className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />

            <label className="text-lg font-bold text-black uppercase text-center">Email (Comma-separated)</label>
            <input
              type="text"
              value={exportInfo.contact.email.join(", ")}
              onChange={(e) => handleContactArrayChange("email", e.target.value)}
              className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />

            <label className="text-lg font-bold text-black uppercase text-center">Legal Disputes Note</label>
            <textarea
              value={exportInfo.contact.note}
              onChange={(e) => handleContactChange("note", e.target.value)}
              className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />

            <button onClick={handleUpdate} className="px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminExportInfo;
