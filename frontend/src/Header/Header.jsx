import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, Settings, ShoppingCart, TicketsPlane } from 'lucide-react';
import { useFavorites } from '../ui/Context/FavoritesContext';
import logo from '../images/TAB.gif';
import { motion } from 'framer-motion';
import './header.css'

const nav_links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/tours',
    display: 'Tours'
  },
  {
    path: 'accommodations',
    display: 'Accommodations'
  },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites } = useFavorites();
  const favoritesRef = useRef();
  const [showSettings, setShowSettings] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const settingsRef = useRef(null);
  const cartRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (favoritesRef.current && !favoritesRef.current.contains(event.target)) {
        setShowFavorites(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, []);

  const FavoritesDropdown = () => (
    <div
      ref={favoritesRef}
      className={`absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${showFavorites ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      style={{ zIndex: 1000 }}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Your Favorites</h3>
        {favorites.length === 0 ? (
          <p className="text-gray-500 text-sm">No favorites yet</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {favorites.map((tour) => (
              <Link
                key={tour.id}
                to={`/tours/${tour.id}`}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={() => setShowFavorites(false)}
              >
                <img
                  src={tour.photo}
                  alt={tour.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{tour.title}</h4>
                  <p className="text-xs text-gray-500">{tour.city}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const SettingsDropdown = () => (
    <motion.div
      ref={settingsRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: showSettings ? 1 : 0, y: showSettings ? 0 : -10 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden"
      style={{ zIndex: 1000 }}
    >
      <ul className="p-2">
        <li className="p-2 hover:bg-gray-100 cursor-pointer">Profile</li>
        <li className="p-2 hover:bg-gray-100 cursor-pointer">Account Settings</li>
        <li className="p-2 hover:bg-gray-100 cursor-pointer text-blue-500 font-bold">
          <Link to="/admin-panel">Admin Panel</Link>
        </li>
        <li
          className="p-2 hover:bg-gray-100 cursor-pointer text-red-500 font-bold mt-3"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </motion.div>
  );

  const toggleSettingsDropdown = () => {
    setShowSettings(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate("/login");
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
      ? 'bg-white/30 backdrop-blur-sm shadow-lg'
      : 'bg-transparent'
      }`}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* Logo */}
            <div className="logo">
              <img src={logo} alt="" />
            </div>

            {/* Navigation Menu - for Desktop */}
            <div className={`navigation ${isMobileMenuOpen ? 'show__menu' : ''}`}>
              <ul className="menu d-flex align-items-center gap-8">
                {nav_links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        ${isScrolled ? 'text-gray-700' : 'text-gray-700'}
                        hover:text-blue-600
                        transition-colors
                        duration-200
                        font-medium
                        ${isActive ? 'active-nav-link' : ''}
                      `}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>


            {/* Add Favorites Icon before Auth Buttons */}
            <div className="relative">
              <button
                className="p-2 rounded-full relative"
                onClick={(e) => setShowFavorites(!showFavorites)}
              >
                <Heart
                  className="w-6 h-6 text-gray-700 hover:text-blue-500"
                  stroke="currentColor" // Use the current color for stroke
                  strokeWidth={2}
                  fill="none"
                />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
              <FavoritesDropdown />
            </div>

            {/* Auth Buttons */}
            {/* <div className={`nav__right d-flex align-items-center gap-4 ${isMobileMenuOpen ? 'logreg__menu' : ''}`}>
              <div className="nav__btns d-flex align-items-center gap-4">
                <Button className="custom-gradient-login-btn md:bg-white">
                  <Link to='/login' className="no-underline">Login</Link>
                </Button>
                <Button className="custom-gradient-btn">
                  <Link to='/register' className="text-white no-underline">Register</Link>
                </Button>
              </div>
            </div> */}

            <div className={`nav__right d-flex align-items-center gap-4`}>
              {/* Conditionally display the buttons or menu based on isMobileMenuOpen */}
              {isMobileMenuOpen ? (
                <motion.div
                  className="logreg__menu"
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <Button className="custom-gradient-login-btn md:bg-white">
                    <Link to='/login' className="no-underline">Login</Link>
                  </Button>
                  <Button className="custom-gradient-btn">
                    <Link to='/register' className="text-white no-underline">Register</Link>
                  </Button>
                </motion.div>
              ) : (
                <div className="nav__btns d-flex align-items-center gap-4">
                  <Button className="custom-gradient-login-btn md:bg-white">
                    <Link to='/login' className="no-underline">Login</Link>
                  </Button>
                  <Button className="custom-gradient-btn">
                    <Link to='/register' className="text-white no-underline">Register</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Setting and Cart button */}
            <div className="nav__right d-flex align-items-center gap-2">
              {/* Settings Button */}
              <button
                className="p-2 rounded-full relative"
                onClick={toggleSettingsDropdown}
              >
                <Settings
                  className="w-6 h-6 text-gray-700 hover:text-blue-500"
                  stroke="currentColor"
                  strokeWidth={2}
                  fill="none"
                />
                {showSettings && <SettingsDropdown />}
              </button>

              {/* Cart Button */}
              <button
                className="p-2 rounded-full relative"
                onClick={() => setShowCart(!showCart)}
              >
                <TicketsPlane
                  className="w-6 h-6 text-gray-700 hover:text-blue-500"
                  stroke="currentColor"
                  strokeWidth={2}
                  fill="none"
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile_menu block lg:hidden"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              style={{ color: '#000' }}
            >
              {isMobileMenuOpen ?
                <X className={'w-6 h-6 text-gray-700'} />
                : <Menu className={'w-6 h-6 text-gray-700'} />
              }
            </button>
          </div>
        </Row>
      </Container >
    </header >
  );
};

export default Header;