// import React from 'react';
// import Navbar from '../Navbar/Navbar';
// import Footer from '../Footer/Fotter';


// const DistributionPage = () => {
//   return (
//     <>
//       <div id="head">
//         <Navbar />
//       </div>
//       <div className="export-d-page">
//         <main className="export-d-details">
//           <h2>Distribution Importers, Distributors, and Stockist of International and Indian Publishers</h2>

//           <p>
//             Allied Publishers Private Limited has been stocking and selling commercial and society book publications for over 75 years. These books have been used at all major academic, research, and corporate institutions throughout the length and breadth of the country. We have marketing, stocking, and selling arrangements with more than 100 publishers from North America, Europe, Asia, Australia, and even Africa.
//           </p>

//           <p>
//             For a list of International Publishers, Indian Publishers, Standard Publications, and Specialised Society Publications, please refer to the information below.
//           </p>

//           {/* International Publishers */}
//           <section>
//           <br />
//             <h3><b>International Publishers</b></h3><br />
//             <ul>
//               <li>1. Cambridge University Press</li>
//               <li>2. Elsevier Science Limited</li>
//               <li>3. Hanser Verlag</li>
//               <li>4. John Wiley & Sons</li>
//               <li>5. W W Norton</li>
//               <li>6. Harvard University Press</li>
//               <li>7. Princeton University Press</li>
//               <li>8. MIT Press</li>
//               <li>9. O'Reilly</li>
//               <li>10. McGraw Hill Book Co.</li>
//               <li>11. Bloomsbury</li>
//               <li>12. Pearson Education</li>
//               <li>13. Royal Society of Chemistry</li>
//               <li>14. Springer Verlag</li>
//               <li>15. Taylor & Francis</li>
//               <li>16. Cengage</li>
//               <li>17. Walter de Gruyter</li>
//               <li>18. World Scientific Publishing Co.</li>
//             </ul>
//           </section>

//           {/* Specialised Agencies */}
//           <section>
//             <br />
//             <h3><b>Specialised Agencies</b></h3><br />
//             <ul>
//               <li>1. ASTM</li>
//               <li>2. American Society of Mechanical Engineers</li>
//               <li>3. American Society of Metals</li>
//               <li>4. Association of Iron & Steel Technology</li>
//               <li>5. American Institute of Aeronautics & Astronautics</li>
//               <li>6. American Society for Quality Press</li>
//               <li>7. American Society of Non-Destructive Testing</li>
//               <li>8. Beuth Verlag (DIN)</li>
//               <li>9. Industrial Press</li>
//               <li>10. HIS Publishing Group</li>
//               <li>11. Instrument Society of America</li>
//               <li>12. International Electro-Technical Information Service</li>
//               <li>13. SAE International</li>
//             </ul>
//           </section>

//           {/* Indian Publishers */}
//           <section>
//             <br />
//             <h3><b>Indian Publishers</b></h3><br />
//             <ul>
//               <li>1. CBS</li>
//               <li>2. Elsevier India Ltd</li>
//               <li>3. Narosa Book Distributors (Pvt) Ltd</li>
//               <li>4. New Age International (Pvt) Ltd</li>
//               <li>5. Prentice Hall of India (PHI)</li>
//               <li>6. Pearson Education</li>
//               <li>7. Scitech Publications</li>
//               <li>8. Shroff Publications</li>
//               <li>9. T.M.H</li>
//               <li>10. Wiley Dream Tech India (P) Ltd</li>
//               <li>11. Oxford University Press</li>
//               <li>12. Laxmi Publications Pvt Ltd</li>
//             </ul>
//           </section>
//         </main>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default DistributionPage;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter";

const DistributionPage = () => {
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/home/publisher")
      .then((response) => {
        setPublishers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching publishers:", error);
      });
  }, []);

  return (
    <>
      <div id="head">
        <Navbar />
      </div>
      <div className="export-d-page">
        <main className="export-d-details">
          <h2>Distribution Importers, Distributors, and Stockist of International and Indian Publishers</h2>
          
          <p>
          Allied Publishers Private Limited has been stocking and selling commercial and society book publications for the last 75 years. These books have been used at all major academic, research and corporate institutions throughout the length and breadth of the country. We have marketing, stocking and selling arrangements with more than 100 publishers from North America, Europe, Asia, Australia and even Africa. 

For a list of International Publishers, Indian Publishers, Standard Publications and Specialised Society Publications please refer to the information below. 	
          </p>

          {/* Publishers List */}
          <section>
           
            {publishers.length > 0 ? (
        publishers.map((categoryData, index) => (
          <div key={index}>
            <h2>{categoryData.category}</h2>
            <ul>
              {categoryData.publishers.map((publisher, idx) => (
                <li key={idx}>{publisher}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
              <p>Loading publishers...</p>
            )}
          </section>

        </main>
      </div>
      <Footer />
    </>
  );
};

export default DistributionPage;
