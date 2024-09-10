"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  color: string;
  price: number;
  size: string;
  quantity: number;
  productId: string;
  imageUrl: string;
  shirtImage: string;
  shirtWithImageUrl: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  getCart: () => CartItem[];
  clearCart: () => void;
  toggleCart: () => void;
  isCartOpen: boolean;
  getTotalPrice: () => number;
  updateCartItemQuantity: (id: string, quantity: number) => void; // New function to update quantity
  removeFromCart: (id: string) => void; // New function to remove item from cart
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  getCart: () => [],
  clearCart: () => {},
  toggleCart: () => {},
  isCartOpen: false,
  getTotalPrice: () => 0,
  updateCartItemQuantity: () => {}, // Placeholder for the update function
  removeFromCart: () => {}, // Placeholder for the remove function
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isCartInitialized, setIsCartInitialized] = useState(false);

  // Load cart from local storage when component mounts
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
        console.log("Cart loaded from localStorage:", JSON.parse(savedCart));
      } else {
        console.log("No cart found in localStorage, initializing with empty cart.");
      }
      setIsCartInitialized(true);
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }, []);

  // Update local storage whenever the cart changes, but skip on initial load
  useEffect(() => {
    if (isCartInitialized) {
      try {
        console.log("Saving cart?", cart);
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("Cart saved to localStorage:", cart);
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [cart, isCartInitialized]);

  const addToCart = (item: CartItem) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    console.log("Item added to cart:", item);
  };

  const getCart = () => {
    return cart;
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    console.log("Cart cleared.");
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to update the quantity of a cart item
  const updateCartItemQuantity = (id: string, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
  };

  // Function to remove an item from the cart
  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    console.log("Item removed from cart:", id);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        getCart,
        clearCart,
        toggleCart,
        isCartOpen,
        getTotalPrice,
        updateCartItemQuantity, // Include the function in context value
        removeFromCart, // Include the new function in context value
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
