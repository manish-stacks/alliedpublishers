
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/auth/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null); // Reset the user state
        alert("Logout successful.");
        navigate("/"); // Redirect to home or login page
      } else {
        const data = await response.json();
        alert(`Logout failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      {/* Search Bar & Auth Buttons */}
      <div className="flex justify-end items-center bg-white shadow-md px-6 py-3">
        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-72 mr-4 transition duration-300 hover:shadow-md">
          <input type="text" placeholder="Search..." className="p-2 w-full outline-none text-gray-700" />
          <button className="bg-[#75609c] hover:bg-[#5a497a] text-white px-3 py-2 transition duration-300">
            <FaSearch />
          </button>
        </div>

        {/* If NOT logged in, show Sign-in & Sign-up */}
        {!user ? (
          <div className="flex items-center gap-2">
            <Link to="/login" className="text-[#20232a] underline transition duration-300 hover:text-black">
              Sign in
            </Link>
            <Link to="/register" className="bg-[#75609c] hover:bg-[#5a497a] text-white px-4 py-2 rounded-md transition duration-300 shadow-md hover:shadow-lg">
              Sign up
            </Link>
          </div>
        ) : (
          // If Logged In -> Show Profile Circle & Logout Button
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#75609c] text-white flex justify-center items-center rounded-full text-lg font-semibold uppercase">
              {user.name.charAt(0)}
            </div>
            <button onClick={handleLogout} className="bg-[#75609c] hover:bg-[#5a497a] text-white px-4 py-2 rounded-md transition duration-300 shadow-md hover:shadow-lg">
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Navbar */}
      <header className="bg-[#20232a] text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-3 px-6">
          {/* Logo */}
          <div>
            <img src="/images/alliedlogo.png" alt="Allied Publishers" className="h-12 w-auto" />
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex space-x-6">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/publisher" className="nav-link">Distribution</Link>
            <Link to="/special-agency" className="nav-link">Specialized Agencies</Link>
            <Link to="/export-info" className="nav-link">Export Division</Link>
            <Link to="/conference" className="nav-link">Conference Proceedings</Link>
            <Link to="/journal" className="nav-link">Journal</Link>
            <Link to="/management" className="nav-link">Management</Link>
            <Link to="/contact" className="nav-link">Contact Us</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white focus:outline-none">
            ☰
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
