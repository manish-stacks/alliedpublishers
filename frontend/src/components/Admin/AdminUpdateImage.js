// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "./Sidebar";

// const AdminUpdateImage = ({ imageId }) => {
//   const [imageUrl, setImageUrl] = useState("");

//   useEffect(() => {
//     fetchImage();
//   }, []);

//   const fetchImage = async () => {
//     try {
//       const res = await axios.get("http://localhost:5001/api/home/images");
//       const image = res.data.find((img) => img._id === imageId);
//       if (image) setImageUrl(image.imageUrl);
//     } catch (error) {
//       console.error("Error fetching image:", error);
//     }
//   };

//   const updateImage = async () => {
//     const newUrl = prompt("Enter new image URL:");
//     if (newUrl) {
//       await axios.put(`http://localhost:5001/api/home/admin/images/${imageId}`, {
//         imageUrl: newUrl,
//       });
//       setImageUrl(newUrl);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#d5d8dc]">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content (Right Shifted) */}
//       <div className="flex flex-1 justify-center items-center px-12 ml-64">
//         <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
//           <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
//             Admin Panel - Update Image
//           </h3>

//           <div className="text-center mb-6">
//             <img src={imageUrl} alt="Current" width="200" className="mx-auto" />
//           </div>

//           <div className="flex justify-center space-x-4">
//             <button
//               onClick={updateImage}
//               className="px-6 py-3 text-white font-bold uppercase bg-[#402f5f] rounded-lg transition hover:bg-[#5a447c] hover:shadow-md hover:scale-105 active:scale-95"
//             >
//               Update Image
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminUpdateImage;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminUpdateImages = () => {
  const [images, setImages] = useState({
    image1: "",
    image2: "",
    image3: "",
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/home/images");
      if (res.data) setImages(res.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const updateImages = async () => {
    try {
      await axios.put("http://localhost:5001/api/home/admin/images", images);
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
          {[1, 2, 3].map((num) => (
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
