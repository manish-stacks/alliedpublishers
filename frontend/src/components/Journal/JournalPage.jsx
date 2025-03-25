import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter";
import axios from "axios";

const JournalPage = () => {
  const [journal, setJournal] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/home/journal")
      .then((response) => setJournal(response.data))
      .catch((error) => console.error("Error fetching journal data:", error));
  }, []);

  if (!journal) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center border-b-2 border-green-500 pb-3 mb-6">
            {journal.title}
          </h1>

          {/* Description (Not Bold) */}
          <section className="mb-6">
            {journal.description.map((para, index) => (
              <p key={index} className="text-gray-700 text-lg mb-4">
                {para}
              </p>
            ))}
          </section>

          {/* Services */}
          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Our Services
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {journal.services.map((service, index) => (
                <li key={index} className="mb-2">
                  {service}
                </li>
              ))}
            </ul>
          </section>

          {/* Special Services */}
          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Our Special Services
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {journal.specialServices.map((service, index) => (
                <li key={index} className="mb-2">
                  {service}
                </li>
              ))}
            </ul>
          </section>

          {/* Journals & Magazines */}
          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Journals & Magazines
            </h3>
            <p className="text-gray-700 text-lg mb-4">
              {journal.journalsAndMagazines.overview}
            </p>
            <h4 className="text-xl font-semibold text-gray-800 mb-3">
              Strategies:
            </h4>
            <ul className="list-disc list-inside text-gray-700">
              {journal.journalsAndMagazines.strategies.map((strategy, index) => (
                <li key={index} className="mb-2">
                  {strategy}
                </li>
              ))}
            </ul>
          </section>

          {/* Branches */}
          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Branches
            </h3>
            {journal.branches.map((branch, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-md mb-4 border border-gray-200"
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {branch.city}
                </h4>
                <p className="text-gray-700 text-lg">📍 {branch.address}</p>
                <p className="text-gray-700 text-lg">👤 {branch.contactPerson}</p>
                <p className="text-gray-700 text-lg">📞 {branch.phone.join(", ")}</p>
                <p className="text-gray-700 text-lg">
                  📧{" "}
                  {branch.email.map((email, idx) => (
                    <span key={idx}>
                      <a
                        href={`mailto:${email}`}
                        className="text-green-600 hover:text-blue-600"
                      >
                        {email}
                      </a>
                      {idx < branch.email.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default JournalPage;