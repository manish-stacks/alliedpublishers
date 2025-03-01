


// import React, { useState } from 'react';
// import Navbar from '../Navbar/Navbar';
// import './Book.css';

// const BooksPage = () => {
//   const categories = [
//     'Agribusiness',
//     'Agricultural Economics',
//     'Agricultural Engineering',
//     'Agriculture',
//     'Agriculture Extension',
//     'Agriculture Statistics',
//     'Agronomy',
//     'Climate Change and Meteorology',
//     'Entomology',
//     'Horticulture and Pomology',
//   ];

//   const initialBooks = [
//     {
//       title: 'Metamorphosis by Franz Kafka [Premium Paperback]',
//       author: 'Franz Kafka',
//       format: 'Paperback',
//       price: 88,
//       mrp: 199,
//       discount: '56% off',
//       image: '/images/book2.jpg',
//     },
//     {
//       title: 'The Art of Letting Go: Move Beyond the Hurt, Find Emotional Freedom',
//       author: 'Nick Trenton',
//       format: 'Paperback',
//       price: 159,
//       mrp: 299,
//       discount: '47% off',
//       image: '/images/book3.jpg',
//     },
//     {
//       title: 'Advances in Mushroom Biotechnology',
//       author: 'M.C. Nair',
//       format: 'Hard Bound',
//       price: 120,
//       mrp: 250,
//       discount: '52% off',
//       image: '/images/book4.jpg',
//     },
//   ];

//   const [books, setBooks] = useState(initialBooks);
//   const [sortOption, setSortOption] = useState('');

//   // Sorting function
//   const handleSort = (option) => {
//     let sortedBooks = [...books];
//     if (option === 'title') {
//       sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
//     } else if (option === 'price') {
//       sortedBooks.sort((a, b) => a.price - b.price);
//     }
//     setBooks(sortedBooks);
//     setSortOption(option);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container">
//         {/* Sidebar for Categories */}
//         <div className="sidebar">
//           <h3>CATEGORIES</h3>
//           <ul>
//             {categories.map((category, index) => (
//               <li key={index}>{category}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Books Section */}
//         <div className="books-section">
//           <div className="sort-options">
//             <p>Sort By:</p>
//             <button
//               className={sortOption === 'title' ? 'active-sort' : ''}
//               onClick={() => handleSort('title')}
//             >
//               Title
//             </button>
//             <button
//               className={sortOption === 'price' ? 'active-sort' : ''}
//               onClick={() => handleSort('price')}
//             >
//               Price
//             </button>
//           </div>
//           {books.map((book, index) => (
//             <div className="book-card-horizontal" key={index}>
//               <img src={book.image} alt={book.title} className="book-image" />
//               <div className="book-details">
//                 <h4>{book.title}</h4>
//                 <p className="book-author">by {book.author}</p>
//                 <p className="book-format">{book.format}</p>
//                 <p className="book-price">
//                   ₹{book.price}{' '}
//                   <span className="mrp">
//                     M.R.P.: ₹{book.mrp}
//                   </span>{' '}
//                   <span className="discount">{book.discount}</span>
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default BooksPage;


// import React, { useState } from 'react';
// import Navbar from '../Navbar/Navbar';
// import './Book.css';

// const BooksPage = () => {
//   const categories = [
//     'Agribusiness',
//     'Agricultural Economics',
//     'Agricultural Engineering',
//     'Agriculture',
//     'Agriculture Extension',
//     'Agriculture Statistics',
//     'Agronomy',
//     'Climate Change and Meteorology',
//     'Entomology',
//     'Horticulture and Pomology',
//   ];

