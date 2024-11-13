import React, { useEffect }  from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../router/Router';
import './layout.css'
const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the page whenever the route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="layout__container">
    {/* <> */}
      <Header />
      <main className='main__content'>
        <Routers />
      </main>
      <Footer/>
    {/* </> */}
    </div>
    
  )
};

export default Layout;