import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate(`/search-results?query=${searchQuery}`);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        alert("Logout successful.");
        navigate("/");
      } else {
        const data = await response.json();
        alert(`Logout failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Section: Search Bar and User Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white shadow-md px-6 py-3 space-y-4 lg:space-y-0">
        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full lg:w-72 transition duration-300 hover:shadow-md">
          <input
            type="text"
            placeholder="Search books..."
            className="p-2 w-full outline-none text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-[#75609c] hover:bg-[#5a497a] text-white px-3 py-2 transition duration-300"
          >
            <FaSearch />
          </button>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-[#20232a] underline transition duration-300 hover:text-black"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="bg-[#75609c] hover:bg-[#5a497a] text-white px-4 py-2 rounded-md transition duration-300 shadow-md hover:shadow-lg"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <div className="w-10 h-10 bg-[#75609c] text-white flex justify-center items-center rounded-full text-lg font-semibold uppercase">
                {user.name.charAt(0)}
              </div>
              <button
                onClick={handleLogout}
                className="bg-[#75609c] hover:bg-[#5a497a] text-white px-4 py-2 rounded-md transition duration-300 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Header Section: Logo and Navigation */}
      <header className="bg-[#20232a] text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-3 px-6">
          {/* Logo */}
          <div>
            <img
              src="/images/alliedlogo.png"
              alt="Allied Publishers"
              className="h-12 w-auto"
            />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-6">
            <Link
              to="/"
              className="hover:text-[#75609c] transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/publisher"
              className="hover:text-[#75609c] transition duration-300"
            >
              Distribution
            </Link>
            <Link
              to="/special-agency"
              className="hover:text-[#75609c] transition duration-300"
            >
              Specialized Agencies
            </Link>
            <Link
              to="/export-info"
              className="hover:text-[#75609c] transition duration-300"
            >
              Export Division
            </Link>
            <Link
              to="/conference"
              className="hover:text-[#75609c] transition duration-300"
            >
              Conference Proceedings
            </Link>
            <Link
              to="/journal"
              className="hover:text-[#75609c] transition duration-300"
            >
              Journal
            </Link>
            <Link
              to="/management"
              className="hover:text-[#75609c] transition duration-300"
            >
              Management
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#75609c] transition duration-300"
            >
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Mobile Menu (Hidden by Default) */}
        <div
          ref={mobileMenuRef}
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } lg:hidden bg-[#20232a] w-full`}
        >
          <nav className="flex flex-col space-y-4 p-4">
            <Link
              to="/"
              className="hover:text-[#75609c] transition duration-300"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/publisher"
              className="hover:text-[#75609c] transition duration-300"
              onClick={closeMobileMenu}
            >
              Distribution
            </Link>
            <Link
              to="/special-agency"
              className="hover:text-[#75609c] transition duration-300"
              onClick={closeMobileMenu}
            >
              Specialized Agencies
            </Link>
            <Link
              to="/export-info"
              className="hover:text-[#75609c] transition duration-300"
              onClick={closeMobileMenu}
            >
              Export Division
            </Link>
            <Link
              to="/conference"
              className="hover:text-[#75609c] transition duration-300"
              onClick={closeMobileMenu}
            >
              Conference Proceedings
            </Link>
            <Link
              to="/journal"
              className="hover:text-[#75609c] transition duration-300"
              onClick={closeMobileMenu}
            >
              Journal
            </Link>
            <Link
              to="/management"
              className="hover:text-[#75609c] transition duration-300"
              onClick={closeMobileMenu}
            >
              Management
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#75609c] transition duration-300"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;