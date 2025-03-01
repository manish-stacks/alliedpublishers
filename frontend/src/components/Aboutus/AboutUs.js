// import React from 'react';
// import './Aboutus.css'; // Import the CSS file

// const AboutUs = () => {
//   return (
//     <section id="about-us">
//       <h1>ABOUT US</h1>
//       <div className="about-us-content">
//         {/* About Us Image */}
//         <img
//           src="https://www.dropbox.com/scl/fi/wynbyixxetjsxc4def4i1/award-pic.jpg?rlkey=is0qurzu6y5j4k0xrft6xwht7&raw=1
//           "
//           />
//           <img
//           src="/images/Final pic.jpg
//           "
//           alt="About Us"
//           className="about-us-image"
//         />
//         {/* About Us Text */}
//         <div className="about-us-text">
//           <p>
//           Established in 1934 by M. Graham Brash, the Company was acquired by late Mr. R.N. Sachdev, founder
// Chairman of Allied Publishers in 1947. Thus started a wholly Indian management, under his inspiring
// stewardship, and began “The journey of a thousand miles…”
// Step by step, from humble beginnings, grew an elaborate network of four branch offices situated in the
// metro cities and state capitals, supported by Resident Marketing Executives in major University
// towns—all equipped with fully computerized systems to offer prompt and efficient service.
//           </p>
//           <p>
//             Our mission is to inspire and educate through our collection, offering quality and variety that you can trust.
//             Explore our collection and discover the joy of reading!
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutUs;


// import React from 'react';
// import './Aboutus.css'; // Import the CSS file

// const AboutUs = () => {
//   return (
//     <section id="about-us">
//       <h1>ABOUT US</h1>
//       <div className="about-us-content">
//         {/* About Us Images */}
//         <img
//           src="https://www.dropbox.com/scl/fi/bq9qvfkm7urslgybdkttb/Screenshot-2025-01-26-at-1.25.55-PM.png?rlkey=j1lbqj1z1f2umntjiq7yk48zc&st=7bqlf749&raw=1"
//           alt="Award Pic"
//           className="about-us-image"
//         />
        
//         {/* About Us Text */}
//         <div className="about-us-text">
//           <p>
//             Established in 1934 by M. Graham Brash, the Company was acquired by late Mr. R.N. Sachdev, 
//             founder Chairman of Allied Publishers in 1947. Thus started a wholly Indian management, 
//             under his inspiring stewardship, and began “The journey of a thousand miles…” Step by 
//             step, from humble beginnings, grew an elaborate network of four branch offices situated 
//             in the metro cities and state capitals, supported by Resident Marketing Executives in 
//             major University towns—all equipped with fully computerized systems to offer prompt and 
//             efficient service.
//           </p>
//           <p>
//             Our mission is to inspire and educate through our collection, offering quality and variety 
//             that you can trust. Explore our collection and discover the joy of reading!
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutUs;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Import Axios for API calls
// import './Aboutus.css'; // Import the CSS file
// const API_BASE_URL = "process.env.REACT_APP_BACKEND_URL";

// const AboutUs = () => {
//   const [aboutUsData, setAboutUsData] = useState(null);

//   useEffect(() => {
//     // Fetch About Us data from the backend
//     axios
//       .get("http://localhost:5001/api/home/about-us") // Adjust the backend URL if needed
//       .then((response) => {
//         setAboutUsData(response.data); // Set the About Us data
//       })
//       .catch((error) => {
//         console.error("Error fetching About Us data:", error);
//       });
//   }, []); // Empty dependency array to run only once when component mounts

//   // Show loading text until data is fetched
//   if (!aboutUsData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <section id="about-us">
//       <h1>{aboutUsData.title}</h1> {/* Dynamically display the title */}
//       <div className="about-us-content">
//         {/* About Us Image */}
//         <img
//           src={aboutUsData.content.image} // Dynamically use image URL from the backend
//           alt="Award Pic"
//           className="about-us-image"
//         />
        
//         {/* About Us Text */}
//         <div className="about-us-text">
//           {aboutUsData.content.description.map((paragraph, index) => (
//             <p key={index}>{paragraph}</p> // Map over the description array and display each paragraph
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutUs;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Aboutus.css";

// const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const AboutUs = () => {
  const [aboutUsData, setAboutUsData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/home/about-us")
      .then((response) => setAboutUsData(response.data))
      .catch((error) => console.error("Error fetching About Us data:", error));
  }, []);

  if (!aboutUsData) {
    return <div>Loading...</div>;
  }

  return (
    <section id="about-us">
      <h1>{aboutUsData.title}</h1>
      <div className="about-us-content">
        <img src={aboutUsData.content.image} alt="Award Pic" className="about-us-image" />
        <div className="about-us-text">
          {aboutUsData.content.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
