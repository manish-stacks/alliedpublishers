// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import Navbar from "./Navbar/Navbar"; // Assuming you want the same navbar

// const categories = {
//   "Agriculture & Earth Science": ["Agriculture & Life Sciences", "Earth Science"],
//   "Art and Craft": [],
//   "Astrology": [],
//   "Competitive Examination": [],
//   "Cookery & Food Technology": [],
//   "Commerce": ["Business Studies & Management", "Commerce & Economics"],
//   "Demography": [],
//   "Disaster Management": [],
//   "Ergonomics": [],
//   "India, The World & Miscellaneous Topics": ["India", "The World"],
//   "Industry": [],
//   "Insurance": [],
//   "Military Affairs": [],
//   "Motivational and Self-help Books": [],
//   "Oceanography": [],
//   "Oil Exploration": [],
//   "Pets": [],
//   "Quality Control": [],
//   "Science & Engineering": [
//     "Mathematics",
//     "Science and Technology",
//     "Physics",
//     "Biological & Medical Sciences",
//     "Computer Science",
//     "Electronics, Electrical and Telecommunication Engineering",
//     "Civil Engineering",
//     "Mechanical Engineering",
//     "Chemistry, Chemical Engineering & Polymer Science",
//     "Minerals & Metallurgical Engineering",
//   ],
//   "Social Science": [
//     "Political Science & International Relations",
//     "Communication Studies",
//     "Public Administration",
//     "Sociology",
//     "Psychology",
//     "Biographies & Memoirs",
//     "Language & Literature",
//     "Philosophy & Religion",
//     "Energy and Environment",
//     "Library Science",
//     "Law",
//     "Education",
//     "Dictionaries",
//   ],
//   "Transportation": [],
//   "Valuation": [],
//   "Water Management": [],
//   "Yoga": [],
// };

// const SearchResultsPage = () => {
//   const location = useLocation();
//   const searchQuery = new URLSearchParams(location.search).get("query");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(""); // Store selected category
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [zoom, setZoom] = useState(1.5);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5001/api/home/general/book?title=${searchQuery}`
//         );
//         setSearchResults(response.data);

//         // Assuming books have a `category` field that corresponds to the sidebar categories
//         if (response.data.length > 0) {
//           const bookCategory = response.data[0].category; // Get the category from the first book
//           setSelectedCategory(bookCategory); // Set the sidebar category based on the book's category
//         }
//       } catch (err) {
//         setError("Failed to fetch books");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (searchQuery) {
//       fetchBooks();
//     }
//   }, [searchQuery]);

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

//   const calculateDiscountedPrice = (price, discount) => {
//     return (price - (price * discount) / 100).toFixed(2);
//   };

//   if (loading) return <p className="text-center text-gray-500 text-lg mt-10">Loading books...</p>;
//   if (error) return <p className="text-center text-red-500 text-lg mt-10">{error}</p>;

//   return (
//     <div>
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
//                     selectedCategory === category ? "bg-teal-400" : "hover:bg-teal-600"
//                   }`}
//                   onClick={() => setSelectedCategory(category)}
//                 >
//                   {category}
//                 </button>

//                 {/* Show Subcategories */}
//                 {categories[category].length > 0 && (
//                   <ul className="pl-4 mt-1">
//                     {categories[category].map((sub) => (
//                       <li key={sub} className="mt-1">
//                         <button
//                           className={`w-full text-left p-2 rounded-lg text-sm transition ${
//                             selectedCategory === sub ? "bg-teal-300" : "hover:bg-teal-500"
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
//           <h1 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h1>
//           {searchResults.length === 0 ? (
//             <p className="text-center text-gray-600 text-lg mt-10">📖 No books found for this search.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {searchResults.map((book) => (
//                 <div
//                   className="bg-white shadow-lg rounded-lg overflow-hidden p-4"
//                   key={book.id}
//                   onClick={() => openPopup(book)}
//                 >
//                   <img
//                     src={book.coverImage}
//                     alt={book.title}
//                     className="w-full h-64 object-cover"
//                   />
//                   <h4 className="text-xl font-bold text-gray-900 mt-2">{book.title}</h4>
//                   <p className="text-gray-600">Author: {book.author}</p>
//                   <p className="text-gray-500">ISBN: {book.isbn}</p>

//                   {/* Cover Type */}
//                   <p className="text-gray-500">Cover Type: {book.coverType}</p>

//                   {/* Pricing Logic */}
//                   {book.stock === 0 ? (
//                     <p className="text-red-600 font-bold">Out of Stock</p>
//                   ) : book.discount > 0 ? (
//                     <div className="flex items-center justify-between mt-2 space-x-2">
//                       <p className="text-red-500 line-through text-sm">₹{book.price}</p>
//                       <p className="text-green-600 font-bold text-lg">₹{calculateDiscountedPrice(book.price, book.discount)}</p>
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-between mt-2">
//                       <p className="text-green-600 font-bold text-lg">₹{book.price}</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Enlarged Image Popup with Zoom Controls */}
//       {selectedBook && (
//         <div
//           className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50"
//           onClick={closePopup}
//         >
//           <div className="relative" onClick={(e) => e.stopPropagation()}>
//             <img
//               src={selectedBook.backImage}
//               alt="Enlarged"
//               className="rounded-lg shadow-2xl transition-transform"
//               style={{ transform: `scale(${zoom})`, maxWidth: "90vw", maxHeight: "90vh" }}
//             />

