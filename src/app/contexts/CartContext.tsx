"use client"

import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  color: string;
  price: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  getCart: () => CartItem[];
  clearCart: () => void;
  toggleCart: () => void;
  isCartOpen: boolean;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  getCart: () => [],
  clearCart: () => {},
  toggleCart: () => {},
  isCartOpen: false,
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
  };

  const getCart = () => {
    return cart;
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, getCart, clearCart, toggleCart, isCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};
