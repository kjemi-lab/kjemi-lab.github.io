import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = Cookies.get('recentlyViewed');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    Cookies.set('recentlyViewed', JSON.stringify(recentlyViewed), { expires: 365 });
  }, [recentlyViewed]);

  const addToRecentlyViewed = (atomicNumber) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(num => num !== atomicNumber);
      return [atomicNumber, ...filtered].slice(0, 10); // Keep only last 10
    });
  };

  return { recentlyViewed, addToRecentlyViewed };
};

