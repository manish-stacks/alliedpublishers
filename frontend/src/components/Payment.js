import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../axiosConfig";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Fotter";
import { Link } from "react-router-dom";

const Payment = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [qrCode, setQRCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const totalAmount = state?.totalAmount || 0;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await api.get(`/api/qrcode`);
        setQRCode(response.data);
      } catch (error) {
        console.error("Error fetching QR code:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQRCode();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("screenshot", file);

    try {
      const response = await api.post(
        `/api/payment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token
          }
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error uploading payment:", error);
      setMessage("Failed to upload payment");
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50">Loading...</div>;
  }

  if (!qrCode) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Currently Unavailable
          </h2>
          <p className="text-gray-600">
            QR code payment is not configured. Please check back later.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Scan & Pay</h2>
  
        {/* QR Code Image from backend */}
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}${qrCode.imagePath}`}
          alt="QR Code"
          className="w-64 mx-auto mb-8"
        />
  
        {/* Rest of your payment form remains the same */}
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
  
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
          <p className="text-lg font-bold text-gray-800">Total Amount: ₹{totalAmount}</p>
        </div>
  
        <button
          onClick={handleUpload}
          className="w-full py-3 bg-[#75609c] text-white font-semibold rounded-lg hover:bg-[#5a497a] transition-colors duration-300"
        >
          Upload Payment Screenshot
        </button>
  
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
              <Link to="/contact" // Link to your contact page
                className="text-[#75609c] hover:underline"
              >
                Contact Page
              </Link>{" "}
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