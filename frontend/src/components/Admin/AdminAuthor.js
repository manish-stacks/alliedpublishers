import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminAuthor = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [notableWorks, setNotableWorks] = useState("");
  const [authors, setAuthors] = useState([]);

  // Fetch all authors
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/home/authors")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => console.error("Error fetching authors:", error));
  }, []);

  // Add new author
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/home/admin/authors", {
        name,
        image,
        description,
        notableWorks: notableWorks.split(",").map((work) => work.trim()),
      });

      // Update state
      setAuthors([...authors, { _id: response.data._id, name, image, description, notableWorks: notableWorks.split(",") }]);

      // Reset form
      setName("");
      setImage("");
      setDescription("");
      setNotableWorks("");

      alert("Author added successfully!");
    } catch (error) {
      console.error("Error adding author:", error);
    }
  };

  // Delete an author
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/home/admin/authors/${id}`);

      // Remove from UI
      setAuthors(authors.filter((author) => author._id !== id));

      alert("Author deleted successfully!");
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />
      
      {/* Main Container */}
      <div className="flex-1 flex flex-col justify-center items-center px-12 ml-64">
        <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
          Admin Panel - Manage Authors
        </h3>

        {/* Add Author Form */}
        <form
          className="w-full max-w-2xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl"
          onSubmit={handleSubmit}
        >
          <label className="block text-lg font-bold text-black uppercase mb-1">Author Name:</label>
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

          <label className="block text-lg font-bold text-black uppercase mt-4 mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg min-h-[130px] resize-y"
          />

          <label className="block text-lg font-bold text-black uppercase mt-4 mb-1">Notable Works (comma-separated):</label>
          <input
            type="text"
            value={notableWorks}
            onChange={(e) => setNotableWorks(e.target.value)}
            className="w-full p-3 text-center text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg"
          />

          {/* Buttons */}
          <div className="flex justify-between mt-6 space-x-4">
            <button
              type="submit"
              className="px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95"
            >
              Add Author
            </button>
          </div>
        </form>

        {/* Author List */}
        <ul className="w-full max-w-2xl mt-10 space-y-4">
          {authors.length > 0 ? (
            authors.map((author) => (
              <li key={author._id} className="flex items-start bg-white/40 backdrop-blur-md p-5 rounded-lg shadow-lg">
                <img src={author.image} alt={author.name} className="w-40 h-40 object-cover rounded-lg mr-6" />
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold text-black">{author.name}</h3>
                  <p className="text-gray-800">{author.description}</p>
                  <p className="text-gray-900 font-semibold mt-2">
                    <strong>Notable Works:</strong> {author.notableWorks.join(", ")}
                  </p>
                </div>
                <button
                  className="ml-4 px-4 py-2 bg-[#581988] text-white rounded-md font-bold transition hover:bg-[#876c8e]"
                  onClick={() => handleDelete(author._id)}
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-700 text-lg">No authors added yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminAuthor;
