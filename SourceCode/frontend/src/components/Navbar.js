import React from "react"; 
import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Container, Box } from "@mui/material"; 
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookIcon from "@mui/icons-material/Book";
import { useCart } from "../context/CartContext"; 
import { useWishlist } from "../context/WishlistContext"; // Adding wishlist badge!

export default function Navbar() {
  const { totalItems } = useCart(); // Use totalItems directly from context
  const { wishlist } = useWishlist();

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: "#ffffff", 
        color: "#1a237e", 
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        borderBottom: "1px solid #e0e0e0"
      }}
    >
      <Container>
        <Toolbar disableGutters>
          {/* Professional Logo */}
          <BookIcon sx={{ mr: 1, color: "#1a237e" }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              letterSpacing: ".05rem",
              color: "#1a237e",
              textDecoration: "none",
              flexGrow: 1
            }}
          >
            NOVELSTORE
          </Typography>

          {/*Navigation & Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button 
              component={Link} 
              to="/" 
              sx={{ color: "#333", fontWeight: 500, textTransform: "none" }}
            >
              Collection
            </Button>

            {/* Wishlist Icon */}
            <IconButton component={Link} to="/wishlist" sx={{ color: "#333" }}>
              <Badge badgeContent={wishlist.length} color="primary">
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
            
            {/* Cart Icon */}
            <IconButton component={Link} to="/cart" sx={{ color: "#333" }}>
              <Badge 
                badgeContent={totalItems} 
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#1a237e",
                    color: "white"
                  }
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}