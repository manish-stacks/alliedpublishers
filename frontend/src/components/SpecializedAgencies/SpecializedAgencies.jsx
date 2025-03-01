// import React from "react";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Fotter";
// import "./SpecializedAgencies.css";

// const SpecializedAgencies = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="page-container">
//         <main className="conf-prec-content">
//           <h1>Specialized Agencies</h1>
//           <p>
//             In tune with the specialized need of researchers, students, academics, and industries, 
//             we are following a progressive policy to serve as an effective link between the sources 
//             of information and the actual users of their products and services.
//           </p>
//           <p>
//             Allied Publishers is promoting and marketing products and services from leading information publishers in <strong>ONLINE</strong> 
//             and a vast wealth of computerized databases.
//           </p>
//           <h3>Key Features</h3>
//           <ul>
//             <li>Frequent workshops and refresher courses for marketing and sales techniques.</li>
//             <li>A dedicated team of sales representatives attached to each branch.</li>
//             <li>Representation of leading Standard Development Organizations (SDO).</li>
//           </ul>
//           <h3>Partner Organizations</h3>
//           <ul>
//             <li>AIAA USA</li>
//             <li>ACCURIS USA (AWS, ISO, NAS, IPC, RTCA, BS, MIL, JIS, etc.)</li>
//             <li>AIST</li>
//             <li>ASTM, USA</li>
//             <li>ASME, USA</li>
//             <li>ASM</li>
//             <li>ASABE</li>
//             <li>Current Associates</li>
//             <li>DIN Media</li>
//             <li>Forecast International</li>
//             <li>IEC</li>
//             <li>JANES UK</li>
//             <li>SAE International</li>
//             <li>Total Materia</li>
//           </ul>
//           <h3>Contact Details</h3>
//           <p>
//             <strong>Mr. R. Krishnan</strong><br />
//             Manager, Information Products<br />
//             Allied Publishers Private Limited<br />
//             25/10, Ethiraj Lane, Commander-in-Chief Road, Egmore 600 008<br />
//             <strong>Phone:</strong> 28223470<br />
//             <strong>Mobile:</strong> 9840227226<br />
//             <strong>Email:</strong> <a href="mailto:rkrishnan@alliedpublishers.com">rkrishnan@alliedpublishers.com</a>, <a href="mailto:alliedpublishers@alliedchennai.net">alliedpublishers@alliedchennai.net</a>
//           </p>
//         </main>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default SpecializedAgencies;
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter";
import axios from "axios"; // To fetch data from MongoDB
import "./SpecializedAgencies.css";

const SpecializedAgencies = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Replace with your actual backend API endpoint that fetches data from MongoDB
    axios
      .get("http://localhost:5001/api/home/special-agency") // Example endpoint
      .then((response) => setData(response.data[0])) // Assuming the data is in an array
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="page-container">
        <main className="conf-prec-content">
          <h1>Specialized Agencies</h1>
          <p>{data.description}</p>
          <p>{data.promotionInfo}</p>
          
          <h3>Key Features</h3>
          <ul>
            {data.keyFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          
          <h3>Partner Organizations</h3>
          <ul>
            {data.partnerOrganizations.map((org, index) => (
              <li key={index}>{org}</li>
            ))}
          </ul>
          
          <h3>Current Associates</h3>
          <ul>
            {data.currentAssociates.map((associate, index) => (
              <li key={index}>{associate}</li>
            ))}
          </ul>
          
          <h3>Contact Details</h3>
          <p>
            <strong>{data.contactDetails.manager}</strong><br />
            {data.contactDetails.designation}<br />
            {data.contactDetails.company}<br />
            {data.contactDetails.address}<br />
            <strong>Phone:</strong> {data.contactDetails.phone}<br />
            <strong>Mobile:</strong> {data.contactDetails.mobile}<br />
            <strong>Email:</strong> 
            {data.contactDetails.email.map((email, index) => (
              <span key={index}>
                <a href={`mailto:${email}`}>{email}</a>
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
