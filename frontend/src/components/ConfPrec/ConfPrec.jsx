// import React from "react";
// import Fotter from "../Footer/Fotter";
// import Navbar from "../Navbar/Navbar";
// import './ConfPrec.css'; 


// const ConfPrec = () => {
//   return (
//     <>
//       <div id="head">
//         <Navbar />
//       </div>
//       <div className="page-container">
//         <main className="conf-prec-content">
//           <h1>Conference proceedings</h1>
//           <p>
//             Allied Publishers have, in recent years, become the leading publishers for 
//             proceedings of national and international seminars/symposia (pre- and 
//             post-conferences) held across the country. In fact, we have set up a dedicated 
//             unit to handle seminar/symposium/conference proceedings, e-books, and web 
//             presentation files. In the recent past, we have published numerous works of 
//             this nature.
//           </p>
//           <p>
//             Our strength lies in having an entire editorial, printing, and production setup 
//             under one roof. We have published proceedings of conferences hosted by:
//           </p>
//           <ul>
//             <li>Indian Institutes of Technology</li>
//             <li>Indian Institutes of Management</li>
//             <li>Department of Atomic Energy establishments (e.g., BARC, NFC, CAT)</li>
//             <li>The Indian Institute of Metals, Bokaro</li>
//             <li>CSIR Laboratories</li>
//             <li>DRDO Laboratories</li>
//             <li>Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore</li>
//             <li>University of Agricultural Sciences, Bangalore</li>
//             <li>
//               Centre for Science & Technology of the Non-Aligned and other Developing 
//               Countries (NAM S&T Centre), New Delhi
//             </li>
//             <li>The Institution of Engineers</li>
//             <li>Meenakshi College for Women (Autonomous), Chennai</li>
//             <li>National Institutes of Technology</li>
//             <li>And many other institutions/organizations</li>
//           </ul>
//           <h3>Specialized Services</h3>
//           <p>We offer a range of services, including:</p>
//           <ul>
//             <li>Cover preparation, including visuals highlighting the content</li>
//             <li>Formatting the book with uniform style and consistency</li>
//             <li>Complete setting of prelim pages like title page, copyright page, and more</li>
//             <li>Proofreading to ensure illustrations and tables are properly referenced</li>
//             <li>
//               Uniform styling for article headings, author affiliations, and complete formatting
//             </li>
//             <li>Preparation of the author index and cross-referencing for multi-volume proceedings</li>
//             <li>Providing ISBN number and Bar Code</li>
//             <li>Delivery of material to your institute without additional charges in India</li>
//             <li>
//               Uploading books to top-selling portals like Amazon, Flipkart, and Google Play via our 
//               partner, REPRO BOOKS, ensuring the book is never out of stock
//             </li>
//           </ul>
//           <h3>Contact Us</h3>
//           <p>
//             <strong>Mr. Jagdish Singh</strong><br />
//             Editorial Assistant<br />
//             Allied Publishers Private Limited<br />
//             D-5, Sector-2, Noida-201 301, Uttar Pradesh<br />
//             <strong>Mobile:</strong> 9899 33 5174; 8383 069 101<br />
//             <strong>Email:</strong>{" "}
//             <a href="mailto:editorials@alliedpublishers.com">
//               editorials@alliedpublishers.com
//             </a>
//           </p>
//         </main>
//       </div>
//       <Fotter/>
//     </>
//   );
// };

// export default ConfPrec;
import React, { useEffect, useState } from "react";
import Fotter from "../Footer/Fotter";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./ConfPrec.css";

const ConfPrec = () => {
  const [conferenceData, setConferenceData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/home/conference") // Backend URL fix
      .then((response) => {
        setConferenceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching conference data:", error);
      });
  }, []);

  if (!conferenceData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div id="head">
        <Navbar />
      </div>
      <div className="page-container">
        <main className="conf-prec-content">
          <h1>Conference Proceedings</h1>
          <p>{conferenceData.description}</p>

          <h3>Institutions Hosted</h3>
          <ul>
            {conferenceData.institutions.map((inst, index) => (
              <li key={index}>{inst}</li>
            ))}
          </ul>

          <h3>Specialized Services</h3>
          <ul>
            {conferenceData.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>

          <h3>Contact Us</h3>
          <p>
            <strong>{conferenceData.contact.name}</strong> <br />
            {conferenceData.contact.position} <br />
            {conferenceData.contact.company} <br />
            {conferenceData.contact.address} <br />
            <strong>Mobile:</strong> {conferenceData.contact.mobile.join("; ")} <br />
            <strong>Email:</strong>{" "}
            <a href={`mailto:${conferenceData.contact.email[0]}`}>
              {conferenceData.contact.email[0]}
            </a>
          </p>
        </main>
      </div>
      <Fotter />
    </>
  );
};

export default ConfPrec;
