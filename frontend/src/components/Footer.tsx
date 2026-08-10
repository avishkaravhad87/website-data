import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-section">

          <div className="footer-brand">
            Handcrafted Studio
          </div>

          <p>
            Beautiful handmade products crafted with care.
            Explore our collection of bags, storage solutions
            and equipment.
          </p>

          <div className="footer-social">

            <a href="#" aria-label="Instagram">
              📷
            </a>

            <a href="#" aria-label="Facebook">
              f
            </a>

            <a href="#" aria-label="WhatsApp">
              ☎
            </a>

          </div>

        </div>


        {/* Shop */}

        <div className="footer-section">

          <h3>Shop</h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/bags">
            Handbags
          </Link>

          <Link to="/cloth-storage">
            Cloth Storage
          </Link>

          <Link to="/equipment">
            Other Equipment
          </Link>

        </div>


        {/* Help */}

        <div className="footer-section">

          <h3>Customer Care</h3>

          <Link to="/contact">
            Contact Us
          </Link>

          <Link to="/blog">
            Blog
          </Link>

          <Link to="/cart">
            Shopping Cart
          </Link>

        </div>


        {/* Contact */}

        <div className="footer-section">

          <h3>Get In Touch</h3>

          <p>
            📞 +91 8108857690
          </p>

          <p>
            ✉️ info@handbagstore.com
          </p>

          <p>
            📍 Maharashtra, India
          </p>

        </div>

      </div>


      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Handcrafted Studio.
          All rights reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;