//   const initialBooks = [
//     {
//       title: 'Microconomics',
//       author: 'Franz Kafka',
//       format: 'Paperback',
//       price: 88,
//       mrp: 199,
//       discount: '56% off',
//       category: 'Agribusiness',
//       image: 'https://www.dropbox.com/scl/fi/0bgiqmy6n2zkp9km5dje1/01_Microconomics.jpg?rlkey=oyrppv2vduiuo3fjvsgf214uu&st=beyugsu0&raw=1',
//     },
//     {
//       title: 'Children and Learning',
//       author: 'Nick Trenton',
//       format: 'Paperback',
//       price: 159,
//       mrp: 299,
//       discount: '47% off',
//       category: 'Agribusiness',
//       image: 'https://www.dropbox.com/scl/fi/sfcoa05b8d7p6tl2md38l/02_Children-and-Learning.jpg?rlkey=lnlzrsoliec75yj2pj4731f6z&st=i6tihor9&raw=1',
//     },
//     {
//       title: 'Advances in Fish Processing Technology',
//       author: 'M.C. Nair',
//       format: 'Hard Bound',
//       price: 120,
//       mrp: 250,
//       discount: '52% off',
//       category: 'Agricultural Economics',
//       image: 'https://www.dropbox.com/scl/fi/pcswyc8m47b6txitbyrq8/03_Advances-in-Fish-Processing-Technology.jpg?rlkey=ts6nbx1ipjpvidb8k8zxibsw4&st=vvf78bdx&raw=1',
//     },
//     {
//       title: 'Engineering Graphics with an Introduction to AutoCAD',
//       author: 'M.C. Nair',
//       format: 'Hard Bound',
//       price: 120,
//       mrp: 250,
//       discount: '52% off',
//       category: 'Agricultural Economics',
//       image: 'https://www.dropbox.com/scl/fi/w5skm1xxyrt0ot2y6gwdu/04_Engineering-Graphics-with-an-Introduction-to-AutoCAD.jpg?rlkey=zcs9whv8jhq5xlvkfcqglxx20&st=061fgkug&raw=1',
//     },
//     {
//       title: 'Bhagavad Gita',
//       author: 'M.C. Nair',
//       format: 'Hard Bound',
//       price: 120,
//       mrp: 250,
//       discount: '52% off',
//       category: 'Agricultural Economics',
//       image: 'https://www.dropbox.com/scl/fi/3a8b7akgloj0h2n3oogru/05_Bhagavad-Gita.jpg?rlkey=jrg13xchrrpmaq739ap3nctw9&st=kpzagtvh&raw=1',
//     },
//     {
//       title: 'PHANTOMS OF CHITTAGONG',
//       author: 'M.C. Nair',
//       format: 'Hard Bound',
//       price: 120,
//       mrp: 250,
//       discount: '52% off',
//       category: 'Agricultural Economics',
//       image: 'https://www.dropbox.com/scl/fi/qwrp4pc1b5s2s89sso3b7/06_PHANTOMS-OF-CHITTAGONG.jpg?rlkey=rpchtn8i0q6weaantbd92nnff&st=vvvocoop&raw=1',
//     },
//     {
//       title: 'The Real Ramakrishna',
//       author: 'M.C. Nair',
//       format: 'Hard Bound',
//       price: 120,
//       mrp: 250,
//       discount: '52% off',
//       category: 'Agricultural Economics',
//       image: 'https://www.dropbox.com/scl/fi/7dch8xhy9e0pv29keu2jt/07_The-Real-Ramakrishna.jpg?rlkey=qj1zgdafe2tbwxctjcs5ecbx1&st=4bpo59nl&raw=1',
//     },
//     {
//       title: 'Millets 2023 A Transdisciplinary Approach to its Resurgence and Sustainability',
//       author: 'M.C. Nair',
//       format: 'Hard Bound',
//       price: 120,
//       mrp: 250,
//       discount: '52% off',
//       category: 'Agricultural Economics',
//       image: 'https://www.dropbox.com/scl/fi/8qvadqpnmmwjer2fddyno/08_Millets-2023-A-Transdisciplinary-Approach-to-its-Resurgence-and-Sustainability_cover_29-09-2023.jpg?rlkey=6f1w154rcmrcx213shzyufzic&st=0b713glt&raw=1',
//     },
//     {
//       title: 'Water Security for Agriculture_Cover_14-05-2024_Curve_',
//       author: 'M.C. Nair',
//       format: 'Hard Bound',
//       price: 120,
//       mrp: 250,
//       discount: '52% off',
//       category: 'Agricultural Economics',
//       image: 'https://www.dropbox.com/scl/fi/v4h8qbpgrbs61ewggqjz9/09_Water-Security-for-Agriculture_Cover_14-05-2024_Curve_.jpg?rlkey=2qhsar2fmg3mvs229a0p3msyf&st=aodgjid2&raw=1',
//     },
//   ];

//   const [books, setBooks] = useState(initialBooks);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [sortOption, setSortOption] = useState('');

//   // Filter books based on selected category
//   const filteredBooks = selectedCategory
//     ? books.filter((book) => book.category === selectedCategory)
//     : books;

//   // Sorting function
//   const handleSort = (option) => {
//     let sortedBooks = [...filteredBooks];
//     if (option === 'title') {
//       sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
//     } else if (option === 'price') {
//       sortedBooks.sort((a, b) => a.price - b.price);
//     }
//     setBooks(sortedBooks);
//     setSortOption(option);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container">
//         {/* Sidebar for Categories */}
//         <div className="sidebar">
//           <h2>CATEGORIES</h2>
//           <ul>
//             {categories.map((category, index) => (
//               <li
//                 key={index}
//                 onClick={() => setSelectedCategory(category)}
//                 style={{
//                   fontWeight: selectedCategory === category ? 'bold' : 'normal',
//                   textDecoration:
//                     selectedCategory === category ? 'underline' : 'none',
//                 }}
//               >
//                 {category}
//               </li>
//             ))}
//           </ul>
//           <button
//             className="clear-category-btn"
//             onClick={() => setSelectedCategory('')}
//           >
//             Show All Books
//           </button>
//         </div>

