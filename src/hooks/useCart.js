import { useEffect, useState } from 'react';
import { db } from '../db/db'

const useCart = () => {

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('guitarLA')) || []);
  const MIN_QUANTITY = 1;
  const MAX_QUANTITY = 5;

  // Save cart in local storage
  useEffect(() => {
    localStorage.setItem('guitarLA', JSON.stringify(cart));
  }, [cart]);

  // Increase the number of items in the cart, the maximum quantity is 5
  const increaseQuantity = (id) => {
    const item = cart.find(item => item.id === id);
    if (item.quantity === MAX_QUANTITY) return;

    const newCart = cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
    setCart(newCart);
  }

  // Decrease the number of items in the cart, if the quantity is 1, the item is removed
  const decreaseQuantity = (id) => {
    const item = cart.find(item => item.id === id);
    if (item.quantity === MIN_QUANTITY) {
      deleteItem(id);
      return;
    }

    const newCart = cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
    setCart(newCart);
  }

  // Delete item from cart
  const deleteItem = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
  }

  // Clear cart
  const clearCart = () => {
    setCart([]);
  }

  // Add to cart or increase quantity
  const addToCart = (guitar) => {
    const item = cart.find(item => item.id === guitar.id);
    if (item) {
      increaseQuantity(guitar.id);
      return;
    }

    setCart([...cart, { ...guitar, quantity: 1 }]);
  }

  return {
    db,
    cart,
    addToCart,
    deleteItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  };
}

export default useCart