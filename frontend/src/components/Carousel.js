import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";
import "./Carousel.css";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [thirdLink, setThirdLink] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/home/eupheus-link")
    .then((res) => {
      setThirdLink(res.data.link);
    })
    .catch((err) => {
      console.error("Error fetching link:", err);
    });
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await api.get(`/api/home/images`);
      if (res.data) setImages([res.data.image1, res.data.image2, res.data.image3]);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleKnowMoreClick = () => {
    if (currentIndex === 3) {
      window.location.href = thirdLink;
    } else if (currentIndex === 1) {
      navigate("/general-tyles");
    } else {
      navigate("/conf-prec-books");
    }
  };

  // Extend slides for circular effect
  const extendedSlides = images.length
    ? [images[images.length - 1], ...images, images[0]]
    : [];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    if (currentIndex === extendedSlides.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 300);
    } else if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(extendedSlides.length - 2);
      }, 300);
    } else {
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [currentIndex, extendedSlides.length]);

  return (
    <div className="carousel-wrapper">
      {images.length > 0 && (
        <>
          <div
            className="carousel-background"
            style={{ backgroundImage: `url(${images[currentIndex - 1]})` }}
          ></div>
          <div className="carousel-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: isTransitioning ? "transform 0.3s ease" : "none",
              }}
            >
              {extendedSlides.map((slide, index) => (
                <div key={index} className="carousel-slide">
                  <img src={slide} alt={`Slide ${index}`} />
                  <div className="carousel-overlay">
                    <button className="know-more-btn" onClick={handleKnowMoreClick}>
                      {currentIndex === 3 ? `Visit us: ${thirdLink}` : "Know More"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-btn prev" onClick={prevSlide}>
              &#8592;
            </button>
            <button className="carousel-btn next" onClick={nextSlide}>
              &#8594;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