//         {/* Books Section */}
//         <div className="books-section">
//           <div className="sort-options">
//             <p>Sort By:</p>
//             <button
//               className={sortOption === 'title' ? 'active-sort' : ''}
//               onClick={() => handleSort('title')}
//             >
//               Title
//             </button>
//             <button
//               className={sortOption === 'price' ? 'active-sort' : ''}
//               onClick={() => handleSort('price')}
//             >
//               Price
//             </button>
//           </div>

//           {filteredBooks.length === 0 ? (
//   <p className="no-books-message">No Books Found!</p>
// ) : (
//   <div className="books-section"> 
//     {filteredBooks.map((book, index) => (
//       <div className="book-card-horizontal" key={index}>
//         <img src={book.image} alt={book.title} className="book-image" />
//         <div className="book-details">
//           <h4>{book.title}</h4>
//           <p className="book-author">by {book.author}</p>
//           <p className="book-format">{book.format}</p>
//           <p className="book-price">
//             ₹{book.price}{' '}
//             <span className="mrp">M.R.P.: ₹{book.mrp}</span>{' '}
//             <span className="discount">{book.discount}</span>
//           </p>
//         </div>
//       </div>
//     ))}
//   </div>
// )}
// </div>
// </div>
//     </>
//   );
// };

// export default BooksPage;

