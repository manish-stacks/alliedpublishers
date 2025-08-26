import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter"; // Fixed typo in "Footer"
import api from "../../axiosConfig";

const Management = () => {
  const [managementData, setManagementData] = useState(null);

  useEffect(() => {
    api
      .get(`/api/home/management`)
      .then((response) => {
        setManagementData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching management data:", error);
      });
  }, []);

  if (!managementData) {
    return <p className="text-center text-gray-700">Loading...</p>;
  }

  return (
    <>
      <div id="head">
        <Navbar />
      </div>
      <div className="min-h-screen bg-gray-100 py-8">
        <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 text-center border-b-2 border-green-500 pb-3 mb-6">
            Management
          </h2>

          <h3 className="text-2xl font-semibold text-green-600 mt-6 mb-4">
            Board of Directors
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            {managementData.board_of_directors.map((director, index) => (
              <li key={index} className="mb-2">
                <strong>{director.name}</strong> ({director.position})
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-semibold text-green-600 mt-6 mb-4">
            Branches
          </h3>
          {managementData.branches.map((branch, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                {branch.city}
              </h4>
              <ul className="list-disc list-inside text-gray-700">
                {branch.members.map((member, idx) => (
                  <li key={idx} className="mb-2">
                    <strong>{member.name}</strong>{" "}
                    {member.position && `(${member.position})`}{" "}
                    {member.phone && `- ${member.phone}`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Management;
