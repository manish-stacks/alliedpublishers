// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../Navbar/Navbar";
// import { useNavigate } from "react-router-dom"; // For navigation

// const ConfPrecBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [zoom, setZoom] = useState(1.5);
//   const [categories,setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("${process.env.REACT_APP_BACKEND_URL}/api/conference-categories");
//         setCategories(response.data);
//       } catch (err) {
//         console.error("Failed to fetch categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch books
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get("${process.env.REACT_APP_BACKEND_URL}/api/home/conference/book");
//         setBooks(response.data);
//         setFilteredBooks(response.data);
//       } catch (err) {
//         setError("Failed to fetch books");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBooks();
//   }, []);

//   // Filter and sort books
//   useEffect(() => {
//     let updatedBooks = [...books];
//     const subcategories = categories[selectedCategory] || [];

//     if (selectedCategory) {
//       updatedBooks = updatedBooks.filter((book) =>
//         subcategories.length > 0 ? subcategories.includes(book.category) : book.category === selectedCategory
//       );
//     }

//     if (sortOption === "title-asc") updatedBooks.sort((a, b) => a.title.localeCompare(b.title));
//     if (sortOption === "title-desc") updatedBooks.sort((a, b) => b.title.localeCompare(a.title));
//     if (sortOption === "price-asc") updatedBooks.sort((a, b) => a.price - b.price);
//     if (sortOption === "price-desc") updatedBooks.sort((a, b) => b.price - a.price);

//     setFilteredBooks(updatedBooks);
//   }, [selectedCategory, books, sortOption]);

//   // Add to Cart Functionality
//   const addToCart = async (bookId, bookName, bookPrice) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("Please log in to add items to the cart.");
//         return;
//       }

//       await axios.post(
//         "${process.env.REACT_APP_BACKEND_URL}/api/cart/add-to-cart",
//         { itemId: bookId, name: bookName, price: bookPrice, quantity: 1 },
//         { headers: { Authorization: token } }
//       );
//       alert("Book added to cart!");
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert("Failed to add book to cart.");
//     }
//   };

//   // Go to Cart Functionality
//   const goToCart = () => {
//     navigate("/cart"); // Navigate to the cart page
//   };

//   // Popup and Zoom Functions
//   const openPopup = (book) => {
//     setSelectedBook(book);
//     setZoom(1);
//   };

//   const closePopup = () => {
//     setSelectedBook(null);
//     setZoom(1.5);
//   };

//   const zoomIn = (e) => {
//     e.stopPropagation();
//     setZoom((prev) => Math.min(prev + 0.2, 3));
//   };

//   const zoomOut = (e) => {
//     e.stopPropagation();
//     setZoom((prev) => Math.max(prev - 0.2, 1));
//   };

//   // Calculate Discounted Price
//   const calculateDiscountedPrice = (price, discount) => {
//     return (price - (price * discount) / 100).toFixed(2);
//   };

//   if (loading) return <p className="text-center text-gray-500 text-lg mt-10">Loading books...</p>;
//   if (error) return <p className="text-center text-red-500 text-lg mt-10">{error}</p>;

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-100 min-h-screen">
//         {/* Sidebar */}
//         <div className="w-full md:w-1/4 bg-teal-700 text-white p-5 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold border-b-2 border-white pb-2">CATEGORIES</h2>
//           <button
//             className={`w-full text-left p-2 mt-3 rounded-lg transition ${
//               selectedCategory === "" ? "bg-teal-500" : "hover:bg-teal-600"
//             }`}
//             onClick={() => setSelectedCategory("")}
//           >
//             📚 Show All Books
//           </button>
//           <ul className="mt-3">
//             {Object.keys(categories).map((category) => (
//               <li key={category} className="mt-2">
//                 <button
//                   className={`w-full text-left p-2 rounded-lg transition ${
//                     selectedCategory === category ? "bg-teal-500" : "hover:bg-teal-600"
//                   }`}
//                   onClick={() => setSelectedCategory(category)}
//                 >
//                   {category}
//                 </button>
//                 {categories[category].length > 0 && (
//                   <ul className="pl-4 mt-1">
//                     {categories[category].map((sub) => (
//                       <li key={sub} className="mt-1">
//                         <button
//                           className={`w-full text-left p-2 rounded-lg text-sm transition ${
//                             selectedCategory === sub ? "bg-teal-400" : "hover:bg-teal-500"
//                           }`}
//                           onClick={() => setSelectedCategory(sub)}
//                         >
//                           ↳ {sub}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Main Book Section */}
//         <div className="flex-1">
//           {/* Go to Cart Button */}
//           <div className="mb-4 flex justify-between">
//             <button
//               onClick={goToCart}
//               className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
//             >
//               🛒 Go to Cart
//             </button>
//             <select
//               className="p-2 border rounded-lg"
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//             >
//               <option value="">Sort By</option>
//               <option value="title-asc">Title (A-Z)</option>
//               <option value="title-desc">Title (Z-A)</option>
//               <option value="price-asc">Price (Low to High)</option>
//               <option value="price-desc">Price (High to Low)</option>
//             </select>
//           </div>

//           {filteredBooks.length === 0 ? (
//             <p className="text-center text-gray-600 text-lg mt-10">📖 No books found for this category.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {filteredBooks.map((book) => (
//                 <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4" key={book.id}>
//                   <img
//                     src={book.coverImage}
//                     alt={book.title}
//                     className="w-full h-64 object-cover cursor-pointer"
//                     onClick={() => openPopup(book)}
//                   />
//                   <h4 className="text-xl font-bold text-gray-900 mt-2">{book.title}</h4>
//                   <p className="text-gray-600">Author: {book.author}</p>
//                   <p className="text-gray-500">ISBN: {book.isbn}</p>

