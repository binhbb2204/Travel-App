import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (tour) => {
    setFavorites(prev => [...prev, tour]);
  };

  const removeFromFavorites = (tourId) => {
    setFavorites(prev => prev.filter(tour => tour.id !== tourId));
  };

  const isFavorite = (tourId) => {
    return favorites.some(tour => tour.id === tourId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);