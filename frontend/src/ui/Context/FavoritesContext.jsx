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

  const addToFavorites = (item) => {
    setFavorites(prev => {
      // Determine the type of item (tour or accommodation)
      const itemType = item.maxGroupSize ? 'tour' : 'accommodation';
      
      // Add a type property to the item
      const favoriteItem = {
        ...item,
        type: itemType
      };

      // Check if the item already exists
      if(prev.some((t) => t._id === item._id && t.type === itemType)){
        return prev;
      }
      
      return [...prev, favoriteItem];
    })
  };

  const removeFromFavorites = (itemId, type) => {
    setFavorites(prev => prev.filter(item => 
      !(item._id === itemId && item.type === type)
    ));
  };

  const isFavorite = (itemId, type) => {
    return favorites.some(item => 
      item._id === itemId && item.type === type
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);