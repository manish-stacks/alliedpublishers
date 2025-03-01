// import React from 'react';
// import Navbar from '../Navbar/Navbar';
// import Footer from '../Footer/Fotter';
// import './management.css';

// const Management = () => {
//   return (
//     <>
//       <div id="head">
//         <Navbar />
//       </div>
//       <div className="management-page">
//         <main className="management-details">
//           <h2>Management</h2>

//           {/* Board of Directors */}
        
//             <h3>Board of Directors</h3>
//             <ul>
//               <li><strong>Mr. Sunil Sachdev</strong> (Managing Director)</li>
//               <li><strong>Mr. Ravi Sachdev</strong> (Director)</li>
//               <li><strong>Mr. Arjun Sachdev</strong> (Director)</li>
//             </ul>
     

//           {/* Branches */}
        
//             <h3>Branches</h3>

//             {/* Noida Branch */}
//             <h4>Noida</h4>
//             <ul>
//               <li><strong>Mr. Sunil Sachdev</strong> (Managing Director) - 9810 054 233</li>
//               <li><strong>Mr. Ravi Sachdev</strong> (Director) - 9810 052 101</li>
//               <li><strong>Mr. R.N. Purwar</strong> (Area Director) - 9810 114 020</li>
//               <li><strong>Mr. Amit Sachdev</strong> (Sales Director)</li>
//               <li><strong>Ms. Tripti Singh</strong> (Publishing Director)</li>
//               <li><strong>Mr. Hemant Sharma</strong> (Sales/Marketing Manager) - 8377 849 982</li>
//             </ul>

//             {/* Mumbai Branch */}
//             <h4>Mumbai</h4>
//             <ul>
//               <li><strong>Mr. Arjun Sachdev</strong> (Director) - 9820 197 606</li>
//               <li><strong>Mr. A. George</strong> (Branch Manager) - 9820 181 716</li>
//             </ul>

//             {/* Chennai Branch */}
//             <h4>Chennai</h4>
//             <ul>
//               <li><strong>Mr. R. Krishnan</strong> (Specialised Agencies Manager) - 9840 227 226</li>
//               <li><strong>Mr. Vasant</strong> (Branch Manager) - 9849 527 263</li>
//             </ul>

//             {/* Kolkata Branch */}
//             <h4>Kolkata</h4>
//             <ul>
//               <li><strong>Mr. Viplav Ghosh</strong> - 9830 129 244</li>
//             </ul>
      
//         </main>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Management;
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter";
import axios from "axios";
import "./management.css";

const Management = () => {
  const [managementData, setManagementData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/home/management") // Update URL as per backend
      .then((response) => {
        setManagementData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching management data:", error);
      });
  }, []);

  if (!managementData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div id="head">
        <Navbar />
      </div>
      <div className="management-page">
        <main className="management-details">
          <h2>Management</h2>

          <h3>Board of Directors</h3>
          <ul>
            {managementData.board_of_directors.map((director, index) => (
              <li key={index}>
                <strong>{director.name}</strong> ({director.position})
              </li>
            ))}
          </ul>

          <h3>Branches</h3>
          {managementData.branches.map((branch, index) => (
            <div key={index}>
              <h4>{branch.city}</h4>
              <ul>
                {branch.members.map((member, idx) => (
                  <li key={idx}>
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
