import React from 'react';
import './Footer.css'; // Link to the CSS file
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure Font Awesome is imported

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2>Allied Publishers</h2>
          <p style={{ textAlign: 'justify' }}>
            Allied Publishers is dedicated to bringing you the best books,
            authors, and literary experiences. We strive to connect readers
            with the knowledge and stories that inspire and enlighten.
          </p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/bestsellers">Bestsellers</a></li>
            <li><a href="/featured-author">Featured Author</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Allied Publishers. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
