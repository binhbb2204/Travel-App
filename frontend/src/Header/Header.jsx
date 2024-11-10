import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import logo from '../images/TAB.gif';
import './header.css'

const nav_links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '#',
    display: 'About'
  },
  {
    path: '/tours',
    display: 'Tours'
  },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/30 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* Logo */}
            <div className="logo">
              <img src={logo} alt=""/>
            </div>

            {/* Navigation Menu */}
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-8">
                {nav_links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink 
                      to={item.path}
                      className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Auth Buttons */}
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                <Button className="custom-gradient-login-btn">
                  <Link to='/login' className="no-underline">Login</Link>
                </Button>
                <Button className="custom-gradient-btn">
                  <Link to='/register' className="text-white no-underline">Register</Link>
                </Button>
              </div>
              
              {/* Mobile Menu Button */}
              <button className="mobile_menu block lg:hidden">
                <Menu className={`w-6 h-6 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`} />
              </button>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;