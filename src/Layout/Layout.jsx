import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../router/Router';
import './layout.css';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Check if the current path is part of the admin section 
  const isAdminPanel = location.pathname.startsWith('/admin');

  return (
    <div className="relative">
      {/* Turn off the global header on all admin-related pages */}
      {!isAdminPanel && <Header />}
      <main className='main-content'>
        <Routers />
      </main>
      {/* Turn off the global footer on all admin-related pages */}
      {!isAdminPanel && <Footer />}
    </div>
  );
};

export default Layout;