import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = localStorage.getItem('cartData');

    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  const updateCart = (updatedCart) => {
    localStorage.setItem('cartData', JSON.stringify(updatedCart));

    setCart(updatedCart);
  };

  return { cart, updateCart };
};
