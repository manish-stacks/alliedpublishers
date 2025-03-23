// import React, { useState } from "react";
// import axios from "axios";

// const Payment = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("Please select a file");

//     const formData = new FormData();
//     formData.append("screenshot", file);

//     try {
//       const response = await axios.post("https://alliedpublications-11.onrender.com/api/payment", formData, {
//         headers: { "Content-Type": "multipart/form-data", Authorization: token },
//       });

//       setMessage(response.data.message);
//     } catch (error) {
//       console.error("Error uploading payment:", error);
//       setMessage("Failed to upload payment");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Scan & Pay</h2>
//         <img src="/path-to-qr.png" alt="QR Code" className="w-40 mx-auto mb-4" />
        
//         <input type="file" onChange={handleFileChange} className="mb-4" />
//         <button
//           onClick={handleUpload}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//         >
//           Upload Payment Screenshot
//         </button>

//         {message && <p className="mt-4 text-gray-700">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Payment;


import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Fotter";

const Payment = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const { state } = useLocation(); // Retrieve state from navigation
  const totalAmount = state?.totalAmount || 0; // Get totalAmount from state

  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("screenshot", file);

    try {
      const response = await axios.post("https://alliedpublications-11.onrender.com/api/payment", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: token },
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error uploading payment:", error);
      setMessage("Failed to upload payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Scan & Pay</h2>
  
        {/* QR Code Image */}
        <img
          src="/path-to-qr.png" // Replace with your QR code image path
          alt="QR Code"
          className="w-64 mx-auto mb-8"
        />
  
        {/* File Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Upload Payment Screenshot:
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75609c] focus:border-transparent"
          />
        </div>
  
        {/* Total Amount */}
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
          <p className="text-lg font-bold text-gray-800">Total Amount: ₹{totalAmount}</p>
        </div>
  
        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="w-full py-3 bg-[#75609c] text-white font-semibold rounded-lg hover:bg-[#5a497a] transition-colors duration-300"
        >
          Upload Payment Screenshot
        </button>
  
        {/* Success/Error Message */}
        {message && (
          <div className="mt-6 text-center">
            <p className="text-gray-700">{message}</p>
            <p className="text-gray-600 mt-2">
              We will get back to you within 24 hours. All the details have been sent to your
              email.
            </p>
            <p className="text-gray-600 mt-2">
              Don't worry, your money is safe with us.
            </p>
            <p className="text-gray-600 mt-2">
              To cancel your order before dispatch, please visit our{" "}
              <a
                href="/contact" // Link to your contact page
                className="text-[#75609c] hover:underline"
              >
                Contact Page
              </a>{" "}
              for assistance.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Payment;