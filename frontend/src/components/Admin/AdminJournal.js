import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminJournal = () => {
  const [journal, setJournal] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/journal`)
      .then((response) => {
        setJournal(response.data);
        setFormData(response.data);
      })
      .catch((error) => console.error("Error fetching journal data:", error));
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value.split("\n") });
  };

  const handleNestedChange = (e, field, subField) => {
    setFormData({ ...formData, [field]: { ...formData[field], [subField]: e.target.value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/api/journal/${journal._id}`, formData)
      .then(() => alert("Updated Successfully"))
      .catch((error) => console.error("Error updating journal:", error));
  };
  

  if (!journal) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />

      {/* Main Content Centered */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 ml-64">
        <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
          Manage Journal & Magazines
        </h3>

        {/* Form Container */}
        <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">

            {/* Title */}
            <label className="text-lg font-bold text-black uppercase">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange}
              className="w-4/5 p-3 text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg text-center" />

            {/* Description */}
            <label className="text-lg font-bold text-black uppercase">Description</label>
            <textarea name="description" value={formData.description.join("\n")} onChange={(e) => handleArrayChange(e, "description")}
              className="w-4/5 p-3 text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg text-center"></textarea>

            {/* Services */}
            <label className="text-lg font-bold text-black uppercase">Services</label>
            <textarea name="services" value={formData.services.join("\n")} onChange={(e) => handleArrayChange(e, "services")}
              className="w-4/5 p-3 text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg text-center"></textarea>

            {/* Special Services */}
            <label className="text-lg font-bold text-black uppercase">Special Services</label>
            <textarea name="specialServices" value={formData.specialServices.join("\n")} onChange={(e) => handleArrayChange(e, "specialServices")}
              className="w-4/5 p-3 text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg text-center"></textarea>

            {/* Journals and Magazines */}
            <h3 className="text-2xl font-semibold text-black mt-6 mb-4 text-center">Journals & Magazines</h3>

            <label className="text-lg font-bold text-black uppercase">Overview</label>
            <textarea name="overview" value={formData.journalsAndMagazines.overview} onChange={(e) => handleNestedChange(e, "journalsAndMagazines", "overview")}
              className="w-4/5 p-3 text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg text-center"></textarea>

            <label className="text-lg font-bold text-black uppercase">Strategies</label>
            <textarea name="strategies" value={formData.journalsAndMagazines.strategies.join("\n")} onChange={(e) => handleArrayChange(e, "journalsAndMagazines.strategies")}
              className="w-4/5 p-3 text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg text-center"></textarea>

            {/* Branches */}
            <h3 className="text-2xl font-semibold text-black mt-6 mb-4 text-center">Branches</h3>
            {formData.branches.map((branch, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-md mb-4 w-4/5 flex flex-col items-center">
                <label className="font-semibold">City</label>
                <input type="text" value={branch.city} onChange={(e) => handleNestedChange(e, `branches[${index}]`, "city")}
                  className="border p-2 w-full text-center" />

                <label className="font-semibold">Contact Person</label>
                <input type="text" value={branch.contactPerson} onChange={(e) => handleNestedChange(e, `branches[${index}]`, "contactPerson")}
                  className="border p-2 w-full text-center" />

                <label className="font-semibold">Address</label>
                <input type="text" value={branch.address} onChange={(e) => handleNestedChange(e, `branches[${index}]`, "address")}
                  className="border p-2 w-full text-center" />

                <label className="font-semibold">Phone</label>
                <textarea value={branch.phone.join("\n")} onChange={(e) => {
                  const updatedBranches = [...formData.branches];
                  updatedBranches[index].phone = e.target.value.split("\n");
                  setFormData({ ...formData, branches: updatedBranches });
                }} className="border p-2 w-full text-center"></textarea>

                <label className="font-semibold">Email</label>
                <textarea value={branch.email.join("\n")} onChange={(e) => {
                  const updatedBranches = [...formData.branches];
                  updatedBranches[index].email = e.target.value.split("\n");
                  setFormData({ ...formData, branches: updatedBranches });
                }} className="border p-2 w-full text-center"></textarea>
              </div>
            ))}

            {/* Save Button Centered */}
            <button type="submit" className="px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95">
              Save Changes
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminJournal;
