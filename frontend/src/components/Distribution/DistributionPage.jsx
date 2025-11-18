import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter";
import api from "../../axiosConfig";

const DistributionPage = () => {
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    api
      .get(`/api/home/publisher`)
      .then((response) => setPublishers(response.data))
      .catch((error) => console.error("Error fetching publishers:", error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center border-b-2 border-green-500 pb-3 mb-6">
            Distribution Importers, Distributors, and Stockist of International
            and Indian Publishers
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Allied Publishers Private Limited has been stocking and selling
            commercial and society book publications for the last 75 years.
            These books have been used at all major academic, research and
            corporate institutions throughout the length and breadth of the
            country. We have marketing, stocking and selling arrangements with
            more than 100 publishers from North America, Europe, Asia, Australia
            and even Africa.
            <br />
            <br />
            For a list of International Publishers, Indian Publishers, Standard
            Publications and Specialised Society Publications please refer to
            the information below.
          </p>

          {/* Publishers List */}
          <section>
            {publishers.length > 0 ? (
              publishers.map((categoryData, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-semibold text-green-600 mb-4">
                    {categoryData.category}
                  </h2>
                  <ul className="list-disc list-inside text-gray-700">
                    {categoryData.publishers.map((publisher, idx) => (
                      <li key={idx} className="mb-2">
                        {publisher}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-700">Loading publishers...</p>
            )}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default DistributionPage;
