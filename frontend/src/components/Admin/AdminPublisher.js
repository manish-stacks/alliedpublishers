import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminPublisher = () => {
  const [publishers, setPublishers] = useState([]);
  const [newPublisher, setNewPublisher] = useState({ category: "", publisherName: "" });

  useEffect(() => {
    axios.get("http://localhost:5001/api/home/publisher")
      .then(response => setPublishers(response.data))
      .catch(error => console.error("Error fetching publishers:", error));
  }, []);

  const handleChange = (e) => {
    setNewPublisher({ ...newPublisher, [e.target.name]: e.target.value });
  };

  const handleAddPublisher = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5001/api/home/admin/publisher", newPublisher)
      .then(response => {
        setPublishers(prevState => {
          const updatedPublishers = [...prevState];
          const index = updatedPublishers.findIndex(pub => pub.category === response.data.publisher.category);
          if (index !== -1) {
            updatedPublishers[index] = response.data.publisher;
          } else {
            updatedPublishers.push(response.data.publisher);
          }
          return updatedPublishers;
        });
        setNewPublisher({ category: "", publisherName: "" });
      })
      .catch(error => console.error("Error adding publisher:", error));
  };

  const handleDelete = (category, publisherName) => {
    axios.delete(`http://localhost:5001/api/home/admin/publisher/${category}/${publisherName}`)
      .then(() => {
        setPublishers(prevState =>
          prevState.map(pub =>
            pub.category === category
              ? { ...pub, publishers: pub.publishers.filter(p => p !== publisherName) }
              : pub
          ).filter(pub => pub.publishers.length > 0)
        );
      })
      .catch(error => console.error("Error deleting publisher:", error));
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center px-10 ml-[260px]">
        <div className="w-full max-w-3xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:shadow-xl">
          <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
            Publisher Management
          </h3>

          {/* Available Publishers Section */}
          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-black text-center mb-4">Available Publishers</h3>
            {publishers.map(pub => (
              <div key={pub.category} className="mb-4">
                <h4 className="text-xl font-bold text-black text-center">{pub.category}</h4>
                <ul className="space-y-3">
                  {pub.publishers.map((name, index) => (
                    <li key={index} className="flex justify-between items-center bg-white/50 p-3 rounded-md shadow-md hover:scale-105 hover:bg-white/70 transition duration-300">
                      <span className="text-black font-medium">{name}</span>
                      <button className="px-4 py-2 bg-[#581988] text-white rounded-md transition hover:bg-[#876c8e] hover:scale-105" onClick={() => handleDelete(pub.category, name)}>
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Add Publisher Form */}
          <section>
            <h3 className="text-2xl font-semibold text-black text-center mb-4">Add Single Publisher</h3>
            <form onSubmit={handleAddPublisher} className="flex flex-col items-center space-y-4">
              <input type="text" name="category" placeholder="Category" onChange={handleChange} value={newPublisher.category} required className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg" />
              <input type="text" name="publisherName" placeholder="Publisher Name" onChange={handleChange} value={newPublisher.publisherName} required className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg" />
              <button type="submit" className="px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95">
                Add Publisher
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminPublisher;
