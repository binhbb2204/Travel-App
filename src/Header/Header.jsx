import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Settings, TicketsPlane } from 'lucide-react';
import { useFavorites } from '../ui/Context/FavoritesContext';
import { useCart } from '../ui/Context/CartContext';
import logo from '../images/TAB.gif';
import { motion } from 'framer-motion';
import { authService } from '../data/Service/authService';
import './header.css';
// import SwitchMode from '../ui/SwitchMode/SwitchMode'
// import UserProfile from '../page/user/tabs/UserProfile'
// import UsernameManager from "../page/user/UsernameManager";

const nav_links = [
  { path: '/home', display: 'Home' },
  { path: '/about', display: 'About' },
  { path: '/tours', display: 'Tours' },
  { path: '/accommodations', display: 'Accommodations' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites } = useFavorites();
  const favoritesRef = useRef();
  const settingsRef = useRef();
  const [showSettings, setShowSettings] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // For testing
  // if (location.pathname === '/otp-verify') return <></>;

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
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    authService.logout();
    navigate("/login");
  };

  const username = localStorage.getItem('username');
  const userRole = localStorage.getItem('userRole');

  // For debugging
  // console.log("Username:", username);
  // console.log("User Role:", userRole);
  // console.log("Show Settings:", showSettings);
  const groupedFavorites = favorites.reduce((acc, favorite) => {
    const type = favorite.type === 'accommodation' ? 'accommodations' : 'tours';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(favorite);
    return acc;
  }, {})

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/30 backdrop-blur-sm shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="" />
            </div>

            <div className={`navigation ${isMobileMenuOpen ? 'show__menu' : ''}`}>
              <ul className="menu d-flex align-items-center gap-8">
                {nav_links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink to={item.path} className={({ isActive }) => `${isScrolled ? 'text-gray-700' : 'text-gray-700'} hover:text-blue-600 transition-colors duration-200 font-medium ${isActive ? 'active-nav-link' : ''}`}>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`logreg ${username ? 'logged' : ''} ${isMobileMenuOpen ? 'opened' : ''}`}>
              <Button className="custom-gradient-login-btn md:bg-white">
                <Link to="/login" className="no-underline">Login</Link>
              </Button>
              <Button className="custom-gradient-btn md:bg-white">
                <Link to="/register" className="no-underline">Register</Link>
              </Button>
            </div>

            <div className="nav__right d-flex align-items-center gap-4">
              {username ? (
                <div className="welcome-box flex items-center">
                  <span className="mr-2">Welcome back, {username}</span>
                  <Button className="welcome-box button" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="nav__btns d-flex align-items-center gap-4">
                  <Button className="custom-gradient-login-btn md:bg-white">
                    <Link to="/login" className="no-underline">Login</Link>
                  </Button>
                  <Button className="custom-gradient-btn md:bg-white">
                    <Link to="/register" className="no-underline">Register</Link>
                  </Button>
                </div>
              )}
            </div>

            <div className="nav__actions d-flex align-items-center gap-4">
              {/* For testing the dark/light mode toggle button */}
              {/* <SwitchMode /> */}

              {/* Favorites Button */}
              <div className="relative">
                <button
                  className="p-2 rounded-full relative"
                  onClick={() => setShowFavorites(!showFavorites)}
                >
                  <Heart
                    className="w-6 h-6 text-gray-900 hover:text-blue-500"
                    stroke="currentColor"
                    strokeWidth={2}
                    fill="none"
                  />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </button>
                {/* Favorites Dropdown */}
                {showFavorites && (
                  <div
                    ref={favoritesRef}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 opacity-100 translate-y-0"
                    style={{ zIndex: 1000 }}
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">Your Favorites</h3>
                      {favorites.length === 0 ? (
                        <p className="text-gray-500 text-sm">No favorites yet</p>
                      ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {Object.entries(groupedFavorites).map(([type, items]) => (
                            <div key={type}>
                              <h4 className="text-md font-medium text-gray-700 capitalize mb-2">
                                {type}
                              </h4>
                              {items.map((item) => (
                                <Link
                                  key={item._id}
                                  to={`/${type}/${item._id}`}
                                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                  onClick={() => setShowFavorites(false)}
                                >
                                  <img
                                    src={item.photos[0]}
                                    alt={item.title}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
                                    <p className="text-xs text-gray-500">{item.city}, {item.country}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Settings Button */}
              <button
                className="p-2 rounded-full relative"
                onClick={() => setShowSettings(prev => !prev)}
              >
                <Settings
                  className="w-6 h-6 text-gray-900 hover:text-blue-500"
                  stroke="currentColor"
                  strokeWidth={2}
                  fill="none"
                />
                {showSettings && username && (
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
                      {userRole === 'admin' && (
                        <li className="p-2 hover:bg-gray-100 cursor-pointer text-blue-500 font-bold">
                          <Link to="/admin-panel">Admin Panel</Link>
                        </li>
                      )}
                      {(userRole === 'user' || userRole === 'admin') && (
                        <li className="p-2 hover:bg-gray-100 cursor-pointer text-blue-500 font-bold">
                          <Link to="/user-settings">User Settings</Link>
                        </li>
                      )}
                      {!username && !(userRole === 'admin' && userRole === 'user')(
                        <li className="p-2 hover:bg-gray-100 cursor-pointer text-red-500 font-bold" onClick={handleLogout}>
                          Logout
                        </li>
                      )}
                    </ul>
                  </motion.div>
                )}
              </button>

              {/* Cart Button */}
              <Link to="/checkout">
                <button
                  className="p-2 rounded-full relative"
                >
                  <TicketsPlane
                    className="w-6 h-6 text-gray-900 hover:text-blue-500"
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
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile_menu block lg:hidden"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              style={{ color: '#000' }}
            >
              {isMobileMenuOpen ? <X className={'w-6 h-6 text-gray-700'} /> : <Menu className={'w-6 h-6 text-gray-700'} />}
            </button>

          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
