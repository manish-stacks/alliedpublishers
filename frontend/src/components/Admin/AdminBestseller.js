import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminBestseller = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [bestsellers, setBestsellers] = useState([]);

  // Fetch bestsellers
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/home/bestsellers")
      .then((response) => setBestsellers(response.data))
      .catch((error) => console.error("Error fetching bestsellers:", error));
  }, []);

  // Add new bestseller
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/home/admin/bestsellers", { name, image });
      setBestsellers([...bestsellers, response.data]); // Update UI
      setName("");
      setImage("");
      alert("Bestseller added successfully!");
    } catch (error) {
      console.error("Error adding bestseller:", error);
    }
  };

  // Delete a bestseller
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/home/admin/bestsellers/${id}`);
      setBestsellers(bestsellers.filter((book) => book._id !== id));
      alert("Bestseller deleted successfully!");
    } catch (error) {
      console.error("Error deleting bestseller:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col justify-center items-center px-12 ml-64">
        <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
          Admin Panel - Manage Bestsellers
        </h3>

        {/* Form to Add Bestseller */}
        <form
          className="w-full max-w-2xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl"
          onSubmit={handleSubmit}
        >
          <label className="block text-lg font-bold text-black uppercase mb-1">Book Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 text-center text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg"
          />

          <label className="block text-lg font-bold text-black uppercase mt-4 mb-1">Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full p-3 text-center text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg"
          />

          {/* Buttons */}
          <div className="flex justify-between mt-6 space-x-4">
            <button
              type="submit"
              className="px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95"
            >
              Add Bestseller
            </button>
          </div>
        </form>

        {/* Bestseller List */}
        <ul className="w-full max-w-3xl mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
          {bestsellers.map((book) => (
            <li key={book._id} className="bg-white/40 backdrop-blur-md p-5 rounded-lg shadow-lg flex flex-col items-center">
              <img src={book.image} alt={book.name} className="w-32 h-44 object-cover rounded-lg" />
              
              {/* ✅ Min Height Fix */}
              <p className="text-black text-lg font-bold mt-3 min-h-[3rem] text-center">{book.name}</p>
              
              <button
                className="mt-auto px-4 py-2 bg-[#34022a] text-white rounded-md font-bold transition hover:bg-[#c0392b]"
                onClick={() => handleDelete(book._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminBestseller;
