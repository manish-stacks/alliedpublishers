// import React, { useState, useEffect } from 'react';
// import './Author.css';
// import { useNavigate } from 'react-router-dom';

// const Author = ({ authors }) => {
//   const [currentAuthorIndex, setCurrentAuthorIndex] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Automatically change author every 8 seconds
//     const interval = setInterval(() => {
//       setCurrentAuthorIndex((prevIndex) => (prevIndex + 1) % authors.length);
//     }, 8000);

//     // Cleanup interval on component unmount
//     return () => clearInterval(interval);
//   }, [authors]);

//   const nextAuthor = () => {
//     setCurrentAuthorIndex((prevIndex) => (prevIndex + 1) % authors.length);
//   };

//   const handleShowAllAuthors = () => {
//     navigate('/all-authors'); // Navigate to the "All Authors" page
//   };

//   // Check if authors are available
//   if (!authors || authors.length === 0) {
//     return <div>Loading...</div>; // Or display a message like "No authors found"
//   }

//   const currentAuthor = authors[currentAuthorIndex];

//   return (
//     <>
//       <div id="Author">
//         <h1>FEATURED AUTHORS</h1>
//       </div>
//       <button onClick={nextAuthor} className="next-button">
//         <span className="next-button-text">Next</span>
//         <span className="arrow">→</span>
//       </button>

//       <div className="author-container">
//         <img
//           key={currentAuthor?.image || 'default'}
//           src={currentAuthor?.image || 'https://via.placeholder.com/150'}
//           alt={currentAuthor?.name || 'Unknown Author'}
//           className="author-image"
//         />
//         <div className="author-info">
//           <h1 className="author-name">{currentAuthor?.name}</h1>
//           <p className="author-description">{currentAuthor?.description}</p>
//           <div className="author-books">
//             <h2>Notable Works</h2>
//             <ul>
//               {currentAuthor?.notableWorks?.map((work, index) => (
//                 <li key={index}>{work}</li>
//               ))}
//             </ul>
//             {/* Show All Authors Button */}
//             <button onClick={handleShowAllAuthors} className="show-all-button">
//               Show All Authors <span className="arrow">→</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Author;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";

const Author = () => {
  const [authors, setAuthors] = useState([]);
  const [currentAuthorIndex, setCurrentAuthorIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  const navigate = useNavigate();

  // Fetch authors from backend
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await api.get(
          `/api/home/authors`
        );
        setAuthors(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch authors");
        console.error("Error fetching authors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  // Auto-rotate authors with synchronized transitions
  useEffect(() => {
    if (authors.length > 0) {
      const interval = setInterval(() => {
        setTransitionStage("fadeOut");
        setTimeout(() => {
          setCurrentAuthorIndex(
            (prevIndex) => (prevIndex + 1) % authors.length
          );
          setTransitionStage("fadeIn");
        }, 500); // Half second for fade out before changing content
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [authors]);

  const nextAuthor = () => {
    setTransitionStage("fadeOut");
    setTimeout(() => {
      setCurrentAuthorIndex((prevIndex) => (prevIndex + 1) % authors.length);
      setTransitionStage("fadeIn");
    }, 500);
  };

  const handleShowAllAuthors = () => {
    navigate("/all-authors");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#75609c]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-4 bg-red-100 rounded-lg max-w-md">
          <p className="text-red-600 font-medium">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#75609c] text-white rounded hover:bg-[#5a497a] transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!authors || authors.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No authors found</p>
      </div>
    );
  }

  const currentAuthor = authors[currentAuthorIndex];

  return (
    <div className="min-h-screen bg-white mt-[5%] box-border">
      <div id="Author">
        <h1 className="text-center text-[2.25rem] mt-5 mb-[3px] text-[#4a5568] font-[800]">
          FEATURED AUTHORS
        </h1>
      </div>

      <div className="relative">
        <button
          onClick={nextAuthor}
          className="absolute right-[20px] flex items-center px-[8px] py-[7px] border-2 border-[#75609c] text-[#75609c] font-bold rounded-[5px] hover:bg-[#75609c] hover:text-white transition-all duration-300"
        >
          <span className="mr-[10px]">Next</span>
          <span>→</span>
        </button>

        <div
          className={`flex flex-wrap items-center rounded-[50px] max-w-[900px] mx-auto mt-[4%] mb-[5%] 
          ${transitionStage === "fadeOut" ? "opacity-0" : "opacity-100"} 
          transition-opacity duration-500`}
        >
          {/* Author Image */}
          <img
            key={`image-${currentAuthorIndex}`} // Force re-render
            src={currentAuthor?.image || "https://via.placeholder.com/350"}
            alt={currentAuthor?.name || "Author"}
            className="max-w-[350px] h-auto object-cover rounded-l-[10%]"
          />

          {/* Author Info */}
          <div className="flex-1 min-w-[60%] p-4 flex flex-col">
            <h1 className="text-[2.25rem] font-bold text-[#75609c] mb-4 text-left">
              {currentAuthor?.name}
            </h1>
            <p className="text-[1.2rem] leading-[1.6] text-[#333] mb-8 text-justify">
              {currentAuthor?.description}
            </p>

            <div className="author-books">
              <h2 className="text-[1.5rem] mb-4 text-[#75609c] text-justify leading-[1.6]">
                Notable Works
              </h2>
              <ul className="pl-5 m-0 list-disc">
                {currentAuthor?.notableWorks?.map((work, index) => (
                  <li
                    key={index}
                    className="text-[1rem] my-2 text-[#555] text-justify leading-[1.6]"
                  >
                    {work}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleShowAllAuthors}
                className="mt-4 px-4 py-2 bg-transparent border-2 border-[#75609c] text-[#75609c] rounded hover:bg-[#75609c] hover:text-white transition-all duration-300 text-center max-w-[200px]"
              >
                Show All Authors <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
