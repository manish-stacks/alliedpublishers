import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter";
import axios from "axios";

const SpecializedAgencies = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/home/special-agency")
      .then((response) => setData(response.data[0]))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center border-b-2 border-green-500 pb-3 mb-6">
            Specialized Agencies
          </h1>
          <p className="text-gray-700 text-lg mb-4">{data.description}</p>
          <p className="text-gray-700 text-lg mb-4">{data.promotionInfo}</p>

          <h3 className="text-2xl font-semibold text-green-600 mt-6 mb-4">
            Key Features
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            {data.keyFeatures.map((feature, index) => (
              <li key={index} className="mb-2">
                {feature}
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-semibold text-green-600 mt-6 mb-4">
            Partner Organizations
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            {data.partnerOrganizations.map((org, index) => (
              <li key={index} className="mb-2">
                {org}
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-semibold text-green-600 mt-6 mb-4">
            Current Associates
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            {data.currentAssociates.map((associate, index) => (
              <li key={index} className="mb-2">
                {associate}
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-semibold text-green-600 mt-6 mb-4">
            Contact Details
          </h3>
          <p className="text-gray-700 text-lg">
            <strong className="text-gray-800">{data.contactDetails.manager}</strong>
            <br />
            {data.contactDetails.designation}
            <br />
            {data.contactDetails.company}
            <br />
            {data.contactDetails.address}
            <br />
            <strong className="text-gray-800">Phone:</strong> {data.contactDetails.phone}
            <br />
            <strong className="text-gray-800">Mobile:</strong> {data.contactDetails.mobile}
            <br />
            <strong className="text-gray-800">Email:</strong>{" "}
            {data.contactDetails.email.map((email, index) => (
              <span key={index}>
                <a href={`mailto:${email}`} className="text-green-600 hover:text-blue-600">
                  {email}
                </a>
                {index < data.contactDetails.email.length - 1 && ", "}
              </span>
            ))}
          </p>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default SpecializedAgencies;