

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./GeneralTiles.css";
// import Navbar from "../Navbar/Navbar";

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
//     "Minerals & Metallurgical Engineering"
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
//     "Dictionaries"
//   ],
//   "Transportation": [],
//   "Valuation": [],
//   "Water Management": [],
//   "Yoga": []
// };

// const GeneralTiles = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/home/general/book");
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

//   useEffect(() => {
//     let updatedBooks = [...books];
//     if (selectedCategory) {
//       const subcategories = categories[selectedCategory];
//       updatedBooks = updatedBooks.filter((book) =>
//         subcategories.length > 0 ? subcategories.includes(book.category) : book.category === selectedCategory
//       );
//     }

//     if (sortOption === "title-asc") {
//       updatedBooks.sort((a, b) => a.title.localeCompare(b.title));
//     } else if (sortOption === "title-desc") {
//       updatedBooks.sort((a, b) => b.title.localeCompare(a.title));
//     } else if (sortOption === "price-asc") {
//       updatedBooks.sort((a, b) => a.price - b.price);
//     } else if (sortOption === "price-desc") {
//       updatedBooks.sort((a, b) => b.price - a.price);
//     }

//     setFilteredBooks(updatedBooks);
//   }, [selectedCategory, books, sortOption]);

//   if (loading) return <p>Loading books...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-100 min-h-screen">
//         <div className="w-1/4 bg-teal-700 text-white p-5 rounded-xl shadow-lg h-fit">
//           <h2 className="text-2xl font-bold border-b-2 border-white pb-2">CATEGORIES</h2>
//           <ul className="mt-3">
//             {Object.keys(categories).map((category) => (
//               <li key={category} className="mt-2">
//                 <button
//                   className={`w-full text-left p-2 rounded-lg ${selectedCategory === category ? "bg-teal-500" : "hover:bg-teal-600"}`}
//                   onClick={() => setSelectedCategory(category)}
//                 >
//                   {category}
//                 </button>
//                 {selectedCategory === category && categories[category].length > 0 && (
//                   <ul className="ml-4 mt-2">
//                     {categories[category].map((sub) => (
//                       <li key={sub} className="mt-1">
//                         <button
//                           className="w-full text-left p-1 rounded-lg bg-white text-black hover:bg-gray-300"
//                           onClick={() => setSelectedCategory(sub)}
//                         >
//                           {sub}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="flex-1">
//           <div className="mb-4 flex justify-end">
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

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {filteredBooks.map((book) => (
//               <div className="bg-white shadow-lg rounded-lg overflow-hidden" key={book.id}>
//                 <img src={book.coverImage} alt={book.title} className="w-full h-64 object-cover" />
//                 <div className="p-4">
//                   <h4 className="text-xl font-bold">{book.title}</h4>
//                   <p className="text-gray-600">Author: {book.author}</p>
//                   <p className="text-teal-700 font-semibold">Price: ₹{book.price}</p>
//                   <p className="text-gray-500">Category: {book.category}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default GeneralTiles;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../Navbar/Navbar";

// const categories = {
//     "Agriculture & Earth Science": ["Agriculture & Life Sciences", "Earth Science"],
//       "Art and Craft": [],
//       "Astrology": [],
//       "Competitive Examination": [],
//       "Cookery & Food Technology": [],
//       "Commerce": ["Business Studies & Management", "Commerce & Economics"],
//       "Demography": [],
//       "Disaster Management": [],
//       "Ergonomics": [],
//       "India, The World & Miscellaneous Topics": ["India", "The World"],
//       "Industry": [],
//       "Insurance": [],
//       "Military Affairs": [],
//       "Motivational and Self-help Books": [],
//       "Oceanography": [],
//       "Oil Exploration": [],
//       "Pets": [],
//       "Quality Control": [],
//       "Science & Engineering": [
//         "Mathematics",
//         "Science and Technology",
//         "Physics",
//         "Biological & Medical Sciences",
//         "Computer Science",
//         "Electronics, Electrical and Telecommunication Engineering",
//         "Civil Engineering",
//         "Mechanical Engineering",
//         "Chemistry, Chemical Engineering & Polymer Science",
//         "Minerals & Metallurgical Engineering"
//       ],
//       "Social Science": [
//         "Political Science & International Relations",
//         "Communication Studies",
//         "Public Administration",
//         "Sociology",
//         "Psychology",
//         "Biographies & Memoirs",
//         "Language & Literature",
//         "Philosophy & Religion",
//         "Energy and Environment",
//         "Library Science",
//         "Law",
//         "Education",
//         "Dictionaries"
//       ],
//       "Transportation": [],
//       "Valuation": [],
//       "Water Management": [],
//       "Yoga": []
// };

// const GeneralTiles = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/home/general/book");
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

//   useEffect(() => {
//     let updatedBooks = [...books];
//     const subcategories = categories[selectedCategory] || []; // ✅ Fix: Prevent undefined error

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

//   if (loading) return <p className="text-center text-gray-500 text-lg mt-10">Loading books...</p>;
//   if (error) return <p className="text-center text-red-500 text-lg mt-10">{error}</p>;

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-100 min-h-screen">
        
//         {/* Sidebar */}
//         <div className="w-full md:w-1/4 bg-teal-700 text-white p-5 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold border-b-2 border-white pb-2">CATEGORIES</h2>

//           {/* Show All Books Option */}
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
//                 {selectedCategory === category && categories[category].length > 0 && (
//                   <ul className="ml-4 mt-2">
//                     {categories[category].map((sub) => (
//                       <li key={sub} className="mt-1">
//                         <button
//                           className={`w-full text-left p-2 rounded-lg transition ${
//                             selectedCategory === sub ? "bg-teal-500" : "hover:bg-teal-600"
//                           }`}
//                           onClick={() => setSelectedCategory(sub)}
//                         >
//                           {sub}
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
          
//           {/* Sorting Dropdown */}
//           <div className="mb-4 flex justify-end">
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

//           {/* No Books Found Message */}
//           {filteredBooks.length === 0 ? (
//             <p className="text-center text-gray-600 text-lg mt-10">📖 No books found for this category.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {filteredBooks.map((book) => (
//                 <div
//                   className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition transform hover:shadow-xl"
//                   key={book.id}
//                 >
//                   <img src={book.coverImage} alt={book.title} className="w-full h-64 object-cover" />
//                   <div className="p-4">
//                     <h4 className="text-xl font-bold text-gray-900">{book.title}</h4>
//                     <p className="text-gray-600">Author: {book.author}</p>
//                     <p className="text-teal-700 font-semibold">Price: ₹{book.price}</p>
//                     <p className="text-gray-500">Category: {book.category}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default GeneralTiles;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../Navbar/Navbar";

// const categories = {
//   "Agriculture & Earth Science": ["Agriculture & Life Sciences", "Earth Science"],
//   "Art and Craft": [],
//   "Astrology": [],
//   "Competitive Examination": [],
//   "Cookery & Food Technology": [],
//   "Commerce": ["Business Studies & Management", "Commerce & Economics"],
//   "Science & Engineering": ["Mathematics", "Physics", "Computer Science", "Civil Engineering"],
//   "Social Science": ["Political Science", "Public Administration", "Sociology"],
// };

// const GeneralTiles = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null); // ✅ State for enlarged image

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/home/general/book");
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
//                 {selectedCategory === category && categories[category].length > 0 && (
//                   <ul className="ml-4 mt-2">
//                     {categories[category].map((sub) => (
//                       <li key={sub} className="mt-1">
//                         <button
//                           className={`w-full text-left p-2 rounded-lg transition ${
//                             selectedCategory === sub ? "bg-teal-500" : "hover:bg-teal-600"
//                           }`}
//                           onClick={() => setSelectedCategory(sub)}
//                         >
//                           {sub}
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
          
//           {/* Sorting Dropdown */}
//           <div className="mb-4 flex justify-end">
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

//           {/* No Books Found Message */}
//           {filteredBooks.length === 0 ? (
//             <p className="text-center text-gray-600 text-lg mt-10">📖 No books found for this category.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {filteredBooks.map((book) => (
//                 <div
//                   className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition transform hover:shadow-xl cursor-pointer"
//                   key={book.id}
//                   onClick={() => setSelectedImage(book.coverImage)} // ✅ Click to enlarge image
//                 >
//                   <img src={book.coverImage} alt={book.title} className="w-full h-64 object-cover" />
//                   <div className="p-4">
//                     <h4 className="text-xl font-bold text-gray-900">{book.title}</h4>
//                     <p className="text-gray-600">Author: {book.author}</p>
//                     <p className="text-teal-700 font-semibold">Price: ₹{book.price}</p>
//                     <p className="text-gray-500">Category: {book.category}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ✅ Modal for Enlarged Image */}
//       {selectedImage && (
//         <div
//           className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50"
//           onClick={() => setSelectedImage(null)} // ✅ Close on click
//         >
//           <div className="relative">
//             <img src={selectedImage} alt="Enlarged" className="max-w-full max-h-screen rounded-lg shadow-2xl" />
//             <button
//               className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 rounded-full p-2"
//               onClick={() => setSelectedImage(null)}
//             >
//               ✖
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default GeneralTiles;

// 111111
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../Navbar/Navbar";

// const categories = {
//     "Agriculture & Earth Science": ["Agriculture & Life Sciences", "Earth Science"],
//       "Art and Craft": [],
//       "Astrology": [],
//       "Competitive Examination": [],
//       "Cookery & Food Technology": [],
//       "Commerce": ["Business Studies & Management", "Commerce & Economics"],
//       "Demography": [],
//       "Disaster Management": [],
//       "Ergonomics": [],
//       "India, The World & Miscellaneous Topics": ["India", "The World"],
//       "Industry": [],
//       "Insurance": [],
//       "Military Affairs": [],
//       "Motivational and Self-help Books": [],
//       "Oceanography": [],
//       "Oil Exploration": [],
//       "Pets": [],
//       "Quality Control": [],
//       "Science & Engineering": [
//         "Mathematics",
//         "Science and Technology",
//         "Physics",
//         "Biological & Medical Sciences",
//         "Computer Science",
//         "Electronics, Electrical and Telecommunication Engineering",
//         "Civil Engineering",
//         "Mechanical Engineering",
//         "Chemistry, Chemical Engineering & Polymer Science",
//         "Minerals & Metallurgical Engineering"
//       ],
//       "Social Science": [
//         "Political Science & International Relations",
//         "Communication Studies",
//         "Public Administration",
//         "Sociology",
//         "Psychology",
//         "Biographies & Memoirs",
//         "Language & Literature",
//         "Philosophy & Religion",
//         "Energy and Environment",
//         "Library Science",
//         "Law",
//         "Education",
//         "Dictionaries"
//       ],
//       "Transportation": [],
//       "Valuation": [],
//       "Water Management": [],
//       "Yoga": []
// };

// const GeneralTiles = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [zoom, setZoom] = useState(1.5);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/home/general/book");
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

//   const openImage = (image) => {
//     setSelectedImage(image);
//     setZoom(1);
//   };

//   const closeImage = () => {
//     setSelectedImage(null);
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
//                 {/* Main Category Button */}
//                 <button
//                   className={`w-full text-left p-2 rounded-lg transition ${
//                     selectedCategory === category ? "bg-teal-500" : "hover:bg-teal-600"
//                   }`}
//                   onClick={() => setSelectedCategory(category)}
//                 >
//                   {category}
//                 </button>

//                 {/* ✅ Show Subcategories Below the Main Category */}
//                 {categories[category].length > 0 && (
//                   <ul className="ml-4 mt-2">
//                     {categories[category].map((sub) => (
//                       <li key={sub} className="mt-1">
//                         <button
//                           className={`w-full text-left p-2 rounded-lg transition ${
//                             selectedCategory === sub ? "bg-teal-500" : "hover:bg-teal-600"
//                           }`}
//                           onClick={() => setSelectedCategory(sub)}
//                         >
//                           {sub}
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
//           {/* Sorting Dropdown */}
//           <div className="mb-4 flex justify-end">
//             <select className="p-2 border rounded-lg" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
//               <option value="">Sort By</option>
//               <option value="title-asc">Title (A-Z)</option>
//               <option value="title-desc">Title (Z-A)</option>
//               <option value="price-asc">Price (Low to High)</option>
//               <option value="price-desc">Price (High to Low)</option>
//             </select>
//           </div>

//           {/* No Books Found Message */}
//           {filteredBooks.length === 0 ? (
//             <p className="text-center text-gray-600 text-lg mt-10">📖 No books found for this category.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {filteredBooks.map((book) => (
//                 <div
//                   className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition transform hover:shadow-xl cursor-pointer"
//                   key={book.id}
//                   onClick={() => openImage(book.coverImage)}
//                 >
//                   <img src={book.coverImage} alt={book.title} className="w-full h-64 object-cover" />
//                   <div className="p-4">
//                     <h4 className="text-xl font-bold text-gray-900">{book.title}</h4>
//                     <p className="text-gray-600">Author: {book.author}</p>
//                     <p className="text-teal-700 font-semibold">Price: ₹{book.price}</p>
//                     <p className="text-gray-500">Category: {book.category}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ✅ Enlarged Image Popup with Zoom Controls */}
//       {selectedImage && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeImage}>
//           <div className="relative" onClick={(e) => e.stopPropagation()}>
//             <img
//               src={selectedImage}
//               alt="Enlarged"
//               className="rounded-lg shadow-2xl transition-transform"
//               style={{ transform: `scale(${zoom})`, maxWidth: "90vw", maxHeight: "90vh" }}
//             />
            
//             {/* ✅ Zoom & Close Buttons */}
//             <div className="absolute top-4 right-4">
//               <button className="bg-gray-700 text-white px-3 py-2 rounded-full text-xl" onClick={closeImage}>✖</button>
//             </div>
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
//               <button className="bg-gray-700 text-white px-5 py-2 rounded-full text-xl" onClick={zoomIn}>+</button>
//               <button className="bg-gray-700 text-white px-5 py-2 rounded-full text-xl" onClick={zoomOut}>-</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default GeneralTiles;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../Navbar/Navbar";

// const categories = {
//   "Agriculture & Earth Science": ["Agriculture & Life Sciences", "Earth Science"],
//   "Art and Craft": [],
//   "Astrology": [],
//   "Competitive Examination": [],
//   "Cookery & Food Technology": [],
//   "Commerce": ["Business Studies & Management", "Commerce & Economics"],
//   "Science & Engineering": ["Mathematics", "Physics", "Computer Science", "Civil Engineering"],
//   "Social Science": ["Political Science", "Public Administration", "Sociology"],
// };

// const GeneralTiles = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [zoom, setZoom] = useState(1);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [dragging, setDragging] = useState(false);
//   const [clickedOnce, setClickedOnce] = useState(false);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/home/general/book");
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

//   const openImage = (image) => {
//     setSelectedImage(image);
//     setZoom(1);
//     setPosition({ x: 0, y: 0 });
//     setClickedOnce(false); // Ensure it doesn't move on first click
//   };

//   const closeImage = () => {
//     setSelectedImage(null);
//     setZoom(1);
//   };

//   const zoomIn = (e) => {
//     e.stopPropagation();
//     setZoom((prev) => Math.min(prev + 0.2, 3));
//   };

//   const zoomOut = (e) => {
//     e.stopPropagation();
//     setZoom((prev) => Math.max(prev - 0.2, 1));
//   };

//   const startDragging = (e) => {
//     if (!clickedOnce) {
//       setClickedOnce(true); // First click stabilizes the image
//       return;
//     }
//     if (zoom > 1) {
//       setDragging(true);
//       setPosition({ x: e.clientX, y: e.clientY });
//     }
//   };

//   const stopDragging = () => {
//     setDragging(false);
//   };

//   const onDragging = (e) => {
//     if (dragging) {
//       setPosition((prev) => ({
//         x: prev.x + (e.clientX - position.x),
//         y: prev.y + (e.clientY - position.y),
//       }));
//     }
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
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Main Book Section */}
//         <div className="flex-1">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {filteredBooks.map((book) => (
//               <div
//                 className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition transform hover:shadow-xl cursor-pointer"
//                 key={book.id}
//                 onClick={() => openImage(book.coverImage)}
//               >
//                 <img src={book.coverImage} alt={book.title} className="w-full h-64 object-cover" />
//                 <div className="p-4">
//                   <h4 className="text-xl font-bold text-gray-900">{book.title}</h4>
//                   <p className="text-gray-600">Author: {book.author}</p>
//                   <p className="text-teal-700 font-semibold">Price: ₹{book.price}</p>
//                   <p className="text-gray-500">Category: {book.category}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Image Modal with Zoom & Dragging */}
//       {selectedImage && (
//         <div
//           className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50"
//           onClick={closeImage}
//         >
//           <button className="absolute top-5 right-5 text-white text-3xl" onClick={closeImage}>
//             ❌
//           </button>
//           <div
//             className="relative cursor-grab active:cursor-grabbing"
//             onMouseDown={startDragging}
//             onMouseMove={onDragging}
//             onMouseUp={stopDragging}
//             style={{
//               transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
//               transition: dragging ? "none" : "transform 0.2s ease-out",
//             }}
//           >
//             <img src={selectedImage} alt="Enlarged" className="rounded-lg shadow-2xl transition-transform" />
//           </div>
//           <div className="absolute bottom-5 flex gap-4">
//             <button className="bg-gray-700 text-white px-5 py-2 rounded-full text-xl" onClick={zoomIn}>+</button>
//             <button className="bg-gray-700 text-white px-5 py-2 rounded-full text-xl" onClick={zoomOut}>-</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default GeneralTiles;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../Navbar/Navbar";



// const categories = {
//      "Agriculture & Earth Science": ["Agriculture & Life Sciences", "Earth Science"],
//       "Art and Craft": [],
//       "Astrology": [],
//       "Competitive Examination": [],
//       "Cookery & Food Technology": [],
//       "Commerce": ["Business Studies & Management", "Commerce & Economics"],
//       "Demography": [],
//       "Disaster Management": [],
//       "Ergonomics": [],
//       "India, The World & Miscellaneous Topics": ["India", "The World"],
//       "Industry": [],
//       "Insurance": [],
//       "Military Affairs": [],
//       "Motivational and Self-help Books": [],
//       "Oceanography": [],
//       "Oil Exploration": [],
//       "Pets": [],
//       "Quality Control": [],
//       "Science & Engineering": [
//         "Mathematics",
//         "Science and Technology",
//         "Physics",
//         "Biological & Medical Sciences",
//         "Computer Science",
//         "Electronics, Electrical and Telecommunication Engineering",
//         "Civil Engineering",
//         "Mechanical Engineering",
//         "Chemistry, Chemical Engineering & Polymer Science",
//         "Minerals & Metallurgical Engineering"
//       ],
//       "Social Science": [
//         "Political Science & International Relations",
//         "Communication Studies",
//         "Public Administration",
//         "Sociology",
//         "Psychology",
//         "Biographies & Memoirs",
//         "Language & Literature",
//         "Philosophy & Religion",
//         "Energy and Environment",
//         "Library Science",
//         "Law",
//         "Education",
//         "Dictionaries"
//       ],
//       "Transportation": [],
//       "Valuation": [],
//       "Water Management": [],
//       "Yoga": []
// };

// const GeneralTiles = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [zoom, setZoom] = useState(1.5);

  
  
     

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/home/general/book");
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
//     <>
//       <Navbar />
//       <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-100 min-h-screen">
        
//        {/* Sidebar */}
// <div className="w-full md:w-1/4 bg-teal-700 text-white p-5 rounded-xl shadow-lg">
//   <h2 className="text-2xl font-bold border-b-2 border-white pb-2">CATEGORIES</h2>

//   <button
//     className={`w-full text-left p-2 mt-3 rounded-lg transition ${
//       selectedCategory === "" ? "bg-teal-500" : "hover:bg-teal-600"
//     }`}
//     onClick={() => setSelectedCategory("")}
//   >
//     📚 Show All Books
//   </button>

//   <ul className="mt-3">
//     {Object.keys(categories).map((category) => (
//       <li key={category} className="mt-2">
//         <button
//           className={`w-full text-left p-2 rounded-lg transition ${
//             selectedCategory === category ? "bg-teal-500" : "hover:bg-teal-600"
//           }`}
//           onClick={() => setSelectedCategory(category)}
//         >
//           {category}
//         </button>

//         {/* ✅ Show Subcategories */}
//         {categories[category].length > 0 && (
//           <ul className="pl-4 mt-1">
//             {categories[category].map((sub) => (
//               <li key={sub} className="mt-1">
//                 <button
//                   className={`w-full text-left p-2 rounded-lg text-sm transition ${
//                     selectedCategory === sub ? "bg-teal-400" : "hover:bg-teal-500"
//                   }`}
//                   onClick={() => setSelectedCategory(sub)}
//                 >
//                   ↳ {sub}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </li>
//     ))}
//   </ul>
// </div>


//         {/* Main Book Section */}
//         <div className="flex-1">
//           <div className="mb-4 flex justify-end">
//             <select className="p-2 border rounded-lg" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
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
//                 <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4" key={book.id} onClick={() => openPopup(book)}>
//                   <img src={book.coverImage} alt={book.title} className="w-full h-64 object-cover" />
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
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ✅ Enlarged Image Popup with Zoom Controls */}
//       {selectedBook && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closePopup}>
//           <div className="relative" onClick={(e) => e.stopPropagation()}>
//             <img
//               src={selectedBook.backImage}
//               alt="Enlarged"
//               className="rounded-lg shadow-2xl transition-transform"
//               style={{ transform: `scale(${zoom})`, maxWidth: "90vw", maxHeight: "90vh" }}
//             />
            
//             {/* ✅ Zoom & Close Buttons */}
//             <div className="absolute top-4 right-4">
//               <button className="bg-gray-700 text-white px-3 py-2 rounded-full text-xl" onClick={closePopup}>✖</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default GeneralTiles;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../Navbar/Navbar";
// import { useNavigate } from "react-router-dom"; // For navigation

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
//     "Minerals & Metallurgical Engineering"
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
//     "Dictionaries"
//   ],
//   "Transportation": [],
//   "Valuation": [],
//   "Water Management": [],
//   "Yoga": []
// };

// const GeneralTiles = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [zoom, setZoom] = useState(1.5);
//   const navigate = useNavigate(); // For navigation
  

//   // Fetch books
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/home/general/book");
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
//   const addToCart = async (bookId) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("Please log in to add items to the cart.");
//         return;
//       }

//       await axios.post(
//         "http://localhost:5001/add-to-cart",
//         { itemId: bookId, quantity: 1 },
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
//                     onClick={() => addToCart(book._id)}
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

// export default GeneralTiles;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom"; // For navigation

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
    "Minerals & Metallurgical Engineering"
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
    "Dictionaries"
  ],
  "Transportation": [],
  "Valuation": [],
  "Water Management": [],
  "Yoga": []
};

