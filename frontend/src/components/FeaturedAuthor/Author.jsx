import React, { useState, useEffect } from 'react';
import './Author.css';

const Author = ({ authors }) => {
  const [currentAuthorIndex, setCurrentAuthorIndex] = useState(0);

  useEffect(() => {
    // Automatically change author every 3-4 seconds
    const interval = setInterval(() => {
      setCurrentAuthorIndex((prevIndex) => (prevIndex + 1) % authors.length);
    }, 8000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [authors]);

  const nextAuthor = () => {
    setCurrentAuthorIndex((prevIndex) => (prevIndex + 1) % authors.length);
  };

  // Check if authors are available
  if (!authors || authors.length === 0) {
    return <div>Loading...</div>; // Or you can display a message like "No authors found"
  }

  const currentAuthor = authors[currentAuthorIndex];

  return (
    <>
      <div id="Author">
        <h1>FEATURED AUTHORS</h1>
      </div>
      <button onClick={nextAuthor} className="next-button">
        <span className="next-button-text">Next</span>
        <span className="arrow">→</span>
      </button>

      <div className="author-container">
        {/* Check if currentAuthor has image property */}
        <img
          key={currentAuthor?.image || 'default'} // Fallback to 'default' if image is missing
          src={currentAuthor?.image || 'https://via.placeholder.com/150'} // Placeholder image if no image is found
          alt={currentAuthor?.name || 'Unknown Author'}
          className="author-image"
        />
        <div className="author-info">
          <h1 className="author-name">{currentAuthor?.name}</h1>
          <p className="author-description">{currentAuthor?.description}</p>
          <div className="author-books">
            <h2>Notable Works</h2>
            <ul>
              {currentAuthor?.notableWorks?.map((work, index) => (
                <li key={index}>{work}</li>
              ))}
            </ul>
            <button className="explore-btn">
              Explore His/Her Books <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Author;
