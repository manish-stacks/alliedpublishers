// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import './AdminAboutus.css';
// import Sidebar from "./Sidebar";

// const AdminAboutUs = () => {
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState("");
//   const [description, setDescription] = useState([""]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/api/home/about-us")
//       .then((response) => {
//         if (response.data) {
//           setTitle(response.data.title);
//           setImage(response.data.content.image);
//           setDescription(response.data.content.description);
//         }
//       })
//       .catch((error) => console.error("Error fetching About Us data:", error));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5001/api/home/admin/about-us", {
//         title,
//         content: { image, description },
//       });
//       alert("About Us updated successfully!");
//     } catch (error) {
//       console.error("Error updating About Us:", error);
//     }
//   };

//   return (
//     <div className="admin-container">
//       <Sidebar />
//     <div className="admin-about-container">
//       <h3>Admin Panel - Edit About Us</h3>
//       <form className="admin-about-form" onSubmit={handleSubmit}>
//         <label>Title:</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

//         <label>Image URL:</label>
//         <input
//           type="text"
//           value={image}
//           onChange={(e) => setImage(e.target.value)}
//           required
//         />

//         <label>Description:</label>
//         {description.map((para, index) => (
//           <textarea
//             key={index}
//             value={para}
//             onChange={(e) => {
//               const newDescription = [...description];
//               newDescription[index] = e.target.value;
//               setDescription(newDescription);
//             }}
//           />
//         ))}

//         <div className="form-buttons">
//           <button
//             type="button"
//             className="add-button"
//             onClick={() => setDescription([...description, ""])}
//           >
//             Add Paragraph
//           </button>
//           <button type="submit" className="save-button">Save</button>
//         </div>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default AdminAboutUs;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminAboutUs = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState([""]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/home/about-us")
      .then((response) => {
        if (response.data) {
          setTitle(response.data.title);
          setImage(response.data.content.image);
          setDescription(response.data.content.description);
        }
      })
      .catch((error) => console.error("Error fetching About Us data:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/home/admin/about-us", {
        title,
        content: { image, description },
      });
      alert("About Us updated successfully!");
    } catch (error) {
      console.error("Error updating About Us:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content (Right Shifted) */}
      <div className="flex flex-1 justify-center items-center px-12 ml-64">
        <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
          <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
            Admin Panel - Edit About Us
          </h3>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Title Input */}
            <label className="block text-lg font-bold text-black uppercase mb-1">
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 text-center text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />

            {/* Image URL Input */}
            <label className="block text-lg font-bold text-black uppercase mt-4 mb-1">
              Image URL:
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="w-full p-3 text-center text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg"
            />

            {/* Description Input */}
            <label className="block text-lg font-bold text-black uppercase mt-4 mb-1">
              Description:
            </label>
            {description.map((para, index) => (
              <textarea
                key={index}
                value={para}
                onChange={(e) => {
                  const newDescription = [...description];
                  newDescription[index] = e.target.value;
                  setDescription(newDescription);
                }}
                className="w-full p-3 text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg min-h-[130px] resize-y"
              />
            ))}

            {/* Buttons with Proper Spacing */}
            <div className="flex justify-between mt-6 space-x-4">
              <button
                type="button"
                onClick={() => setDescription([...description, ""])}
                className="px-6 py-3 text-white font-bold uppercase bg-[#402f5f] rounded-lg transition hover:bg-[#5a447c] hover:shadow-md hover:scale-105 active:scale-95"
              >
                Add Paragraph
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAboutUs;
