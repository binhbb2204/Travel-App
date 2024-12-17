import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../router/Router';
import './layout.css';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Determine if the header and footer should be displayed
  const hideHeaderRoutes = ['/otp-verify'];
  const isAdminPanel = location.pathname.startsWith('/admin');
  
  // Combine conditions for rendering header and footer
  const showHeader = !hideHeaderRoutes.includes(location.pathname) && !isAdminPanel;
  const showFooter = !isAdminPanel;

  return (
    <div className="relative">
      {showHeader && <Header />}
      <main className='main-content'>
        <Routers />
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;