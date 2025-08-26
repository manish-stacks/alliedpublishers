import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const GeneralTiles = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [zoom, setZoom] = useState(1.5);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(`/api/categories`);
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get(`/api/home/general/book`);
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (err) {
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    let updatedBooks = [...books];
    if (selectedCategory) {
      updatedBooks = updatedBooks.filter(book => {
        if (book.category === selectedCategory) return true;
        const categoryObj = categories.find(cat => cat.name === selectedCategory);
        if (categoryObj?.subcategories?.includes(book.category)) {
          return true;
        }
        return false;
      });
    }
    if (sortOption === "title-asc") updatedBooks.sort((a, b) => a.title.localeCompare(b.title));
    if (sortOption === "title-desc") updatedBooks.sort((a, b) => b.title.localeCompare(a.title));
    if (sortOption === "price-asc") updatedBooks.sort((a, b) => a.price - b.price);
    if (sortOption === "price-desc") updatedBooks.sort((a, b) => b.price - a.price);
    setFilteredBooks(updatedBooks);
  }, [selectedCategory, books, sortOption, categories]);

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
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add book to cart.");
    }
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const openPopup = (book) => {
    setSelectedBook(book);
    setZoom(1);
  };

  const closePopup = () => {
    setSelectedBook(null);
    setZoom(1.5);
  };

  const zoomIn = (e) => {
    e.stopPropagation();
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const zoomOut = (e) => {
    e.stopPropagation();
    setZoom((prev) => Math.max(prev - 0.2, 1));
  };

  const calculateDiscountedPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  };

  if (loading) return <p className="text-center text-gray-500 text-lg mt-10">Loading books...</p>;
  if (error) return <p className="text-center text-red-500 text-lg mt-10">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-teal-700 text-white p-5 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold border-b-2 border-white pb-2">CATEGORIES</h2>
          <button
            className={`w-full text-left p-2 mt-3 rounded-lg transition ${
              selectedCategory === "" ? "bg-teal-500" : "hover:bg-teal-600"
            }`}
            onClick={() => setSelectedCategory("")}
          >
            📚 Show All Books
          </button>
          <ul className="mt-3">
            {categories.map((category) => (
              <li key={category._id} className="mt-2">
                <button
                  className={`w-full text-left p-2 rounded-lg transition ${
                    selectedCategory === category.name ? "bg-teal-500" : "hover:bg-teal-600"
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </button>
                {category.subcategories?.length > 0 && (
                  <ul className="pl-4 mt-1">
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory} className="mt-1">
                        <button
                          className={`w-full text-left p-2 rounded-lg text-sm transition ${
                            selectedCategory === subcategory ? "bg-teal-400" : "hover:bg-teal-500"
                          }`}
                          onClick={() => setSelectedCategory(subcategory)}
                        >
                          ↳ {subcategory}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Book Section */}
        <div className="flex-1">
          <div className="mb-4 flex justify-between">
            <button
              onClick={goToCart}
              className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
            >
              🛒 Go to Cart
            </button>
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
          </div>

          {filteredBooks.length === 0 ? (
            <p className="text-center text-gray-600 text-lg mt-10">📖 No books found for this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden p-4 flex flex-col transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-auto max-h-64 object-contain cursor-pointer bg-gray-100 p-2 rounded mb-2"
                    onClick={() => openPopup(book)}
                  />
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h4>
                  <p className="text-gray-600 mb-1">Author: {book.author}</p>
                  <p className="text-gray-500 mb-3">ISBN: {book.isbn}</p>
                  {book.stock === 0 ? (
  <div className="mt-auto flex justify-center items-center text-red-600 font-bold h-16">
    Out of Stock
  </div>
) : (
  <>
    <div className="mt-auto flex justify-between items-center text-gray-700 font-semibold h-16">
      <p className="w-1/3 text-center">Pages: {book.pages || "N/A"}</p>
      <div className="w-1/3 text-center">
        {book.discount > 0 ? (
          <>
            <p className="text-red-500 line-through">₹{book.price}</p>
            <p className="text-green-600 font-bold">
              ₹{calculateDiscountedPrice(book.price, book.discount)}
            </p>
          </>
        ) : (
          <p className="text-green-600 font-bold">₹{book.price}</p>
        )}
      </div>
      <p className="w-1/3 text-center">Cover: {book.coverType}</p>
    </div>

    <button
      onClick={() => addToCart(book._id, book.title, book.price)}
      className="w-full bg-teal-700 text-white px-4 py-2 mt-4 rounded-lg hover:bg-teal-600 transition"
    >
      🛒 Add to Cart
    </button>
  </>
)}

                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-hidden">
          <button
            className="absolute top-4 right-4 bg-white p-2 rounded-full z-20 hover:bg-gray-100 transition"
            onClick={closePopup}
          >
            ✖
          </button>

          <div className="absolute inset-0 overflow-auto">
            <div
              className="flex items-center justify-center min-w-full min-h-full p-8"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
                width: `${100 / zoom}%`,
                height: `${100 / zoom}%`,
              }}
            >
              <img
                src={selectedBook.backImage}
                alt="Book back cover"
                className="rounded-lg shadow-xl"
                style={{ maxWidth: "400px", width: "100%", height: "auto" }}
              />
            </div>
          </div>

          <div className="fixed bottom-4 left-0 right-0 flex justify-center space-x-4 z-10">
            <button
              className="bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-100 transition"
              onClick={(e) => {
                e.stopPropagation();
                zoomOut(e);
              }}
              disabled={zoom <= 1}
            >
              -
            </button>
            <span className="bg-white px-3 py-2 rounded-full text-sm flex items-center">
              {zoom.toFixed(1)}x
            </span>
            <button
              className="bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-100 transition"
              onClick={(e) => {
                e.stopPropagation();
                zoomIn(e);
              }}
              disabled={zoom >= 3}
            >
              +
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GeneralTiles;
