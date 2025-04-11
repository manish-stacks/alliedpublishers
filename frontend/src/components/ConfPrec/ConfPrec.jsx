import React, { useEffect, useState } from "react";
import Fotter from "../Footer/Fotter";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./ConfPrec.css";

const ConfPrec = () => {
  const [conferenceData, setConferenceData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/home/conference`)
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
            <strong>Mobile:</strong> {conferenceData.contact.mobile.join("; ")}{" "}
            <br />
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
