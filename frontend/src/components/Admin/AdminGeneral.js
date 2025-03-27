// import React, { useState } from "react";
// import axios from "axios";
// import Sidebar from "./Sidebar";

// const AdminGeneral = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//     setMessage(""); // Clear previous messages when new file is selected
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage("Please select a file");
//       return;
//     }

//     setIsLoading(true);
//     setMessage("Uploading...");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post("http://localhost:5001/admin/general/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage(error.response?.data?.error || "Error uploading file");
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#d5d8dc]">
//       <Sidebar />
      
//       {/* Main Content Area Shifted Right */}
//       <div className="flex-1 flex justify-center items-center px-10 ml-[260px]">
//         <div className="w-full max-w-3xl bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
//           <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
//             Upload General Tiles Books
//           </h3>

//           <div className="flex flex-col items-center space-y-6">
//             <div className="w-full">
//               <label className="block text-lg font-bold text-black uppercase text-center mb-2">
//                 Select Excel File (.xlsx)
//               </label>
//               <div className="flex items-center justify-center w-full">
//                 <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#75609c] border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition">
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//                     </svg>
//                     <p className="mb-2 text-sm text-gray-500">
//                       <span className="font-semibold">Click to upload</span> or drag and drop
//                     </p>
//                     <p className="text-xs text-gray-500">XLSX only</p>
//                   </div>
//                   <input 
//                     type="file" 
//                     accept=".xlsx" 
//                     onChange={handleFileChange} 
//                     className="hidden" 
//                   />
//                 </label>
//               </div>
//               {file && (
//                 <p className="mt-2 text-sm text-center text-gray-700">
//                   Selected file: <span className="font-medium">{file.name}</span>
//                 </p>
//               )}
//             </div>

//             <button 
//               onClick={handleUpload}
//               disabled={isLoading || !file}
//               className={`px-6 py-3 text-white font-bold uppercase rounded-lg transition hover:shadow-md hover:scale-105 active:scale-95 ${
//                 isLoading || !file 
//                   ? "bg-gray-400 cursor-not-allowed" 
//                   : "bg-[#10263e] hover:bg-[#357ABD]"
//               }`}
//             >
//               {isLoading ? "Uploading..." : "Upload File"}
//             </button>

//             {message && (
//               <div className={`w-full p-3 rounded-lg text-center ${
//                 message.includes("success") 
//                   ? "bg-green-100 text-green-800" 
//                   : "bg-red-100 text-red-800"
//               }`}>
//                 {message}
//               </div>
//             )}

//             <div className="mt-4 text-sm text-gray-600 text-center">
//               <p>Note: The Excel file should match the General collection schema.</p>
//               <p>Required fields: <span className="font-bold">title</span> and <span className="font-bold">type</span></p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminGeneral;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminGeneral = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  // Fetch all books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5001/admin/general/books");
      setBooks(response.data);
    } catch (error) {
      setMessage(error.response?.data?.error || "Error fetching books");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    setIsLoading(true);
    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5001/admin/general/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(response.data.message);
      fetchBooks(); // Refresh the book list after upload
    } catch (error) {
      setMessage(error.response?.data?.error || "Error uploading file");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:5001/admin/general/books/${id}`);
      setMessage("Book deleted successfully");
      fetchBooks(); // Refresh the book list
    } catch (error) {
      setMessage(error.response?.data?.error || "Error deleting book");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (book) => {
    setEditingBook({ ...book });
  };

  const handleUpdate = async () => {
    if (!editingBook) return;

    setIsLoading(true);
    try {
      await axios.put(
        `http://localhost:5001/admin/general/books/${editingBook._id}`,
        editingBook
      );
      setMessage("Book updated successfully");
      setEditingBook(null);
      fetchBooks(); // Refresh the book list
    } catch (error) {
      setMessage(error.response?.data?.error || "Error updating book");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingBook({
      ...editingBook,
      [name]: name === "price" || name === "stock" || name === "discount" 
        ? Number(value) 
        : value,
    });
  };

  // Filter books based on search term
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />

      {/* Main Content Area Shifted Right */}
      <div className="flex-1 px-10 ml-[260px] py-8">
        <div className="w-full max-w-6xl mx-auto space-y-8">
          {/* Upload Section */}
          <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg">
            <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
              Upload General Tiles Books
            </h3>

            <div className="flex flex-col items-center space-y-6">
              <div className="w-full">
                <label className="block text-lg font-bold text-black uppercase text-center mb-2">
                  Select Excel File (.xlsx)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#75609c] border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-gray-500">XLSX only</p>
                    </div>
                    <input
                      type="file"
                      accept=".xlsx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {file && (
                  <p className="mt-2 text-sm text-center text-gray-700">
                    Selected file:{" "}
                    <span className="font-medium">{file.name}</span>
                  </p>
                )}
              </div>

              <button
                onClick={handleUpload}
                disabled={isLoading || !file}
                className={`px-6 py-3 text-white font-bold uppercase rounded-lg transition hover:shadow-md hover:scale-105 active:scale-95 ${
                  isLoading || !file
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#10263e] hover:bg-[#357ABD]"
                }`}
              >
                {isLoading ? "Uploading..." : "Upload File"}
              </button>

              {message && (
                <div
                  className={`w-full p-3 rounded-lg text-center ${
                    message.includes("success")
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="mt-4 text-sm text-gray-600 text-center">
                <p>Note: The Excel file should match the General collection schema.</p>
                <p>
                  Required fields:{" "}
                  <span className="font-bold">title</span> and{" "}
                  <span className="font-bold">type</span>
                </p>
              </div>
            </div>
          </div>

          {/* Books Management Section */}
          <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg">
            <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
              Manage General Books
            </h3>

            {/* Search and Filter */}
            <div className="mb-6 flex justify-between items-center">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search books..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10263e]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Books Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-[#10263e] text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Title</th>
                    <th className="py-3 px-4 text-left">Author</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Price</th>
                    <th className="py-3 px-4 text-left">Stock</th>
                    <th className="py-3 px-4 text-left">ISBN</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentBooks.length > 0 ? (
                    currentBooks.map((book) => (
                      <tr key={book._id} className="hover:bg-gray-50">
                        <td className="py-3 px-4">{book.title}</td>
                        <td className="py-3 px-4">{book.author || "-"}</td>
                        <td className="py-3 px-4">{book.category || "-"}</td>
                        <td className="py-3 px-4">${book.price?.toFixed(2) || "0.00"}</td>
                        <td className="py-3 px-4">{book.stock || "0"}</td>
                        <td className="py-3 px-4">{book.isbn || "-"}</td>
                        <td className="py-3 px-4 flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(book)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(book._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-4 text-center text-gray-500">
                        No books found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded ${
                          currentPage === page
                            ? "bg-[#10263e] text-white"
                            : "border"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {editingBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h3 className="text-2xl font-bold mb-4">Edit Book</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editingBook.title || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={editingBook.author || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={editingBook.category || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={editingBook.type || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={editingBook.price || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={editingBook.stock || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ISBN
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    value={editingBook.isbn || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Type
                  </label>
                  <input
                    type="text"
                    name="coverType"
                    value={editingBook.coverType || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    name="coverImage"
                    value={editingBook.coverImage || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Back Image URL
                  </label>
                  <input
                    type="text"
                    name="backImage"
                    value={editingBook.backImage || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={editingBook.discount || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setEditingBook(null)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isLoading}
                  className="px-4 py-2 bg-[#10263e] text-white rounded hover:bg-[#357ABD] disabled:bg-gray-400"
                >
                  {isLoading ? "Updating..." : "Update Book"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGeneral;