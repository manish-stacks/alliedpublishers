import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";
import "./Bestseller.css"; // CSS file
import { FaArrowRight } from "react-icons/fa";
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const Bestsellers = () => {
  const [products, setProducts] = useState([]); // Bestseller books ka state

  useEffect(() => {
    api
      .get(`/api/home/bestsellers`) // API call
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching bestsellers:", err));
  }, []);

  return (
    <div id="Bestsellers">
      <h1>
        {"BESTSELLERS".split("").map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </h1>
      <br />
      <br />
      <div id="images">
        {products.map((product) => (
          <div className="product" key={product._id} data-id={product._id}>
            <img src={product.image} alt={product.name} />
            <div className="content">
              <h5>{product.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bestsellers;
