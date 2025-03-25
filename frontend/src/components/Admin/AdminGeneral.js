import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminGeneral = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage(""); // Clear previous messages when new file is selected
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    setIsLoading(true);
    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5001/admin/general/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Error uploading file");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />
      
      {/* Main Content Area Shifted Right */}
      <div className="flex-1 flex justify-center items-center px-10 ml-[260px]">
        <div className="w-full max-w-3xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
          <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
            Upload General Tiles Books
          </h3>

          <div className="flex flex-col items-center space-y-6">
            <div className="w-full">
              <label className="block text-lg font-bold text-black uppercase text-center mb-2">
                Select Excel File (.xlsx)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#75609c] border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">XLSX only</p>
                  </div>
                  <input 
                    type="file" 
                    accept=".xlsx" 
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                </label>
              </div>
              {file && (
                <p className="mt-2 text-sm text-center text-gray-700">
                  Selected file: <span className="font-medium">{file.name}</span>
                </p>
              )}
            </div>

            <button 
              onClick={handleUpload}
              disabled={isLoading || !file}
              className={`px-6 py-3 text-white font-bold uppercase rounded-lg transition hover:shadow-md hover:scale-105 active:scale-95 ${
                isLoading || !file 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-[#10263e] hover:bg-[#357ABD]"
              }`}
            >
              {isLoading ? "Uploading..." : "Upload File"}
            </button>

            {message && (
              <div className={`w-full p-3 rounded-lg text-center ${
                message.includes("success") 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                {message}
              </div>
            )}

            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>Note: The Excel file should match the General collection schema.</p>
              <p>Required fields: <span className="font-bold">title</span> and <span className="font-bold">type</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGeneral;