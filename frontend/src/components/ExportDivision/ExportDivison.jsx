// import React from "react";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Fotter";
// import './ExportDivision.css'; 

// const ExportDPage = () => {
//   return (
//     <>
//       <div id="head">
//         <Navbar />
//       </div>
//       <div className="page-container">
//         <main className="exportd-box">
//           <h2>For orders and other queries</h2>
//           <p>
//             Allied Publishers, Export Division has been engaged actively in the field of exports for over thirty years. Our Export clients are situated all over the World. Our main focus regions are South East Asia, Middle East, and Africa, and we are also exporting to Europe and North America. Allied’s Export division has received official recognition in the year 1978 and consequently received seven Export Merit Certificates. It has enjoyed the position as one of the best Exporters of Educational Books and Printing Jobs from India.
//           </p>

//           <section>
//             <h3>Our Exports</h3>
//             <ul>
//               <li>We undertake printing jobs from overseas Governments and Private Publishers.</li>
//               <li>Publication of other Indian publishers for English and other Indian languages.</li>
//             </ul>
//           </section>

//           <section>
//             <h3>Allied Core Areas of Interest</h3>
//             <ul>
//               <li>Allied Higher Academic titles, Engineering, Management & Humanities</li>
//               <li>Allied General Books on Yoga, Cooking, Poetry & Sports</li>
//             </ul>
//           </section>

//           <section>
//             <h3>Customer Categories</h3>
//             <ul>
//               <li>Book Importers (Agents)</li>
//               <li>Book Wholesalers</li>
//               <li>Book Retailers</li>
//               <li>Book Shop Chains</li>
//               <li>Education</li>
//               <li>Ministry of Government</li>
//               <li>Academic Institutes (Schools, Colleges, Institutes of Higher Education, Research Institutes, etc.)</li>
//               <li>Individuals</li>
//             </ul>
//           </section>

//           <section>
//             <h3>Contact Information</h3>
//             <p>If you have any inquiries, please contact our Export Manager:</p>
//             <p><strong>Mr. Hemant Sharma</strong></p>
//             <p>D-5, Sector-2, Noida 201 301, Uttar Pradesh</p>
//             <p><strong>Mobile:</strong> 8377849982</p>
//             <p><strong>Phone:</strong> 0120-2542557; 0120-4320295</p>
//             <p><strong>Email:</strong> <a href="mailto:delhi.books@alliedpublishers.com">delhi.books@alliedpublishers.com</a></p>
//           </section>

//           <section>
//             <p><strong>Note:</strong> Any legal disputes shall be subject to jurisdiction in Delhi-India courts only.</p>
//           </section>
//         </main>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ExportDPage;
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter";
import axios from "axios"; // To fetch data from MongoDB
import "./ExportDivision.css"; // Style sheet for better layout

const ExportInfo = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from your backend API
    axios
      .get("http://localhost:5001/api/home/export-info")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="page-container">
        <main className="export-info-content">
          <h1>Export Division</h1>
          <p>{data.description}</p>

          <h3> Our Exports</h3>
          <ul>
            {data.exports && data.exports.length > 0 ? (
              data.exports.map((exportItem, index) => (
                <li key={index}>{exportItem}</li>
              ))
            ) : (
              <li>No exports available</li>
            )}
          </ul>

          <h3>Allied Core Areas of Interest</h3>
          <ul>
            {data.coreAreas && data.coreAreas.length > 0 ? (
              data.coreAreas.map((area, index) => (
                <li key={index}>{area}</li>
              ))
            ) : (
              <li>No core areas available</li>
            )}
          </ul>

          <h3>Customer Categories</h3>
          <ul>
            {data.customerCategories && data.customerCategories.length > 0 ? (
              data.customerCategories.map((category, index) => (
                <li key={index}>{category}</li>
              ))
            ) : (
              <li>No customer categories available</li>
            )}
          </ul>

          <h3>Contact Information</h3>
          <p>
            <strong>{data.contact.name}</strong><br />
            {data.contact.address}<br />
            <strong>Phone:</strong> {data.contact.phone.join(', ')}<br />
            <strong>Mobile:</strong> {data.contact.mobile}<br />
            <strong>Email:</strong>
            <a href={`mailto:${data.contact.email.join(', ')}`}>{data.contact.email.join(', ')}</a>
          </p>
          <p>
            <em>Note: {data.contact.note}</em>
          </p>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ExportInfo;