import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter";
import './AboutUsPage.css';

const AboutUsPage = () => {
  return (
    <>
      <Navbar />
      <div className="about-us-page-container p-8 bg-slate-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-4">History</h1>
        <p className="text-gray-700 mb-6">
          Established in 1934 by M. Graham Brash, the Company was acquired by late Mr. R.N. Sachdev, founder Chairman of Allied Publishers in 1947. Thus started a wholly Indian management, under his inspiring stewardship, and began “The journey of a thousand miles…”
        </p>
        <p className="text-gray-700 mb-6">
          Step by step, from humble beginnings, grew an elaborate network of five branch offices situated in the metro cities and state capitals, supported by Resident Marketing Executives in major University towns—all equipped with fully computerized systems to offer prompt and efficient service.
        </p>
         <br />
        <h2 className="text-3xl font-bold mb-4">Objective</h2>
        <ul className="list-disc ml-8 text-gray-700 space-y-2">
          <li>To provide all types of information published around the world to the Indian customers (both booksellers and end users) as importers, distributors and stockists of foreign publishers.</li>
          <li>To publish and market quality academic books/seminar/symposium/conference proceedings for colleges and higher academic institutes.</li>
          <li>Professionally equipped to service the ever-expanding needs of the Indian Research Community and Industrial Units through the marketing of specialised information products published by International Societies and International Standards through our Specialised Agency Division (Chennai).</li>
          <li>Provide subscription to e-resources (e-journals, e-books, Archives and Databases) of major International Publishers to Academic Libraries, Research Institutions and Corporates.</li>
          <li>To distribute Indian publishers and Indian priced books throughout India.</li>
          <li>To promote Indian publications abroad as leading Exporters, through our Export Division (New Delhi).</li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default AboutUsPage;
