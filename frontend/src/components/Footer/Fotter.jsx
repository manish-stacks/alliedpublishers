import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure Font Awesome is imported

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#20232a] to-[#333842] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-2xl font-bold text-[#75609c]">Allied Publishers</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Allied Publishers is dedicated to bringing you the best books,
              authors, and literary experiences. We strive to connect readers
              with the knowledge and stories that inspire and enlighten.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-xl font-bold text-[#75609c]">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-300 hover:text-[#75609c] transition duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/bestsellers" className="text-gray-300 hover:text-[#75609c] transition duration-300">
                  Bestsellers
                </a>
              </li>
              <li>
                <a href="/featured-author" className="text-gray-300 hover:text-[#75609c] transition duration-300">
                  Featured Author
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-[#75609c] transition duration-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-xl font-bold text-[#75609c]">Contact Info</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <i className="fas fa-map-marker-alt text-[#75609c]"></i>
                <span>123 Book Street, Knowledge City</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <i className="fas fa-phone text-[#75609c]"></i>
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <i className="fas fa-envelope text-[#75609c]"></i>
                <span>info@alliedpublishers.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-xl font-bold text-[#75609c]">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-6 pl-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#75609c] transition duration-300"
              >
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#75609c] transition duration-300"
              >
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#75609c] transition duration-300"
              >
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#75609c] transition duration-300"
              >
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Allied Publishers. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;