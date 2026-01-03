import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

// Components & Pages
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import ScrollToTop from "./components/ScrollToTop"; // ✅ Import the scroll reset

// Context
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import "./App.css";

// Professional "Modern Library" Theme Configuration
const theme = createTheme({
  palette: {
    primary: {
      main: "#1a237e", // Deep Navy
    },
    background: {
      default: "#f4f1ea", // Cream "Paper" background
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'Playfair Display', serif", fontWeight: 700 },
    h2: { fontFamily: "'Playfair Display', serif", fontWeight: 700 },
    h3: { fontFamily: "'Playfair Display', serif", fontWeight: 700 },
    h4: { fontFamily: "'Playfair Display', serif", fontWeight: 700 },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <WishlistProvider>
          <Router>
            {/* ✅ This component ensures every navigation starts at the top */}
            <ScrollToTop /> 
            
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              
              <Navbar />

              {/* Main content wrapper */}
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                </Routes>
              </Box>

              <Footer />

            </Box>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;