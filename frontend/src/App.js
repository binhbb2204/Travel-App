// src/App.js
import React from 'react';
import Home from './page/Home';
import Layout from './Layout/Layout';
import { FavoritesProvider } from './ui/Context/FavoritesContext';
function App() {
  return (
    <FavoritesProvider>
      <Layout />
    </FavoritesProvider>
  );
}

export default App;
