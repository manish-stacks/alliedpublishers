import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import Sidebar from "./Sidebar";

const AdminContact = () => {
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({ city: "", address: "", phone: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await api.get(`/api/home/contact`);
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/api/home/admin/contact/${editingId}`, formData);
      } else {
        await api.post(`/api/home/admin/contact`, formData);
      }
      fetchBranches();
      setFormData({ city: "", address: "", phone: "", email: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving branch:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/home/admin/contact/${id}`);
      fetchBranches();
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  const handleEdit = (branch) => {
    setFormData(branch);
    setEditingId(branch._id);
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />
      <div className="flex flex-1 justify-center items-center px-12 ml-64">
        <div className="w-full max-w-4xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
          <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
            Admin Panel - Manage Branches
          </h3>

          {/* FORM CARD */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-black uppercase mb-4">{editingId ? "Edit Branch" : "Add Branch"}</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="w-full p-3 text-center text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
                className="w-full p-3 text-center text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone (comma-separated)"
                required
                className="w-full p-3 text-center text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full p-3 text-center text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95"
              >
                {editingId ? "Update Branch" : "Add Branch"}
              </button>
            </form>
          </div>

          {/* LIST OF BRANCHES */}
          <div>
            <h4 className="text-xl font-bold text-black uppercase mb-4 text-center">Branch List</h4>
            <ul className="space-y-3">
              {branches.map((branch) => (
                <li key={branch._id} className="flex justify-between items-center border-b border-[#75609c] pb-2">
                  <span className="text-black font-medium">{branch.city} - {branch.address} - {branch.phone.join(", ")} - {branch.email}</span>
                  <div className="space-x-2">
                    <button 
                      onClick={() => handleEdit(branch)} 
                      className="px-4 py-2 text-white font-bold uppercase bg-[#402f5f] rounded-lg transition hover:bg-[#5a447c] hover:shadow-md hover:scale-105 active:scale-95"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(branch._id)} 
                      className="px-4 py-2 text-white font-bold uppercase bg-red-600 rounded-lg transition hover:bg-red-700 hover:shadow-md hover:scale-105 active:scale-95"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;
