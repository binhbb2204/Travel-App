// src/App.js
import React from 'react';
import Home from './page/Home';
import Layout from './Layout/Layout';
import { FavoritesProvider } from './ui/Context/FavoritesContext';
import { ThemeProvider } from "./ui/SwitchMode/ThemeContext";
import Header from "./Header/Header";
import { CartProvider } from './ui/Context/CartContext';
import AdminPanel from './page/admin/AdminPanel';
import { UserProvider } from "./page/admin/UsersContext";
import UserSettingsPanel from "./page/user/UserSettingsPanel";
import OTPVerify from "./page/OTPVerify";

function App() {

  const App = () => (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-settings" element={<UserSettingsPanel />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/otp-verify" element={<OTPVerify />} />
      </Routes>
    </Router>
  );

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <CartProvider>
          <UserProvider>
            <Layout />
          </UserProvider>
        </CartProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;