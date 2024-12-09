import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const loadFavorites = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : []
  }
  const [favorites, setFavorites] = useState(loadFavorites());

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (tour) => {
    setFavorites(prev => {
      if(prev.some((t) => t._id === tour._id)){
        return prev;
      }
      return [...prev, tour];
    })
  };

  const removeFromFavorites = (tourId) => {
    setFavorites(prev => prev.filter(tour => tour._id !== tourId));
  };

  const isFavorite = (tourId) => {
    return favorites.some(tour => tour._id === tourId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);