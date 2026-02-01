import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = Cookies.get('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    Cookies.set('favorites', JSON.stringify(favorites), { expires: 365 });
  }, [favorites]);

  const addFavorite = (atomicNumber) => {
    if (!favorites.includes(atomicNumber)) {
      setFavorites(prev => [...prev, atomicNumber]);
    }
  };

  const removeFavorite = (atomicNumber) => {
    setFavorites(prev => prev.filter(num => num !== atomicNumber));
  };

  const toggleFavorite = (atomicNumber) => {
    if (favorites.includes(atomicNumber)) {
      removeFavorite(atomicNumber);
    } else {
      addFavorite(atomicNumber);
    }
  };

  const isFavorite = (atomicNumber) => {
    return favorites.includes(atomicNumber);
  };

  return { favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite };
};

