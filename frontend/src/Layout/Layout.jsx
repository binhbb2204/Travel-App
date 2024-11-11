import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../router/Router';
import './layout.css'
const Layout = () => {
  return (
    <>
      <Header />
      <div className="main__content">
        <Routers />
      </div>
      
      <Footer/>
    </>
  )
};

export default Layout;