import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminContact = () => {
  const [branches, setBranches] = useState([]);
  const [editingBranch, setEditingBranch] = useState(null);
  const [branchData, setBranchData] = useState({
    city: "",
    address: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = () => {
    axios
      .get("http://localhost:5001/api/home/contact")
      .then((response) => setBranches(response.data.branches))
      .catch((error) => console.error("Error fetching branches:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBranchData({ ...branchData, [name]: value });
  };

  const handleSaveBranch = (e) => {
    e.preventDefault();
    const formattedData = {
      ...branchData,
      phone: branchData.phone.split(",")
    };

    if (editingBranch) {
      axios
        .put(`http://localhost:5001/api/home/admin/contact/${editingBranch._id}`, formattedData)
        .then(() => {
          fetchBranches();
          setEditingBranch(null);
          resetForm();
        })
        .catch((error) => console.error("Error updating branch:", error));
    } else {
      axios
        .post("http://localhost:5001/api/home/admin/contact", formattedData)
        .then(() => {
          fetchBranches();
          resetForm();
        })
        .catch((error) => console.error("Error adding branch:", error));
    }
  };

  const handleDeleteBranch = (id) => {
    axios
      .delete(`http://localhost:5001/api/home/admin/contact/${id}`)
      .then(() => fetchBranches())
      .catch((error) => console.error("Error deleting branch:", error));
  };

  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setBranchData({
      city: branch.city,
      address: branch.address,
      phone: branch.phone.join(","),
      email: branch.email
    });
  };

  const resetForm = () => {
    setBranchData({
      city: "",
      address: "",
      phone: "",
      email: ""
    });
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col items-center justify-center px-10 ml-64">
        <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
          Contact Information
        </h3>

        {/* ✅ Branch List */}
        <section className="w-full max-w-2xl space-y-6">
          {branches.map((branch) => (
            <div key={branch._id} className="bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-6 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
              <h3 className="text-xl font-semibold text-black">{branch.city}</h3>
              <p className="text-black"><strong>Address:</strong> {branch.address}</p>
              <p className="text-black"><strong>Phone:</strong> {branch.phone.join(", ")}</p>
              <p className="text-black"><strong>Email:</strong> {branch.email}</p>
              <div className="flex justify-end space-x-3 mt-4">
                <button className="px-4 py-2 text-white font-semibold bg-[#722458] rounded-lg transition hover:bg-[#7b4770]" onClick={() => handleEditBranch(branch)}>
                  Edit
                </button>
                <button className="px-4 py-2 text-white font-semibold bg-[#581988] rounded-lg transition hover:bg-[#876c8e]" onClick={() => handleDeleteBranch(branch._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* ✅ Add or Edit Branch Form */}
        <section className="w-full max-w-2xl mt-8 bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
          <h3 className="text-2xl font-semibold text-black mb-4 text-center">
            {editingBranch ? "Edit Branch" : "Add New Branch"}
          </h3>
          <form onSubmit={handleSaveBranch} className="space-y-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={branchData.city}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={branchData.address}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Numbers (comma-separated)"
              value={branchData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={branchData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />
            <div className="flex justify-center">
              <button type="submit" className="px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95">
                {editingBranch ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AdminContact;
