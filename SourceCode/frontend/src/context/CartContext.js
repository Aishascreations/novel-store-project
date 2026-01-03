import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Persistence: Initialize state from LocalStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("novel_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  //Auto-Save: Sync to LocalStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("novel_cart", JSON.stringify(cart));
  }, [cart]);

  //Add or Increment
  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove specific item entirely
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Decrement or Update (Prevents quantity going below 1)
  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + amount) } 
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // Derived State: Totals calculated automatically
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      subtotal, 
      totalItems 
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook: Makes using the cart in components super simple
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};