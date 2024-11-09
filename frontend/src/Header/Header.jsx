import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import logo from '../img/TAB.gif';
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
        ? 'bg-blue-900/90 backdrop-blur-md shadow-lg' 
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
                      className="text-blue-100 hover:text-white transition-colors duration-200 font-medium"
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
                <Button className="px-6 py-2 rounded-full bg-transparent border-2 border-blue-400 text-blue-100 hover:bg-blue-400 hover:text-white transition-all duration-200">
                  <Link to='/login'>Login</Link>
                </Button>
                <Button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:from-blue-500 hover:to-purple-500 transition-all duration-200">
                  <Link to='/register'>Register</Link>
                </Button>
              </div>
              
              {/* Mobile Menu Button */}
              <button className="mobile_menu block lg:hidden">
                <Menu className="w-6 h-6 text-blue-100" />
              </button>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;