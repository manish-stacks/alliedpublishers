


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const AdminQRCode = () => {
//   const [qrCode, setQRCode] = useState(null);
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchQRCode = async () => {
//     try {
//       const response = await axios.get("${process.env.REACT_APP_BACKEND_URL}/api/qrcode");
//       setQRCode(response.data);
//     } catch (error) {
//       console.error("Error fetching QR code:", error);
//     }
//   };

//   useEffect(() => {
//     fetchQRCode();
//   }, []);

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
//       const response = await axios.post(
//         "${process.env.REACT_APP_BACKEND_URL}/api/admin/qrcode",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: localStorage.getItem("token")
//           }
//         }
//       );
//       setQRCode(response.data);
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
//       await axios.delete("${process.env.REACT_APP_BACKEND_URL}/api/admin/qrcode", {
//         headers: { Authorization: localStorage.getItem("token") }
//       });
//       setQRCode(null);
//       toast.success("QR code deleted successfully");
//     } catch (error) {
//       console.error("Error deleting QR code:", error);
//       toast.error("Failed to delete QR code");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6">QR Code Management</h2>
      
//       {qrCode && (
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold mb-2">Current QR Code:</h3>
//           <img
//             src={qrCode.imagePath}
//             alt="QR Code"
//             className="w-64 h-64 mx-auto border border-gray-300"
//           />
//           <p className="text-sm text-gray-500 mt-2">
//             Last updated: {new Date(qrCode.updatedAt).toLocaleString()}
//           </p>
//         </div>
//       )}

//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Upload New QR Code:
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-gray-500
//               file:mr-4 file:py-2 file:px-4
//               file:rounded-md file:border-0
//               file:text-sm file:font-semibold
//               file:bg-[#75609c] file:text-white
//               hover:file:bg-[#5a497a]"
//           />
//         </div>

//         <div className="flex space-x-4">
//           <button
//             onClick={handleUpload}
//             disabled={loading || !file}
//             className={`px-4 py-2 bg-[#75609c] text-white rounded-md hover:bg-[#5a497a] transition ${
//               loading || !file ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Uploading..." : "Update QR Code"}
//           </button>

//           {qrCode && (
//             <button
//               onClick={handleDelete}
//               className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
//             >
//               Delete QR Code
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminQRCode;


import React, { useState, useEffect } from "react";
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

    setLoading(true);
    const formData = new FormData();
    formData.append("qrcode", file);

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/qrcode`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token")
          }
        }
      );
      toast.success("QR code updated successfully");
    } catch (error) {
      console.error("Error uploading QR code:", error);
      toast.error("Failed to update QR code");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete the QR code?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/admin/qrcode`, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      toast.success("QR code deleted successfully");
    } catch (error) {
      console.error("Error deleting QR code:", error);
      toast.error("Failed to delete QR code");
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
                {loading ? "Uploading..." : "Update QR Code"}
              </button>

              <button
                onClick={handleDelete}
                className="px-6 py-3 text-white font-bold uppercase bg-red-600 rounded-lg transition hover:bg-red-700 hover:shadow-md hover:scale-105 active:scale-95"
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