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
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Manage Branches</h2>

        {/* FORM CARD */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-lg mx-auto">
          <h3 className="text-xl font-semibold mb-4">{editingId ? "Edit Branch" : "Add Branch"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone (comma-separated)"
              required
              className="w-full p-3 border rounded-md"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 border rounded-md"
            />
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              {editingId ? "Update Branch" : "Add Branch"}
            </button>
          </form>
        </div>

        {/* LIST OF BRANCHES */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">Branch List</h3>
          <ul className="space-y-3">
            {branches.map((branch) => (
              <li key={branch._id} className="flex justify-between items-center border-b pb-2">
                <span>{branch.city} - {branch.address} - {branch.phone.join(", ")} - {branch.email}</span>
                <div className="space-x-2">
                  <button onClick={() => handleEdit(branch)} className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(branch._id)} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;
