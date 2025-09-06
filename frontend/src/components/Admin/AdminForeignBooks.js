import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import Sidebar from "./Sidebar";

const AdminForeignBooks = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/admin/foreign/books");
      setBooks(response.data);
    } catch (error) {
      setMessage(error.response?.data?.error || "Error fetching books");
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
      const response = await api.post("/admin/foreign/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
      setFile(null);
      fetchBooks();
    } catch (error) {
      setMessage(error.response?.data?.error || "Error uploading file");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    setIsLoading(true);
    try {
      await api.delete(`/admin/foreign/books/${id}`);
      setMessage("Book deleted successfully");
      fetchBooks();
    } catch (error) {
      setMessage(error.response?.data?.error || "Error deleting book");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (book) => setEditingBook({ ...book });

  const handleUpdate = async () => {
    if (!editingBook) return;
    setIsLoading(true);
    try {
      await api.put(`/admin/foreign/books/${editingBook._id}`, editingBook);
      setMessage("Book updated successfully");
      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      setMessage(error.response?.data?.error || "Error updating book");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingBook({
      ...editingBook,
      [name]: ["price", "qty", "publishYear"].includes(name) ? Number(value) : value,
    });
  };

  const filteredBooks = books.filter(
    (book) =>
      book.bookcode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.titleName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authorName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />

      <div className="flex-1 px-10 ml-[260px] py-8">
        <div className="w-full max-w-6xl mx-auto space-y-8">

          {/* Upload Section */}
          <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg">
            <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
              Upload Foreign Books (Excel)
            </h3>
            <div className="flex flex-col items-center space-y-6">
              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                className="mb-4 border border-gray-300 rounded px-3 py-2 w-full max-w-md"
              />
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
                    message.toLowerCase().includes("success")
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {message}
                </div>
              )}
              <p className="text-center text-sm text-gray-600 max-w-md">
                Excel file must contain columns:{" "}
                <span className="font-bold">Bookcode, Title Name, Author Name, Publish Year, Currency, Price, Qty</span>
              </p>
            </div>
          </div>

          {/* Books Management Section */}
          <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg">
            <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
              Manage Foreign Books
            </h3>

            {/* Search */}
            <div className="mb-6 flex justify-between items-center">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search by Bookcode, Title, or Author"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10263e]"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
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

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-[#10263e] shadow">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-[#10263e] text-white">
                  <tr>
                    <th className="text-left px-4 py-3 uppercase text-sm font-semibold">Bookcode</th>
                    <th className="text-left px-4 py-3 uppercase text-sm font-semibold">Title Name</th>
                    <th className="text-left px-4 py-3 uppercase text-sm font-semibold">Author Name</th>
                    <th className="text-left px-4 py-3 uppercase text-sm font-semibold">Publish Year</th>
                    <th className="text-left px-4 py-3 uppercase text-sm font-semibold">Currency</th>
                    <th className="text-left px-4 py-3 uppercase text-sm font-semibold">Price</th>
                    <th className="text-left px-4 py-3 uppercase text-sm font-semibold">Qty</th>
                    <th className="text-center px-4 py-3 uppercase text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentBooks.length > 0 ? (
                    currentBooks.map((book) => (
                      <tr key={book._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{book.bookcode}</td>
                        <td className="px-4 py-3">{book.titleName}</td>
                        <td className="px-4 py-3">{book.authorName}</td>
                        <td className="px-4 py-3">{book.publishYear}</td>
                        <td className="px-4 py-3">{book.curr}</td>
                        <td className="px-4 py-3">{book.price.toFixed(2)}</td>
                        <td className="px-4 py-3">{book.qty}</td>
                        <td className="px-4 py-3 text-center space-x-2">
                          <button
                            onClick={() => handleEdit(book)}
                            className="px-3 py-1 bg-[#10263e] text-white rounded hover:bg-[#357ABD] transition"
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
                      <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                        No books found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-5 mt-6">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded shadow hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="font-medium text-gray-800 text-lg">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded shadow hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            )}
          </div>

          {/* Edit Modal */}
          {editingBook && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Edit Foreign Book</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bookcode</label>
                    <input
                      type="text"
                      name="bookcode"
                      value={editingBook.bookcode || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title Name</label>
                    <input
                      type="text"
                      name="titleName"
                      value={editingBook.titleName || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                    <input
                      type="text"
                      name="authorName"
                      value={editingBook.authorName || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Publish Year</label>
                    <input
                      type="number"
                      name="publishYear"
                      value={editingBook.publishYear || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <input
                      type="text"
                      name="curr"
                      value={editingBook.curr || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={editingBook.price || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      name="qty"
                      value={editingBook.qty || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      min="0"
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
    </div>
  );
};

export default AdminForeignBooks;