import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const BooksPage = () => {
  const categories = [
    "Agribusiness",
    "Agricultural Economics",
    "Agricultural Engineering",
    "Agriculture",
    "Agriculture Extension",
    "Agriculture Statistics",
    "Agronomy",
    "Climate Change and Meteorology",
    "Entomology",
    "Horticulture and Pomology",
  ];

  const initialBooks = [
    {
      title: "Microconomics",
      author: "Franz Kafka",
      format: "Paperback",
      price: 88,
      mrp: 199,
      discount: "56% off",
      category: "Agribusiness",
      image:
        "https://www.dropbox.com/scl/fi/0bgiqmy6n2zkp9km5dje1/01_Microconomics.jpg?rlkey=oyrppv2vduiuo3fjvsgf214uu&st=beyugsu0&raw=1",
    },
    {
      title: "Children and Learning",
      author: "Nick Trenton",
      format: "Paperback",
      price: 159,
      mrp: 299,
      discount: "47% off",
      category: "Agribusiness",
      image:
        "https://www.dropbox.com/scl/fi/sfcoa05b8d7p6tl2md38l/02_Children-and-Learning.jpg?rlkey=lnlzrsoliec75yj2pj4731f6z&st=i6tihor9&raw=1",
    },
    {
            title: 'Advances in Fish Processing Technology',
            author: 'M.C. Nair',
            format: 'Hard Bound',
            price: 120,
            mrp: 250,
            discount: '52% off',
            category: 'Agricultural Economics',
            image: 'https://www.dropbox.com/scl/fi/pcswyc8m47b6txitbyrq8/03_Advances-in-Fish-Processing-Technology.jpg?rlkey=ts6nbx1ipjpvidb8k8zxibsw4&st=vvf78bdx&raw=1',
          },
          {
            title: 'Engineering Graphics with an Introduction to AutoCAD',
            author: 'M.C. Nair',
            format: 'Hard Bound',
            price: 120,
            mrp: 250,
            discount: '52% off',
            category: 'Agricultural Economics',
            image: 'https://www.dropbox.com/scl/fi/w5skm1xxyrt0ot2y6gwdu/04_Engineering-Graphics-with-an-Introduction-to-AutoCAD.jpg?rlkey=zcs9whv8jhq5xlvkfcqglxx20&st=061fgkug&raw=1',
          },
          {
            title: 'Bhagavad Gita',
            author: 'M.C. Nair',
            format: 'Hard Bound',
            price: 120,
            mrp: 250,
            discount: '52% off',
            category: 'Agricultural Economics',
            image: 'https://www.dropbox.com/scl/fi/3a8b7akgloj0h2n3oogru/05_Bhagavad-Gita.jpg?rlkey=jrg13xchrrpmaq739ap3nctw9&st=kpzagtvh&raw=1',
          },
          {
            title: 'PHANTOMS OF CHITTAGONG',
            author: 'M.C. Nair',
            format: 'Hard Bound',
            price: 120,
            mrp: 250,
            discount: '52% off',
            category: 'Agricultural Economics',
            image: 'https://www.dropbox.com/scl/fi/qwrp4pc1b5s2s89sso3b7/06_PHANTOMS-OF-CHITTAGONG.jpg?rlkey=rpchtn8i0q6weaantbd92nnff&st=vvvocoop&raw=1',
          },
          {
            title: 'The Real Ramakrishna',
            author: 'M.C. Nair',
            format: 'Hard Bound',
            price: 120,
            mrp: 250,
            discount: '52% off',
            category: 'Agricultural Economics',
            image: 'https://www.dropbox.com/scl/fi/7dch8xhy9e0pv29keu2jt/07_The-Real-Ramakrishna.jpg?rlkey=qj1zgdafe2tbwxctjcs5ecbx1&st=4bpo59nl&raw=1',
          },
          {
            title: 'Millets 2023 A Transdisciplinary Approach to its Resurgence and Sustainability',
            author: 'M.C. Nair',
            format: 'Hard Bound',
            price: 120,
            mrp: 250,
            discount: '52% off',
            category: 'Agricultural Economics',
            image: 'https://www.dropbox.com/scl/fi/8qvadqpnmmwjer2fddyno/08_Millets-2023-A-Transdisciplinary-Approach-to-its-Resurgence-and-Sustainability_cover_29-09-2023.jpg?rlkey=6f1w154rcmrcx213shzyufzic&st=0b713glt&raw=1',
          },
          {
            title: 'Water Security for Agriculture_Cover_14-05-2024_Curve_',
            author: 'M.C. Nair',
            format: 'Hard Bound',
            price: 120,
            mrp: 250,
            discount: '52% off',
            category: 'Agricultural Economics',
            image: 'https://www.dropbox.com/scl/fi/v4h8qbpgrbs61ewggqjz9/09_Water-Security-for-Agriculture_Cover_14-05-2024_Curve_.jpg?rlkey=2qhsar2fmg3mvs229a0p3msyf&st=aodgjid2&raw=1',
          },
  ];

  const [books, setBooks] = useState(initialBooks);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Filter books based on selected category
  const filteredBooks = selectedCategory
    ? books.filter((book) => book.category === selectedCategory)
    : books;

  // Sorting function
  const handleSort = (option) => {
    let sortedBooks = [...filteredBooks];
    if (option === "title") {
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "price") {
      sortedBooks.sort((a, b) => a.price - b.price);
    }
    setBooks(sortedBooks);
    setSortOption(option);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-8 p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
        {/* Sidebar */}
        <div className="w-1/4 bg-gradient-to-b from-teal-600 to-teal-700 text-white p-5 rounded-xl shadow-lg h-fit">

          <h2 className="text-2xl font-bold border-b-2 border-white pb-2">
            CATEGORIES
          </h2>
          <ul className="mt-4 space-y-2">
            {categories.map((category, index) => (
              <li
                key={index}
                className={`cursor-pointer p-2 rounded-md transition-all ${
                  selectedCategory === category
                    ? "font-bold underline bg-teal-500"
                    : "hover:bg-teal-500 hover:scale-105"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
          <button
            className="mt-4 w-full py-2 bg-teal-700 hover:bg-teal-500 rounded-md shadow-md transition"
            onClick={() => setSelectedCategory("")}
          >
            Show All Books
          </button>
        </div>

        {/* Books Section */}
        <div className="w-full md:w-3/4">
          {/* Sorting Options */}
          <div className="flex items-center space-x-4 mb-6">
            <p className="font-semibold">Sort By:</p>
            <button
              className={`px-4 py-2 rounded-md transition ${
                sortOption === "title"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => handleSort("title")}
            >
              Title
            </button>
            <button
              className={`px-4 py-2 rounded-md transition ${
                sortOption === "price"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => handleSort("price")}
            >
              Price
            </button>
          </div>

          {filteredBooks.length === 0 ? (
            <p className="text-center text-gray-600 text-xl font-semibold">
              No Books Found!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book, index) => (
                <div
                  key={index}
                  className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-md bg-white transition transform hover:-translate-y-2 hover:scale-105"
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h4 className="text-lg font-semibold">{book.title}</h4>
                  <p className="text-gray-600 text-sm">by {book.author}</p>
                  <p className="text-gray-500 text-sm">{book.format}</p>
                  <p className="text-orange-600 font-bold text-lg">
                    ₹{book.price}{" "}
                    <span className="text-gray-500 line-through text-sm">
                      M.R.P.: ₹{book.mrp}
                    </span>
                    <span className="text-red-600 text-sm ml-2">
                      {book.discount}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BooksPage;
