import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../axiosConfig";
import Navbar from "./Navbar/Navbar";

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [zoom, setZoom] = useState(1.0);
  const [categories, setCategories] = useState({});

  // Fetch categories from backend
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

  // Fetch general, conference, and foreign books based on search query
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch general books matching query or all if no query
        let url = `/api/home/general/book`;
if (searchQuery) {
  url += `?title=${encodeURIComponent(searchQuery)}`;
}
const generalBooksPromise = api.get(url);
        
        // Fetch conference books matching query or all if no query
        let confUrl = `/api/home/conference/book`;
if (searchQuery) {
  confUrl += `?title=${encodeURIComponent(searchQuery)}`;
}
const confBooksPromise = api.get(confUrl);

        // Fetch foreign books matching query or all if no query
        let foreignUrl = `/api/home/foreign/book`;
if (searchQuery) {
  foreignUrl += `?title=${encodeURIComponent(searchQuery)}`;
}
const foreignBooksPromise = api.get(foreignUrl);

        const [generalRes, confRes, foreignRes] = await Promise.all([generalBooksPromise, confBooksPromise, foreignBooksPromise]);
        
        // Transform foreign books to match the expected structure
        const transformedForeignBooks = foreignRes.data.map(book => ({
          id: book._id,
          title: book.titleName,
          author: book.authorName,
          isbn: book.bookcode,
          category: "Foreign Books",
          price: book.price,
          stock: book.qty,
          coverImage: null,
          backImage: null,
          discount: 0,
          coverType: "N/A",
          pages: "N/A"
        }));
        
        const combinedBooks = [...generalRes.data, ...confRes.data, ...transformedForeignBooks];

        setSearchResults(combinedBooks);
        setFilteredBooks(combinedBooks);
      } catch (err) {
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchQuery]);

  // Filter and sort
  useEffect(() => {
    let updatedBooks = [...searchResults];
    const subcategories = categories[selectedCategory] || [];

    if (selectedCategory) {
      updatedBooks = updatedBooks.filter(book => 
        subcategories.length > 0 ? subcategories.includes(book.category) : book.category === selectedCategory
      );
    }

    if (sortOption === "title-asc") updatedBooks.sort((a, b) => a.title.localeCompare(b.title));
    if (sortOption === "title-desc") updatedBooks.sort((a, b) => b.title.localeCompare(a.title));
    if (sortOption === "price-asc") updatedBooks.sort((a, b) => a.price - b.price);
    if (sortOption === "price-desc") updatedBooks.sort((a, b) => b.price - a.price);

    setFilteredBooks(updatedBooks);
  }, [searchResults, selectedCategory, sortOption, categories]);

  const addToCart = async (id, name, price) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to add items to the cart.");
        return;
      }
      await api.post(
        `/api/cart/add-to-cart`,
        { itemId: id, name, price, quantity: 1 },
        { headers: { Authorization: token } }
      );
      alert("Book added to cart!");
    } catch (error) {
      console.error(error);
      alert("Failed to add to cart.");
    }
  };

  const goToCart = () => navigate("/cart");

  const openPopup = (book) => {
    setSelectedBook(book);
    setZoom(1);
  };

  const closePopup = () => {
    setSelectedBook(null);
    setZoom(1);
  };

  const zoomIn = (e) => {
    e.stopPropagation();
    setZoom(z => Math.min(z + 0.2, 3));
  };

  const zoomOut = (e) => {
    e.stopPropagation();
    setZoom(z => Math.max(z - 0.2, 1));
  };

  const calculateDiscountedPrice = (price, discount) => (price - price*discount/100).toFixed(2);

  if (loading) return <p className="text-center text-gray-500 text-lg mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg mt-10">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-100 min-h-screen">
        { !searchQuery && (
          <div className="w-full md:w-1/4 bg-teal-700 text-white p-5 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold border-b-2 border-white pb-2">CATEGORIES</h2>
            <button 
              className={`w-full text-left p-2 mt-3 rounded-lg ${selectedCategory === "" ? "bg-teal-500" : "hover:bg-teal-600"}`}
              onClick={() => setSelectedCategory("")}
            >
              📚 Show All
            </button>
            <ul className="mt-3">
              {Object.keys(categories).map(cat => (
                <li key={cat} className="mt-2">
                  <button 
                    className={`w-full text-left p-2 rounded-lg ${selectedCategory === cat ? "bg-teal-500" : "hover:bg-teal-600"}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                  {categories[cat].length > 0 && (
                    <ul className="pl-4 mt-1">
                      {categories[cat].map(subcat => (
                        <li key={subcat} className="mt-1">
                          <button 
                            className={`w-full text-left p-2 rounded-lg text-sm ${selectedCategory === subcat ? "bg-teal-400" : "hover:bg-teal-500"}`}
                            onClick={() => setSelectedCategory(subcat)}
                          >
                            ↳ {subcat}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={`${!searchQuery ? "flex-1" : "w-full"}`}>
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
              onChange={e => setSortOption(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="price-asc">Price Low to High</option>
              <option value="price-desc">Price High to Low</option>
            </select>
          </div>

          {searchQuery && (
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Results for "{searchQuery}"</h2>
          )}

          {filteredBooks.length === 0 ? (
            <p className="text-center text-gray-600 text-lg mt-10">
              {searchQuery ? "No books found for your search." : "No books found."}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredBooks.map(book => (
                <div key={book.id || book._id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4 flex flex-col transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                  {book.coverImage && (
                    <img 
                      src={book.coverImage} 
                      alt={book.title} 
                      className="w-full h-64 object-contain cursor-pointer mb-2" 
                      onClick={() => openPopup(book)} 
                    />
                  )}
                  <h4 className="text-xl font-bold mb-1">{book.title}</h4>
                  <p className="text-gray-600 mb-1">Author: {book.author}</p>
                  <p className="text-gray-500 mb-1">ISBN: {book.isbn}</p>
                  <p className="text-gray-700 mb-2">Category: {book.category}</p>
                  
                  {book.stock === 0 ? (
                    <div className="mt-auto flex justify-center items-center text-red-600 font-bold h-16">
                      Out of Stock
                    </div>
                  ) : (
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
                  )}

                  <button 
                    onClick={() => addToCart(book.id || book._id, book.title, book.price)}
                    className="w-full mt-4 bg-teal-700 text-white rounded-lg px-4 py-2 hover:bg-teal-600 transition"
                    disabled={book.stock === 0}
                  >
                    {book.stock === 0 ? "Out of Stock" : "🛒 Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedBook && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" 
          onClick={closePopup}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedBook.backImage} 
              alt="Enlarged" 
              className="rounded-lg shadow-xl transition-transform" 
              style={{ transform: `scale(${zoom})`, maxWidth: "600px", maxHeight: "90vh" }} 
            />
            <button 
              className="absolute top-4 right-4 bg-gray-700 text-white px-3 py-2 rounded-full text-xl" 
              onClick={closePopup}
            >✖</button>

            <div className="flex justify-center space-x-4 mt-4">
              <button 
                className="bg-white text-gray-800 rounded-full px-3 py-1" 
                onClick={zoomOut} disabled={zoom <= 1}>-</button>
              <span className="text-white">{zoom.toFixed(1)}x</span>
              <button 
                className="bg-white text-gray-800 rounded-full px-3 py-1" 
                onClick={zoomIn} disabled={zoom >= 3}>+</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResultsPage;
