import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminLocation = () => {
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/home/locations")
      .then((response) => setLocations(response.data))
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/home/admin/locations", { name: location });
      setLocations([...locations, response.data]);
      setLocation("");
      alert("Location added successfully!");
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/home/admin/locations/${id}`);
      setLocations(locations.filter((loc) => loc._id !== id));
      alert("Location deleted successfully!");
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center px-10 ml-[260px]">
        <div className="w-full max-w-3xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
          <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
            Manage Locations
          </h3>

          {/* Add Location Form */}
          <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
            <label className="text-lg font-bold text-black uppercase text-center">Location Name</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="Enter location name"
              className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />
            <button type="submit" className="px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95">
              Add Location
            </button>
          </form>

          {/* Display Existing Locations in a Table */}
          {locations.length > 0 ? (
            <div className="mt-6 w-full">
              <table className="w-full border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 px-4 py-2">#</th>
                    <th className="border border-gray-400 px-4 py-2">Location Name</th>
                    <th className="border border-gray-400 px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {locations.map((loc, index) => (
                    <tr key={loc._id} className="hover:bg-gray-100 transition">
                      <td className="border border-gray-400 px-4 py-2 text-center">{index + 1}</td>
                      <td className="border border-gray-400 px-4 py-2 text-center">{loc.name}</td>
                      <td className="border border-gray-400 px-4 py-2 text-center">
                        <button 
                          className="px-4 py-2 bg-[#581988] text-white rounded-lg transition hover:bg-[#876c8e] active:scale-95"
                          onClick={() => handleDelete(loc._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-lg font-semibold text-black text-center mt-4">No locations added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLocation;
