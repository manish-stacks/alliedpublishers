import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const formatPriceInRupees = (price) => {
  if (!price) return "₹0.00";
  return `₹${price.toFixed(2)}`;
};

const ForeignBooksDisplay = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/admin/foreign/books");
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch {
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    let updatedBooks = [...books];
    if (sortOption === "title-asc") updatedBooks.sort((a, b) => a.titleName.localeCompare(b.titleName));
    if (sortOption === "title-desc") updatedBooks.sort((a, b) => b.titleName.localeCompare(a.titleName));
    if (sortOption === "price-asc") updatedBooks.sort((a, b) => a.price - b.price);
    if (sortOption === "price-desc") updatedBooks.sort((a, b) => b.price - a.price);
    setFilteredBooks(updatedBooks);
  }, [sortOption, books]);

  const addToCart = async (bookId, bookName, bookPrice) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to add items to the cart.");
        return;
      }
      await api.post(
        `/api/cart/add-to-cart`,
        { itemId: bookId, name: bookName, price: bookPrice, quantity: 1 },
        { headers: { Authorization: token } }
      );
      alert("Book added to cart!");
    } catch {
      alert("Failed to add book to cart.");
    }
  };

  const goToCart = () => navigate("/cart");

  if (loading)
    return <p className="text-center text-gray-500 text-lg mt-10">Loading books...</p>;

  if (error)
    return <p className="text-center text-red-500 text-lg mt-10">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Foreign Books Collection</h2>
          <div className="flex items-center space-x-4">
            <select
              className="p-2 border rounded-lg"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
            <button
              onClick={goToCart}
              className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
            >
              🛒 Go to Cart
            </button>
          </div>
        </div>

        {filteredBooks.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-10">No books available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">{book.titleName}</h3>
                  <p className="text-gray-700 mb-1"><strong>Author:</strong> {book.authorName || "Unknown"}</p>
                  <p className="text-gray-700 mb-1"><strong>Bookcode:</strong> {book.bookcode}</p>
                  <p className="text-gray-700 mb-1"><strong>Published:</strong> {book.publishYear || "N/A"}</p>
                  <p className="text-gray-700 mb-1"><strong>Price:</strong> {formatPriceInRupees(book.price)}</p>
                  <p className="text-gray-700"><strong>Quantity:</strong> {book.qty || 0}</p>
                </div>
                <button
                  onClick={() => addToCart(book._id, book.titleName, book.price)}
                  className="bg-teal-700 text-white py-2 rounded hover:bg-teal-600 transition"
                >
                  🛒 Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ForeignBooksDisplay;