const GeneralTiles = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [zoom, setZoom] = useState(1.5);
  const navigate = useNavigate(); // For navigation

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/home/general/book");
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
    const subcategories = categories[selectedCategory] || [];

    if (selectedCategory) {
      updatedBooks = updatedBooks.filter((book) =>
        subcategories.length > 0 ? subcategories.includes(book.category) : book.category === selectedCategory
      );
    }

    if (sortOption === "title-asc") updatedBooks.sort((a, b) => a.title.localeCompare(b.title));
    if (sortOption === "title-desc") updatedBooks.sort((a, b) => b.title.localeCompare(a.title));
    if (sortOption === "price-asc") updatedBooks.sort((a, b) => a.price - b.price);
    if (sortOption === "price-desc") updatedBooks.sort((a, b) => b.price - a.price);

    setFilteredBooks(updatedBooks);
  }, [selectedCategory, books, sortOption]);

  // Add to Cart Functionality
  const addToCart = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to add items to the cart.");
        return;
      }

      await axios.post(
        "http://localhost:5001/api/cart/add-to-cart", // Correct endpoint
        { itemId: bookId, quantity: 1 }, // Add 1 item by default
        { headers: { Authorization: token } }
      );
      alert("Book added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add book to cart.");
    }
  };

  // Go to Cart Functionality
  const goToCart = () => {
    navigate("/cart"); // Navigate to the cart page
  };

  // Popup and Zoom Functions
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

  // Calculate Discounted Price
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
            {Object.keys(categories).map((category) => (
              <li key={category} className="mt-2">
                <button
                  className={`w-full text-left p-2 rounded-lg transition ${
                    selectedCategory === category ? "bg-teal-500" : "hover:bg-teal-600"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
                {categories[category].length > 0 && (
                  <ul className="pl-4 mt-1">
                    {categories[category].map((sub) => (
                      <li key={sub} className="mt-1">
                        <button
                          className={`w-full text-left p-2 rounded-lg text-sm transition ${
                            selectedCategory === sub ? "bg-teal-400" : "hover:bg-teal-500"
                          }`}
                          onClick={() => setSelectedCategory(sub)}
                        >
                          ↳ {sub}
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
          {/* Go to Cart Button */}
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
                <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4" key={book.id}>
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-64 object-cover cursor-pointer"
                    onClick={() => openPopup(book)}
                  />
                  <h4 className="text-xl font-bold text-gray-900 mt-2">{book.title}</h4>
                  <p className="text-gray-600">Author: {book.author}</p>
                  <p className="text-gray-500">ISBN: {book.isbn}</p>

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

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(book._id)}
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

      {/* Enlarged Image Popup */}
      {selectedBook && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closePopup}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedBook.backImage}
              alt="Enlarged"
              className="rounded-lg shadow-2xl transition-transform"
              style={{ transform: `scale(${zoom})`, maxWidth: "90vw", maxHeight: "90vh" }}
            />
            <div className="absolute top-4 right-4">
              <button className="bg-gray-700 text-white px-3 py-2 rounded-full text-xl" onClick={closePopup}>✖</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GeneralTiles;