import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminConference = () => {
  const [conferenceData, setConferenceData] = useState({
    description: "",
    contact: {
      name: "",
      position: "",
      company: "",
      address: "",
    },
  });

  useEffect(() => {
    fetchConferenceData();
  }, []);

  const fetchConferenceData = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/home/conference");
      setConferenceData(res.data);
    } catch (err) {
      console.error("Error fetching conference data:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConferenceData({ ...conferenceData, [name]: value });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setConferenceData({
      ...conferenceData,
      contact: { ...conferenceData.contact, [name]: value },
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:5001/api/home/admin/conference", conferenceData);
      alert("Conference data updated successfully!");
      fetchConferenceData();
    } catch (err) {
      console.error("Error updating conference data:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />
      
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col justify-center items-center px-12 ml-64">
        <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
          Manage Conference Proceedings
        </h3>

        {/* Form Container */}
        <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
          <h3 className="text-2xl font-semibold text-black mb-4 text-center">Description</h3>
          <div className="flex justify-center">
            <textarea
              name="description"
              value={conferenceData.description}
              onChange={handleChange}
              className="w-4/5 p-3 text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg text-center"
            />
          </div>

          {/* Contact Information */}
          <h3 className="text-2xl font-semibold text-black mt-6 mb-4 text-center">Contact Information</h3>
          <div className="flex flex-col items-center space-y-4">
            <label className="font-bold text-lg text-black uppercase text-center">Contact Name</label>
            <input
              name="name"
              value={conferenceData.contact.name}
              onChange={handleContactChange}
              className="w-4/5 p-3 text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg text-center"
            />

            <label className="font-bold text-lg text-black uppercase text-center">Position</label>
            <input
              name="position"
              value={conferenceData.contact.position}
              onChange={handleContactChange}
              className="w-4/5 p-3 text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg text-center"
            />

            <label className="font-bold text-lg text-black uppercase text-center">Company</label>
            <input
              name="company"
              value={conferenceData.contact.company}
              onChange={handleContactChange}
              className="w-4/5 p-3 text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg text-center"
            />

            <label className="font-bold text-lg text-black uppercase text-center">Address</label>
            <input
              name="address"
              value={conferenceData.contact.address}
              onChange={handleContactChange}
              className="w-4/5 p-3 text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg text-center"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminConference;
