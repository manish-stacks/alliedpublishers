import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#20232a] to-[#333842] text-white py-12">
      <div className="container mx-auto px-6">
        {/* Layout with custom spacing */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* About Section - Added margin right */}
          <div className="flex-1 min-w-[250px] space-y-4 mr-0 md:mr-16 lg:mr-24">
            <h2 className="text-2xl font-bold text-[#75609c] text-center md:text-left">Allied Publishers</h2>
            <p className="text-gray-300 text-sm text-center md:text-left">
              Allied Publishers is dedicated to bringing you the best books,
              authors, and literary experiences. We strive to connect readers
              with the knowledge and stories that inspire and enlighten.
            </p>
          </div>

          {/* Quick Links Section - Pushed more to the right */}
          <div className="flex-1 min-w-[180px] space-y-4 flex flex-col items-center md:items-start ml-0 md:ml-8">
            <h3 className="text-xl font-bold text-[#75609c]">Quick Links</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <a href="/about-us" className="text-gray-300 hover:text-[#75609c] transition duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/all-authors" className="text-gray-300 hover:text-[#75609c] transition duration-300">
                  Featured Authors
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-[#75609c] transition duration-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="flex-1 min-w-[180px] space-y-4 flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold text-[#75609c]">Follow Us</h3>
            <div className="flex space-x-6">
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
          <p>
            A Digital Creation by&nbsp;
            <a href="https://www.linkedin.com/in/disha-purwar-392b7a319/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline">
              Disha Purwar
            </a>&nbsp;and&nbsp;
            <a href="https://www.linkedin.com/in/mansi-bakshi-386b762a7/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline">
              Mansi Bakshi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;