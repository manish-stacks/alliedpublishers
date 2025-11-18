import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";
import { FaMapPin } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Carousel from "../Carousel";
import AboutUs from "../Aboutus/AboutUs";
import Bestsellers from "../Bestseller/Bestseller";
import Author from "../FeaturedAuthor/Author";
import Footer from "../Footer/Fotter";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;


const Home = () => {
  const [locations, setLocations] = useState([]);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    api
      .get(`/api/home/locations`)
      .then((res) => setLocations(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .get(`/api/home/bestsellers`)
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .get(`/api/home/authors`)
      .then((res) => setAuthors(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* 📍 Locations Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center ml-4 sm:ml-12 mt-1 px-2 sm:px-0">
  <p className="text-gray-600 font-semibold mb-2 sm:mb-0 sm:mr-5 whitespace-nowrap">
    Available Locations:
  </p>
  <div className="flex flex-wrap items-center gap-x-2 gap-y-2 px-2 py-1 w-full sm:max-w-xs">
    {locations.map((loc, index) => (
      <span
        key={index}
        className="flex items-center text-gray-800 hover:text-red-500 transition text-sm whitespace-nowrap"
      >
        <FaMapPin className="text-red-500 text-lg mr-1" />
        {loc.name}
      </span>
    ))}
  </div>
</div>

      {/* 🎡 Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 bg-slate-200 shadow-lg rounded-lg">
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Discover Our Books Collection</h1>
          <p className="text-gray-600 text-base">Explore a variety of books to suit your needs.</p>
          <blockquote className="italic text-gray-500 border-l-4 border-green-500 pl-3">"Knowledge with an edge."</blockquote>
        </div>
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <Carousel />
        </div>
      </section>

      <AboutUs />
      <Bestsellers />
      <div id="Authors">
        <Author authors={authors} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
