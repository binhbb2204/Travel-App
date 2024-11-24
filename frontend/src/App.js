// src/App.js
import React from 'react';
import Home from './page/Home';
import Layout from './Layout/Layout';
import { FavoritesProvider } from './ui/Context/FavoritesContext';
import { CartProvider } from './ui/Context/CartContext';
function App() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <Layout />
      </CartProvider>
    </FavoritesProvider>
  );
}

export default App;
