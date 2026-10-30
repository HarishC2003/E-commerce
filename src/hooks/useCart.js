import { useState, useEffect } from 'react';

const STORAGE_KEY = 'grove_cart';

export function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [lastAddedItem, setLastAddedItem] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const qtyToAdd = Math.max(1, parseInt(quantity, 10) || 1);
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qtyToAdd } : item
        );
      }
      return [...prev, { ...product, quantity: qtyToAdd }];
    });
    setLastAddedItem(product);
    setTimeout(() => {
      setLastAddedItem(null);
    }, 3000);
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return { cart, addToCart, totalCartCount, lastAddedItem };
}