//                   {/* Pricing Logic */}
//                   {book.stock === 0 ? (
//                     <p className="text-red-600 font-bold">Out of Stock</p>
//                   ) : book.discount > 0 ? (
//                     <div className="flex items-center justify-between mt-2">
//                       <p className="text-red-500 line-through">₹{book.price}</p>
//                       <p className="text-green-600 font-bold">₹{calculateDiscountedPrice(book.price, book.discount)}</p>
//                       <p className="text-gray-700">Cover: {book.coverType}</p>
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-between mt-2">
//                       <p className="text-green-600 font-bold">₹{book.price}</p>
//                       <p className="text-gray-700">Cover: {book.coverType}</p>
//                     </div>
//                   )}

//                   {/* Add to Cart Button */}
//                   <button
//                     onClick={() => addToCart(book._id, book.title, book.price)}
//                     className="w-full bg-teal-700 text-white px-4 py-2 mt-4 rounded-lg hover:bg-teal-600 transition"
//                   >
//                     🛒 Add to Cart
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Enlarged Image Popup */}
//       {selectedBook && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closePopup}>
//           <div className="relative" onClick={(e) => e.stopPropagation()}>
//             <img
//               src={selectedBook.backImage}
//               alt="Enlarged"
//               className="rounded-lg shadow-2xl transition-transform"
//               style={{ transform: `scale(${zoom})`, maxWidth: "90vw", maxHeight: "90vh" }}
//             />
//             <div className="absolute top-4 right-4">
//               <button className="bg-gray-700 text-white px-3 py-2 rounded-full text-xl" onClick={closePopup}>✖</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ConfPrecBooks;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const ConfPrecBooks = () => {
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

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/conference-categories`
        );
        console.log("Categories data:", response.data);
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/home/conference/book`
        );
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

  // Filter and sort books
  useEffect(() => {
    let updatedBooks = [...books];

    if (selectedCategory) {
      updatedBooks = updatedBooks.filter((book) => {
        // Check if book matches main category
        if (book.category === selectedCategory) return true;

        // Check if book matches any subcategory
        const categoryObj = categories.find(
          (cat) => cat.name === selectedCategory
        );
        if (categoryObj?.subcategories?.includes(book.category)) {
          return true;
        }

        return false;
      });
    }

    // Sorting logic
    if (sortOption === "title-asc")
      updatedBooks.sort((a, b) => a.title.localeCompare(b.title));
    if (sortOption === "title-desc")
      updatedBooks.sort((a, b) => b.title.localeCompare(a.title));
    if (sortOption === "price-asc")
      updatedBooks.sort((a, b) => a.price - b.price);
    if (sortOption === "price-desc")
      updatedBooks.sort((a, b) => b.price - a.price);

    setFilteredBooks(updatedBooks);
  }, [selectedCategory, books, sortOption, categories]);

  const addToCart = async (bookId, bookName, bookPrice) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to add items to the cart.");
        return;
      }

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart/add-to-cart`,
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

  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg mt-10">
        Loading books...
      </p>
    );
  if (error)
    return <p className="text-center text-red-500 text-lg mt-10">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-teal-700 text-white p-5 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold border-b-2 border-white pb-2">
            CATEGORIES
          </h2>
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
                    selectedCategory === category.name
                      ? "bg-teal-500"
                      : "hover:bg-teal-600"
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
                            selectedCategory === subcategory
                              ? "bg-teal-400"
                              : "hover:bg-teal-500"
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
            <p className="text-center text-gray-600 text-lg mt-10">
              📖 No books found for this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div
                  className="bg-white shadow-lg rounded-lg overflow-hidden p-4"
                  key={book._id}
                >
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-auto max-h-64 object-contain cursor-pointer bg-gray-100 p-2 rounded"
                    onClick={() => openPopup(book)}
                  />
                  <h4 className="text-xl font-bold text-gray-900 mt-2">
                    {book.title}
                  </h4>
                  <p className="text-gray-600">Author: {book.author}</p>
                  <p className="text-gray-500">ISBN: {book.isbn}</p>

                  {book.stock === 0 ? (
                    <p className="text-red-600 font-bold">Out of Stock</p>
                  ) : book.discount > 0 ? (
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-red-500 line-through">₹{book.price}</p>
                      <p className="text-green-600 font-bold">
                        ₹{calculateDiscountedPrice(book.price, book.discount)}
                      </p>
                      <p className="text-gray-700">Cover: {book.coverType}</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-green-600 font-bold">₹{book.price}</p>
                      <p className="text-gray-700">Cover: {book.coverType}</p>
                    </div>
                  )}

                  <button
                    onClick={() => addToCart(book._id, book.title, book.price)}
                    className="w-full bg-teal-700 text-white px-4 py-2 mt-4 rounded-lg hover:bg-teal-600 transition"
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-hidden">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 bg-white p-2 rounded-full z-20 hover:bg-gray-100 transition"
            onClick={closePopup}
          >
            ✖
          </button>

          {/* Scrollable container */}
          <div className="absolute inset-0 overflow-auto">
            {/* Zoomable content */}
            <div
              className="flex items-center justify-center min-w-full min-h-full p-8"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
                width: `${100 / zoom}%`,
                height: `${100 / zoom}%`,
              }}
            >
              {/* Actual image */}
              <img
                src={selectedBook.backImage}
                alt="Book back cover"
                className="rounded-lg shadow-xl"
                style={{
                  maxWidth: "600px",
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>

          {/* Zoom controls */}
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

export default ConfPrecBooks;
