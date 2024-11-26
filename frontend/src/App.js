// src/App.js
import React from 'react';
import Home from './page/Home';
import Layout from './Layout/Layout';
import { FavoritesProvider } from './ui/Context/FavoritesContext';
import { CartProvider } from './ui/Context/CartContext';
import AdminPanel from './page/admin/AdminPanel';
import { UserProvider } from "./page/admin/UsersContext";

function App() {

  const App = () => (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );

  return (
    <FavoritesProvider>
      <CartProvider>
        <UserProvider>
          <Layout />
        </UserProvider>
      </CartProvider>
    </FavoritesProvider>
  );
}

export default App;