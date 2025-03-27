
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [adminHomeOpen, setAdminHomeOpen] = useState(false);
  const [adminNavbarOpen, setAdminNavbarOpen] = useState(false);
  const [adminBooksOpen, setAdminBooksOpen] = useState(false);
  const [adminCategoriesOpen, setAdminCategoriesOpen] = useState(false);
  const [adminPaymentsOpen, setAdminPaymentsOpen] = useState(false); // New state for payments & delivery

  return (
    <div className="w-64 h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white fixed left-0 top-0 p-5 shadow-lg overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul className="space-y-2">
        {/* Home Dropdown */}
        <li>
          <button
            className="flex items-center w-full text-left p-2 hover:bg-gray-700 rounded transition"
            onClick={() => setAdminHomeOpen(!adminHomeOpen)}
            aria-expanded={adminHomeOpen}
          >
            <i className="fas fa-home mr-3"></i> Home
          </button>
          {adminHomeOpen && (
            <ul className="ml-4 space-y-1">
              <li>
                <Link
                  to="/admin/about-us"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/authors"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  Author
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/bestsellers"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  Bestseller
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/locations"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  Location
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/images"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  Caraousel Images
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Books Dropdown */}
        <li>
          <button
            className="flex items-center w-full text-left p-2 hover:bg-gray-700 rounded transition"
            onClick={() => setAdminBooksOpen(!adminBooksOpen)}
            aria-expanded={adminBooksOpen}
          >
            <i className="fas fa-book mr-3"></i> Books
          </button>
          {adminBooksOpen && (
            <ul className="ml-4 space-y-1">
              <li>
                <Link
                  to="/admin/general/upload"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  General Books Upload
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/conference/upload"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  Conference Proceeding Books
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Combined Categories Dropdown */}
        <li>
          <button
            className="flex items-center w-full text-left p-2 hover:bg-gray-700 rounded transition"
            onClick={() => setAdminCategoriesOpen(!adminCategoriesOpen)}
            aria-expanded={adminCategoriesOpen}
          >
            <i className="fas fa-tags mr-3"></i> Categories
          </button>
          {adminCategoriesOpen && (
            <ul className="ml-4 space-y-1">
              <li>
                <Link
                  to="/admin/category"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  General Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/conference-categories"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  Conference Categories
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Navbar Dropdown */}
        <li>
          <button
            className="flex items-center w-full text-left p-2 hover:bg-gray-700 rounded transition"
            onClick={() => setAdminNavbarOpen(!adminNavbarOpen)}
            aria-expanded={adminNavbarOpen}
          >
            <i className="fas fa-bars mr-3"></i> Navbar
          </button>
          {adminNavbarOpen && (
            <ul className="ml-4 space-y-1">
              <li>
                <Link
                  to="/admin/conference"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  Conference Proceeding
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/export-info"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  Export Info
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/contact"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/management"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  Management
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/publisher"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  Distribution
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/special-agency"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  Specialized Agency
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Orders Link */}
        <li>
          <Link
            to="/admin/orders"
            className="flex items-center w-full text-left p-2 hover:bg-gray-700 rounded transition"
          >
            <i className="fas fa-shopping-cart mr-3"></i> Orders
          </Link>
        </li>

        {/* New Payments & Delivery Dropdown */}
        <li>
          <button
            className="flex items-center w-full text-left p-2 hover:bg-gray-700 rounded transition"
            onClick={() => setAdminPaymentsOpen(!adminPaymentsOpen)}
            aria-expanded={adminPaymentsOpen}
          >
            <i className="fas fa-money-bill-wave mr-3"></i> Payments & Delivery
          </button>
          {adminPaymentsOpen && (
            <ul className="ml-4 space-y-1">
              <li>
                <Link
                  to="/admin/qrcode"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  Payment QR Code
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/delivery"
                  className="block p-2 text-sm hover:bg-gray-700 rounded"
                >
                  Delivery Charges
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;