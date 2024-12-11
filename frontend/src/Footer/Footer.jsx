import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import './footer.css'; 

const Footer = () => {
  return (
    <footer className="footer relative z-20 bg-white shadow-2xl ">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div>
            <h3 className="footer-title">TAB Travel</h3>
            <p className="footer-text">
              Making your travel dreams come true with unforgettable experiences and exceptional service.
            </p>
            <div className="social__links">
              <a href="https://www.facebook.com/DonaldTrump" className="social-link">
                <Facebook/>
              </a>
              <a href="https://x.com/elonmusk" className="social-link">
                <Twitter />
              </a>
              <a href="https://www.youtube.com/@binhbb" className="social-link">
                <Youtube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-title">Quick Links</h3>
            <ul className="quick-links">
              <li><Link to="/about" className="quick-link">About Us</Link></li>
              <li><Link to="/exotic_tours" className="quick-link">Exotic Tours</Link></li>
              <li><Link to="/tours" className="quick-link">Tour Packages</Link></li>
              <li><a href="#" className="quick-link">Travel Blog</a></li>
              <li><a href="#" className="quick-link">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="footer-title">Contact Us</h3>
            <ul className="contact-list">
              <li className="contact-item">
                <Mail className="contact-icon" />
                <span>ITCSIU222xx@student.hcmiu.edu.vn</span>
              </li>
              <li className="contact-item">
                <Phone className="contact-icon" />
                <span>+84 97476xxxx</span>
              </li>
              <li className="contact-item">
                <MapPin className="contact-icon" />
                <span>Thai JackFruit Farm, Bien Hoa, Dong Nai</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} TAB Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;