//             {/* Zoom & Close Buttons */}
//             <div className="absolute top-4 right-4">
//               <button
//                 className="bg-gray-700 text-white px-3 py-2 rounded-full text-xl"
//                 onClick={closePopup}
//               >
//                 ✖
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchResultsPage;


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar/Navbar";

const categories = {
  "Agriculture & Earth Science": ["Agriculture & Life Sciences", "Earth Science"],
  "Art and Craft": [],
  "Astrology": [],
  "Competitive Examination": [],
  "Cookery & Food Technology": [],
  "Commerce": ["Business Studies & Management", "Commerce & Economics"],
  "Demography": [],
  "Disaster Management": [],
  "Ergonomics": [],
  "India, The World & Miscellaneous Topics": ["India", "The World"],
  "Industry": [],
  "Insurance": [],
  "Military Affairs": [],
  "Motivational and Self-help Books": [],
  "Oceanography": [],
  "Oil Exploration": [],
  "Pets": [],
  "Quality Control": [],
  "Science & Engineering": [
    "Mathematics",
    "Science and Technology",
    "Physics",
    "Biological & Medical Sciences",
    "Computer Science",
    "Electronics, Electrical and Telecommunication Engineering",
    "Civil Engineering",
    "Mechanical Engineering",
    "Chemistry, Chemical Engineering & Polymer Science",
    "Minerals & Metallurgical Engineering",
  ],
  "Social Science": [
    "Political Science & International Relations",
    "Communication Studies",
    "Public Administration",
    "Sociology",
    "Psychology",
    "Biographies & Memoirs",
    "Language & Literature",
    "Philosophy & Religion",
    "Energy and Environment",
    "Library Science",
    "Law",
    "Education",
    "Dictionaries",
  ],
  "Transportation": [],
  "Valuation": [],
  "Water Management": [],
  "Yoga": [],
};

const SearchResultsPage = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortOption, setSortOption] = useState(""); // For sorting option
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [zoom, setZoom] = useState(1.0);

  // Fetch books based on the search query or all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          searchQuery
            ? `http://localhost:5001/api/home/general/book?title=${searchQuery}`
            : "http://localhost:5001/api/home/general/book"
        );
        setSearchResults(response.data);
        setFilteredBooks(response.data); // Set all books initially
      } catch (err) {
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchQuery]);

  useEffect(() => {
    let updatedBooks = [...searchResults];

    // Apply sorting logic
    if (sortOption === "title-asc")
      updatedBooks.sort((a, b) => a.title.localeCompare(b.title));
    if (sortOption === "title-desc")
      updatedBooks.sort((a, b) => b.title.localeCompare(a.title));
    if (sortOption === "price-asc")
      updatedBooks.sort((a, b) => a.price - b.price);
    if (sortOption === "price-desc")
      updatedBooks.sort((a, b) => b.price - a.price);

    setFilteredBooks(updatedBooks);
  }, [searchResults, sortOption]);

  const openPopup = (book) => {
    setSelectedBook(book);
    setZoom(1);
  };

  const closePopup = () => {
    setSelectedBook(null);
    setZoom(1.0);
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
    <div>
      <Navbar />
      <div className="p-8 bg-gray-100 min-h-screen">
        {/* Search Results Heading */}
        {searchQuery && (
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Search Results for "{searchQuery}"
          </h2>
        )}

        {/* Sorting Options */}
        <div className="mb-4 flex justify-end">
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
          <p className="text-center text-gray-600 text-lg mt-10">📖 No books found for this search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden p-4"
                key={book.id}
                onClick={() => openPopup(book)}
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
                <h4 className="text-xl font-bold text-gray-900 mt-2">{book.title}</h4>
                <p className="text-gray-600">Author: {book.author}</p>
                <p className="text-gray-500">ISBN: {book.isbn}</p>

                {/* Display Book Category */}
                <p className="text-sm text-gray-700">Category: {book.category}</p>

                {/* Pricing Logic */}
                {book.stock === 0 ? (
                  <p className="text-red-600 font-bold">Out of Stock</p>
                ) : book.discount > 0 ? (
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-red-500 line-through">₹{book.price}</p>
                    <p className="text-green-600 font-bold">₹{calculateDiscountedPrice(book.price, book.discount)}</p>
                    <p className="text-gray-700">Cover: {book.coverType}</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-green-600 font-bold">₹{book.price}</p>
                    <p className="text-gray-700">Cover: {book.coverType}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enlarged Image Popup with Zoom Controls */}
      {selectedBook && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedBook.backImage}
              alt="Enlarged"
              className="rounded-lg shadow-2xl transition-transform"
              style={{ transform: `scale(${zoom})`, maxWidth: "90vw", maxHeight: "90vh" }}
            />

            {/* Zoom & Close Buttons */}
            <div className="absolute top-4 right-4">
              <button
                className="bg-gray-700 text-white px-3 py-2 rounded-full text-xl"
                onClick={closePopup}
              >
                ✖
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
