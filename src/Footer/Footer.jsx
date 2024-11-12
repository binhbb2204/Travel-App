import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import './footer.css'
const Footer = () => {
    return (
        <footer className = "footer">
            <div className="footer-container">
                <div className="footer-grip">
                    <div>
                      <h3 className="footer-title">
                        TAB Travel
                      </h3>
                      <p className="footer-text">
                        Making your travel dreams come true with unforgettable experiences and exceptional service.
                      </p>
                      <div className="social-links">
                        <a href="https://www.facebook.com/DonaldTrump" className="social-link">
                          <Facebook/>
                        </a>
                        <a href="https://x.com/BinhTra45804313" className="social-link">
                          <Twitter/>
                        </a>
                        <a href="https://www.instagram.com/realdonaldtrump/" className="social-link">
                          <Instagram/>
                        </a>
                        <a href="https://www.youtube.com/@binhbb" className="social-link">
                          <Youtube/>
                        </a>
                      </div>
                    </div>

                    {/* Quick Link */}
                    <div>
                      <h3 className="footer-title">Quick Links</h3>
                      <ul className="quick-links">
                          <li><a href="#" className="quick-link">About Us</a></li>
                          <li><a href="#" className="quick-link">Travel Blog</a></li>
                          <li><a href="#" className="quick-link">Contact Us</a></li>
                      </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;