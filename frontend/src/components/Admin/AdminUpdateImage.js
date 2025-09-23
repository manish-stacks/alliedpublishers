import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import Sidebar from "./Sidebar";

const AdminUpdateImages = () => {
  const [images, setImages] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4:"",
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await api.get(`/api/home/images`);
      if (res.data) setImages(res.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const updateImages = async () => {
    try {
      await api.put(`/api/home/admin/images`, images);
      alert("Images updated successfully!");
    } catch (error) {
      console.error("Error updating images:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />

      <div className="flex flex-1 justify-center items-center px-12 ml-64">
        <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
            Admin Panel - Update Images
          </h3>

          {/* Input fields for three images */}
          {[1, 2, 3,4].map((num) => (
            <div key={num} className="mb-6">
              <label className="block text-lg font-semibold text-black mb-2">
                Image {num} URL:
              </label>
              <input
                type="text"
                value={images[`image${num}`]}
                onChange={(e) =>
                  setImages({ ...images, [`image${num}`]: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
              {images[`image${num}`] && (
                <div className="mt-3 text-center">
                  <img
                    src={images[`image${num}`]}
                    alt={`Image ${num}`}
                    width="200"
                    className="mx-auto border border-gray-300 shadow-md"
                  />
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-center space-x-4">
            <button
              onClick={updateImages}
              className="px-6 py-3 text-white font-bold uppercase bg-[#402f5f] rounded-lg transition hover:bg-[#5a447c] hover:shadow-md hover:scale-105 active:scale-95"
            >
              Update Images
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateImages;
