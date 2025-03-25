import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminManagement = () => {
  const [management, setManagement] = useState({ board_of_directors: [], branches: [] });
  const [newMember, setNewMember] = useState({ section: "", name: "", position: "", phone: "", city: "" });

  useEffect(() => {
    axios.get("http://localhost:5001/api/home/management/")
      .then(response => setManagement(response.data))
      .catch(error => console.error("Error fetching management data:", error));
  }, []);

  const handleChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5001/api/home/admin/management", newMember)
      .then(response => {
        setManagement(response.data.managementData);
        setNewMember({ section: "", name: "", position: "", phone: "", city: "" });
      })
      .catch(error => console.error("Error adding member:", error));
  };

  const handleDelete = (section, id) => {
    axios.delete(`http://localhost:5001/api/home/admin/management/${section}/${id}`)
      .then(() => {
        setManagement(prevState => ({
          ...prevState,
          [section]: prevState[section].filter(item => item._id !== id)
        }));
      })
      .catch(error => console.error("Error deleting member:", error));
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center px-10 ml-[260px]">
        <div className="w-full max-w-3xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
          <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
            Management Panel
          </h3>

          {/* Board of Directors Section */}
          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-black text-center mb-4">Board of Directors</h3>
            <ul className="space-y-3">
              {management.board_of_directors.map(director => (
                <li key={director._id} className="flex justify-between items-center bg-white/50 p-3 rounded-md shadow-md">
                  <span className="text-black font-medium">{director.name} - {director.position}</span>
                  <button className="px-3 py-1 bg-[#581988] text-white rounded-md transition hover:bg-[#876c8e]" onClick={() => handleDelete("board_of_directors", director._id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Branches Section */}
          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-black text-center mb-4">Branches</h3>
            {management.branches.map(branch => (
              <div key={branch.city} className="mb-4">
                <h4 className="text-xl font-bold text-black text-center">{branch.city}</h4>
                <ul className="space-y-3">
                  {branch.members.map(member => (
                    <li key={member._id} className="flex justify-between items-center bg-white/50 p-3 rounded-md shadow-md">
                      <span className="text-black font-medium">{member.name} - {member.position} (📞 {member.phone})</span>
                      <button className="px-3 py-1 bg-[#581988] text-white rounded-md transition hover:bg-[#876c8e]" onClick={() => handleDelete("branches", member._id)}>
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Add Member Form */}
          <section>
            <h3 className="text-2xl font-semibold text-black text-center mb-4">Add New Member</h3>
            <form onSubmit={handleAddMember} className="flex flex-col items-center space-y-4">
              <select name="section" onChange={handleChange} required className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg">
                <option value="">Select Section</option>
                <option value="board_of_directors">Board of Directors</option>
                <option value="branches">Branches</option>
              </select>
              <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg" />
              <input type="text" name="position" placeholder="Position" onChange={handleChange} required className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg" />
              {newMember.section === "branches" && (
                <>
                  <input type="text" name="city" placeholder="Branch City" onChange={handleChange} required className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg" />
                  <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg" />
                </>
              )}
              <button type="submit" className="px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95">
                Add Member
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
