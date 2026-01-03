import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  // Persistence: Load wishlist from localStorage on startup
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("novel_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("novel_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Logic to add a book
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (!prev.some((item) => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  // Logic to remove a book (Matches what Wishlist.js expects)
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // Toggle Logic (Useful for Heart Icons)
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Helper to check if a book is liked
  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist,
      removeFromWishlist, 
      toggleWishlist, 
      isInWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook for components to use
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};