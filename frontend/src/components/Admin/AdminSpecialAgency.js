import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminSpecialAgency = () => {
  const [agencies, setAgencies] = useState([]);
  const [editingAgency, setEditingAgency] = useState(null);
  const [agencyData, setAgencyData] = useState({
    name: "",
    description: "",
    keyFeatures: "",
    partnerOrganizations: "",
    currentAssociates: "",
    contactDetails: {
      manager: "",
      address: "",
      phone: "",
      mobile: "",
      email: "",
    },
  });

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = () => {
    axios
      .get("http://localhost:5001/api/home/special-agency")
      .then((response) => setAgencies(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("contactDetails.")) {
      const key = name.split(".")[1];
      setAgencyData({
        ...agencyData,
        contactDetails: { ...agencyData.contactDetails, [key]: value },
      });
    } else {
      setAgencyData({ ...agencyData, [name]: value });
    }
  };

  const handleSaveAgency = (e) => {
    e.preventDefault();
    const formattedData = {
      ...agencyData,
      keyFeatures: agencyData.keyFeatures.split(","),
      partnerOrganizations: agencyData.partnerOrganizations.split(","),
      currentAssociates: agencyData.currentAssociates.split(","),
      contactDetails: {
        ...agencyData.contactDetails,
        email: agencyData.contactDetails.email.split(","),
      },
    };

    if (editingAgency) {
      axios
        .put(`http://localhost:5001/api/home/admin/special-agency/${editingAgency._id}`, formattedData)
        .then(() => {
          fetchAgencies();
          setEditingAgency(null);
          resetForm();
        })
        .catch((error) => console.error("Error updating agency:", error));
    } else {
      axios
        .post("http://localhost:5001/api/home/admin/special-agency", formattedData)
        .then((response) => {
          setAgencies([...agencies, response.data.agency]);
          resetForm();
        })
        .catch((error) => console.error("Error adding agency:", error));
    }
  };

  const handleDeleteAgency = (id) => {
    axios
      .delete(`http://localhost:5001/api/home/admin/special-agency/${id}`)
      .then(() => fetchAgencies())
      .catch((error) => console.error("Error deleting agency:", error));
  };

  const handleEditAgency = (agency) => {
    setEditingAgency(agency);
    setAgencyData({
      name: agency.name,
      description: agency.description,
      keyFeatures: agency.keyFeatures.join(","),
      partnerOrganizations: agency.partnerOrganizations.join(","),
      currentAssociates: agency.currentAssociates.join(","),
      contactDetails: {
        manager: agency.contactDetails.manager || "",
        address: agency.contactDetails.address || "",
        phone: agency.contactDetails.phone || "",
        mobile: agency.contactDetails.mobile || "",
        email: agency.contactDetails.email.join(",") || "",
      },
    });
  };

  const resetForm = () => {
    setAgencyData({
      name: "",
      description: "",
      keyFeatures: "",
      partnerOrganizations: "",
      currentAssociates: "",
      contactDetails: {
        manager: "",
        address: "",
        phone: "",
        mobile: "",
        email: "",
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center px-10 ml-[260px]">
        <div className="w-full max-w-3xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:shadow-xl">
          <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
            Specialized Agencies Management
          </h3>

          {/* ✅ List of Agencies */}
          <section className="w-full space-y-6">
            {agencies.map((agency) => (
              <div key={agency._id} className="bg-white/50 p-5 rounded-lg shadow-md hover:scale-105 hover:bg-white/70 transition duration-300">
                <h3 className="text-xl font-semibold">{agency.name}</h3>
                <p>{agency.description}</p>
                <ul className="mt-2">
                  {agency.keyFeatures.map((feature, index) => (
                    <li key={index} className="text-sm">✅ {feature}</li>
                  ))}
                </ul>
                <p><strong>Manager:</strong> {agency.contactDetails.manager}</p>
                <p><strong>Address:</strong> {agency.contactDetails.address}</p>
                <p><strong>Phone:</strong> {agency.contactDetails.phone}</p>
                <div className="flex space-x-4 mt-4">
                  <button className="px-4 py-2 bg-[#581988] text-white rounded-md transition hover:bg-[#876c8e] hover:scale-105" onClick={() => handleEditAgency(agency)}>Edit</button>
                  <button className="px-4 py-2 bg-[#004f4f] text-white rounded-md transition hover:bg-[#007a7a] hover:scale-105">
  Delete
</button>

                </div>
              </div>
            ))}
          </section>

          {/* ✅ Add or Edit Agency Form */}
          <section className="mt-8">
            <h3 className="text-2xl font-semibold text-black text-center mb-4">{editingAgency ? "Edit Agency" : "Add New Specialized Agency"}</h3>
            <form onSubmit={handleSaveAgency} className="flex flex-col items-center space-y-4">
              <input type="text" name="name" placeholder="Agency Name" value={agencyData.name} onChange={handleChange} required className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg" />
              <textarea name="description" placeholder="Description" value={agencyData.description} onChange={handleChange} className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"></textarea>
              <input type="text" name="keyFeatures" placeholder="Key Features (comma-separated)" value={agencyData.keyFeatures} onChange={handleChange} className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg" />
              <input type="text" name="contactDetails.manager" placeholder="Manager Name" value={agencyData.contactDetails.manager} onChange={handleChange} className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg" />
              <button type="submit" className="px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95">
                {editingAgency ? "Update" : "Add Agency"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminSpecialAgency;
