// import React from 'react';
// import Navbar from '../Navbar/Navbar';
// import Footer from '../Footer/Fotter';
// import './Contactpage.css';

// const ContactPage = () => {
//   return (
//     <>
//       <div id="head">
//         <Navbar />
//       </div>
//       <div className="export-d-page">
//         <main className="export-d-details">
//           <h2>Branches</h2>

//           {/* Delhi Office */}
//           <section>
//             <h3>Noida Office</h3>
//             <ul>
//               <li><strong>Address:</strong> D-5, Sector-2, Noida–201 301</li>
//               <li><strong>Ph. Nos.:</strong> 0120-4320295 / 2542557 / 4352866</li>
//               <li><strong>E-mail:</strong> <a href="mailto:delhi.books@alliedpublishers.com">delhi.books@alliedpublishers.com</a></li>
//             </ul>
//           </section>

//           {/* Kolkata Office */}
//           <section>
//             <h3>Kolkata Office</h3>
//             <ul>
//               <li><strong>Address:</strong> 17 Chittaranjan Avenue, Kolkata–700072</li>
//               <li><strong>Ph.:</strong> 033-22129618</li>
//               <li><strong>E-mail:</strong> <a href="mailto:cal.books@alliedpublishers.com">cal.books@alliedpublishers.com</a></li>
//             </ul>
//           </section>

//           {/* Mumbai Office */}
//           <section>
//             <h3>Mumbai Office</h3>
//             <ul>
//               <li><strong>Address:</strong> 15 J.N. Heredia Marg, Ballard Estate, Mumbai–400001</li>
//               <li><strong>Ph.:</strong> 022-42126969</li>
//               <li><strong>E-mail:</strong> <a href="mailto:mumbai.books@alliedpublishers.com">mumbai.books@alliedpublishers.com</a></li>
//             </ul>
//           </section>

//           {/* Chennai Office */}
//           <section>
//             <h3>Chennai Office</h3>
//             <ul>
//               <li><strong>Address:</strong> No. 25/10, Commander-in-Chief Road, Ethiraj Lane (Next to Post Office), Egmore, Chennai–600008</li>
//               <li><strong>Ph.:</strong> 044-28223938</li>
//               <li><strong>E-mail:</strong> <a href="mailto:chennai.books@alliedpublishers.com">chennai.books@alliedpublishers.com</a></li>
//             </ul>
//           </section>

//           {/* Bangalore Office */}

//         </main>
    
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default ContactPage;
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Fotter';
import './Contactpage.css';

const ContactPage = () => {
  const [branchData, setBranchData] = useState(null);
  const [loading, setLoading] = useState(true);  // New loading state for better UX
  const [error, setError] = useState(null);      // Error handling state

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/home/contact");
        const data = await response.json();
        console.log('Fetched Data:', data);  // Log data to check its structure
  
        // Access the nested branches array: data.branches[0].branches
        if (data && data.branches && data.branches[0].branches) {
          setBranchData(data.branches[0].branches);  // Access the second-level branches array
        } else {
          setError('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching branch data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchBranchData();
  }, []);
  
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div id="head">
        <Navbar />
      </div>
      <div className="export-d-page">
        <main className="export-d-details">
          <h2>Branches</h2>

          {/* Iterate through branch data */}
          {branchData && branchData.length > 0 ? (
            branchData.map((branch, index) => (
              <section key={index}>
                <h3>{branch.city} Office</h3>
                <ul>
                  <li><strong>Address:</strong> {branch.address}</li>
                  <li><strong>Ph. Nos.:</strong> {branch.phone.join(' / ')}</li>
                  <li><strong>E-mail:</strong> <a href={`mailto:${branch.email}`}>{branch.email}</a></li>
                </ul>
              </section>
            ))
          ) : (
            <p>No branches data available.</p>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;


