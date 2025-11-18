import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter";
import './AboutUsPage.css';

const AboutUsPage = () => {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    api
      .get(`/api/about-us-page`)
      .then(response => setPageData(response.data))
      .catch(error => console.error("Error fetching About Us Page data:", error));
  }, []);
  

  if (!pageData) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="about-us-page-container p-8 bg-slate-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-4">{pageData.historyTitle}</h1>
        {pageData.historyContent.map((paragraph, index) => (
          <p key={`history-${index}`} className="text-gray-700 mb-6">
            {paragraph}
          </p>
        ))}
        
        <br />
        
        <h2 className="text-3xl font-bold mb-4">{pageData.objectiveTitle}</h2>
        <ul className="list-disc ml-8 text-gray-700 space-y-2">
          {pageData.objectives.map((objective, index) => (
            <li key={`objective-${index}`}>{objective}</li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default AboutUsPage;