import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminAboutUsPage = () => {
  const [historyTitle, setHistoryTitle] = useState("");
  const [historyContent, setHistoryContent] = useState([""]);
  const [objectiveTitle, setObjectiveTitle] = useState("");
  const [objectives, setObjectives] = useState([""]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/about-us-page`)
      .then((response) => {
        if (response.data) {
          setHistoryTitle(response.data.historyTitle);
          setHistoryContent(response.data.historyContent);
          setObjectiveTitle(response.data.objectiveTitle);
          setObjectives(response.data.objectives);
        }
      })
      .catch((error) => console.error("Error fetching About Us Page data:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/about-us-page`, {
        historyTitle,
        historyContent,
        objectiveTitle,
        objectives
      });
      alert("About Us Page updated successfully!");
    } catch (error) {
      console.error("Error updating About Us Page:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />

      <div className="flex flex-1 justify-center items-center px-12 ml-64">
        <div className="w-full max-w-4xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
          <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
            Admin Panel - Edit About Us Page
          </h3>

          <form onSubmit={handleSubmit}>
            {/* History Section */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-black uppercase mb-4 border-b-2 border-gray-300 pb-2">
                History Section
              </h4>
              
              <label className="block text-lg font-bold text-black uppercase mb-1">
                History Title:
              </label>
              <input
                type="text"
                value={historyTitle}
                onChange={(e) => setHistoryTitle(e.target.value)}
                required
                className="w-full p-3 text-center text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg mb-4"
              />

              <label className="block text-lg font-bold text-black uppercase mb-1">
                History Content:
              </label>
              {historyContent.map((para, index) => (
                <textarea
                  key={`history-${index}`}
                  value={para}
                  onChange={(e) => {
                    const newContent = [...historyContent];
                    newContent[index] = e.target.value;
                    setHistoryContent(newContent);
                  }}
                  className="w-full p-3 text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg min-h-[100px] resize-y mb-2"
                />
              ))}
              <button
                type="button"
                onClick={() => setHistoryContent([...historyContent, ""])}
                className="px-4 py-2 text-white font-bold uppercase bg-[#402f5f] rounded-lg transition hover:bg-[#5a447c] hover:shadow-md hover:scale-105 active:scale-95 text-sm mt-2"
              >
                Add History Paragraph
              </button>
            </div>

            {/* Objectives Section */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-black uppercase mb-4 border-b-2 border-gray-300 pb-2">
                Objectives Section
              </h4>
              
              <label className="block text-lg font-bold text-black uppercase mb-1">
                Objective Title:
              </label>
              <input
                type="text"
                value={objectiveTitle}
                onChange={(e) => setObjectiveTitle(e.target.value)}
                required
                className="w-full p-3 text-center text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg mb-4"
              />

              <label className="block text-lg font-bold text-black uppercase mb-1">
                Objectives:
              </label>
              {objectives.map((obj, index) => (
                <textarea
                  key={`objective-${index}`}
                  value={obj}
                  onChange={(e) => {
                    const newObjectives = [...objectives];
                    newObjectives[index] = e.target.value;
                    setObjectives(newObjectives);
                  }}
                  className="w-full p-3 text-black font-medium border-2 border-[#75609c] rounded-lg outline-none transition focus:border-[#0047AB] focus:shadow-lg min-h-[100px] resize-y mb-2"
                />
              ))}
              <button
                type="button"
                onClick={() => setObjectives([...objectives, ""])}
                className="px-4 py-2 text-white font-bold uppercase bg-[#402f5f] rounded-lg transition hover:bg-[#5a447c] hover:shadow-md hover:scale-105 active:scale-95 text-sm mt-2"
              >
                Add Objective
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-8 py-3 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95"
              >
                Save All Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAboutUsPage;