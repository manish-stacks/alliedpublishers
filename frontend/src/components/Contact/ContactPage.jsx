import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter";
import "./Contactpage.css";

const ContactPage = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    api
      .get(`/api/home/contact`)
      .then((response) => setBranches(response.data))
      .catch((error) => console.error("Error fetching branches:", error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="export-d-page">
        <main className="export-d-details">
          <h2>Branches</h2>
          {branches.map((branch) => (
            <section key={branch._id}>
              <h3>{branch.city} Office</h3>
              <ul>
                <li>
                  <strong>Address:</strong> {branch.address}
                </li>
                <li>
                  <strong>Phone:</strong> {branch.phone.join(", ")}
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${branch.email}`}>{branch.email}</a>
                </li>
              </ul>
            </section>
          ))}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
