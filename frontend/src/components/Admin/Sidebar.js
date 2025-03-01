import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [adminHomeOpen, setAdminHomeOpen] = useState(false);
  const [adminNavbarOpen, setAdminNavbarOpen] = useState(false);

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
      </ul>
    </div>
  );
};

export default Sidebar;
