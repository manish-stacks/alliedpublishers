import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter";

const AllAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading authors...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-6 bg-red-50 rounded-lg max-w-md mx-auto">
            <p className="text-red-500 font-medium">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              Retry
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
            All Featured Authors
          </h1>

          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {authors.map((author) => (
              <div
                key={author._id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden
                flex flex-col sm:flex-row"
              >
                {/* Image Container - Responsive sizing */}
                <div className="w-full sm:w-1/3 lg:w-1/4 p-4 sm:p-6 flex justify-center">
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-full max-w-xs sm:max-w-full h-auto object-cover rounded-lg
                    max-h-60 sm:max-h-none"
                    loading="lazy"
                  />
                </div>

                {/* Content Container */}
                <div className="w-full sm:w-2/3 lg:w-3/4 p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2 sm:mb-3">
                    {author.name}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed text-justify">
                    {author.description}
                  </p>

                  {author.notableWorks && author.notableWorks.length > 0 && (
                    <div className="text-gray-700">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                        Notable Works:
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                        {author.notableWorks.map((work, idx) => (
                          <li key={idx} className="text-gray-600">
                            {work}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllAuthors;
