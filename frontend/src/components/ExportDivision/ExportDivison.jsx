import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter";
import axios from "axios";

const ExportInfo = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/home/export-info`)
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center border-b-2 border-green-500 pb-3 mb-6">
            Export Division
          </h1>
          <p className="text-gray-700 text-lg mb-6">{data.description}</p>

          <h3 className="text-2xl font-semibold text-green-600 mt-6 mb-4">
            Our Exports
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            {data.exports && data.exports.length > 0 ? (
              data.exports.map((exportItem, index) => (
                <li key={index} className="mb-2">
                  {exportItem}
                </li>
              ))
            ) : (
              <li>No exports available</li>
            )}
          </ul>

          <h3 className="text-2xl font-semibold text-green-600 mt-6 mb-4">
            Allied Core Areas of Interest
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            {data.coreAreas && data.coreAreas.length > 0 ? (
              data.coreAreas.map((area, index) => (
                <li key={index} className="mb-2">
                  {area}
                </li>
              ))
            ) : (
              <li>No core areas available</li>
            )}
          </ul>

          <h3 className="text-2xl font-semibold text-green-600 mt-6 mb-4">
            Customer Categories
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            {data.customerCategories && data.customerCategories.length > 0 ? (
              data.customerCategories.map((category, index) => (
                <li key={index} className="mb-2">
                  {category}
                </li>
              ))
            ) : (
              <li>No customer categories available</li>
            )}
          </ul>

          <h3 className="text-2xl font-semibold text-green-600 mt-6 mb-4">
            Contact Information
          </h3>
          <p className="text-gray-700 text-lg">
            <strong className="text-gray-800">{data.contact.name}</strong>
            <br />
            {data.contact.address}
            <br />
            <strong className="text-gray-800">Phone:</strong>{" "}
            {data.contact.phone.join(", ")}
            <br />
            <strong className="text-gray-800">Mobile:</strong>{" "}
            {data.contact.mobile}
            <br />
            <strong className="text-gray-800">Email:</strong>{" "}
            <a
              href={`mailto:${data.contact.email.join(", ")}`}
              className="text-green-600 hover:text-blue-600"
            >
              {data.contact.email.join(", ")}
            </a>
          </p>
          <p className="text-gray-700 text-lg mt-4">
            <em>Note: {data.contact.note}</em>
          </p>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ExportInfo;
