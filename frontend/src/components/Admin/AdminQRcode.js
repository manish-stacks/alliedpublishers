// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Sidebar from "./Sidebar";

// const AdminQRCode = () => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       toast.error("Please select a file");
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("qrcode", file);

//     try {
//       await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/admin/qrcode`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: localStorage.getItem("token")
//           }
//         }
//       );
//       toast.success("QR code updated successfully");
//     } catch (error) {
//       console.error("Error uploading QR code:", error);
//       toast.error("Failed to update QR code");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete the QR code?")) return;

//     try {
//       await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/admin/qrcode`, {
//         headers: { Authorization: localStorage.getItem("token") }
//       });
//       toast.success("QR code deleted successfully");
//     } catch (error) {
//       console.error("Error deleting QR code:", error);
//       toast.error("Failed to delete QR code");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#d5d8dc]">
//       <Sidebar />
      
//       {/* Main Content Area Shifted Right */}
//       <div className="flex-1 flex justify-center items-center px-10 ml-[260px]">
//         <div className="w-full max-w-3xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
//           <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
//             QR Code Management
//           </h3>

//           <div className="flex flex-col items-center space-y-6">
//             <div className="w-full">
//               <label className="text-lg font-bold text-black uppercase text-center block mb-2">
//                 Upload QR Code Image
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="block w-full text-sm text-gray-500
//                   file:mr-4 file:py-2 file:px-4
//                   file:rounded-md file:border-0
//                   file:text-sm file:font-semibold
//                   file:bg-[#75609c] file:text-white
//                   hover:file:bg-[#5a497a]"
//               />
//             </div>

//             <div className="flex space-x-4">
//               <button
//                 onClick={handleUpload}
//                 disabled={loading || !file}
//                 className={`px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95 ${
//                   loading || !file ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {loading ? "Uploading..." : "Update QR Code"}
//               </button>

//               <button
//                 onClick={handleDelete}
//                 className="px-6 py-3 text-white font-bold uppercase bg-red-600 rounded-lg transition hover:bg-red-700 hover:shadow-md hover:scale-105 active:scale-95"
//               >
//                 Delete QR Code
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminQRCode;


import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

const AdminQRCode = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    // Only accept image types (extra guard)
    if (!file.type.startsWith("image/")) {
      toast.error("File must be an image.");
      return;
    }

    setLoading(true); // Disable actions while uploading
    const formData = new FormData();
    formData.append("qrcode", file);

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/qrcode`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success("QR code updated successfully.");
      setFile(null); // Optional: clear file input after success
    } catch (error) {
      console.error("Error uploading QR code:", error);
      toast.error("Failed to update QR code.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete the QR code?")) return;
    setLoading(true);

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/qrcode`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      toast.success("QR code deleted successfully.");
    } catch (error) {
      console.error("Error deleting QR code:", error);
      toast.error("Failed to delete QR code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />

      {/* Main Content Area Shifted Right */}
      <div className="flex-1 flex justify-center items-center px-10 ml-[260px]">
        <div className="w-full max-w-3xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
          <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
            QR Code Management
          </h3>

          <div className="flex flex-col items-center space-y-6">
            <div className="w-full">
              <label className="text-lg font-bold text-black uppercase text-center block mb-2">
                Upload QR Code Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#75609c] file:text-white
                  hover:file:bg-[#5a497a]"
                disabled={loading}
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleUpload}
                disabled={loading || !file}
                className={`px-6 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95 ${
                  loading || !file ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Processing..." : "Update QR Code"}
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className={`px-6 py-3 text-white font-bold uppercase bg-red-600 rounded-lg transition hover:bg-red-700 hover:shadow-md hover:scale-105 active:scale-95 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Delete QR Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQRCode;
