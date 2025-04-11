import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Aboutus.css";

const AboutUs = () => {
  const [aboutUsData, setAboutUsData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/home/about-us`)
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