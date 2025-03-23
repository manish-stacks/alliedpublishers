import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const SearchResults = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`https://alliedpublications-11.onrender.com/api/home/search?query=${query}`);
        setBooks(response.data);
      } catch (err) {
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) return <p>Loading search results...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar setSearchQuery={() => {}} />
      <div className="search-results">
        {books.length === 0 ? (
          <p>No books found for "{query}"</p>
        ) : (
          <div>
            {books.map((book) => (
              <div key={book.id}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
