import React from "react";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box, 
  CardActionArea 
} from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Ensure price is a number for the toFixed function
  const displayPrice = typeof product.price === 'number' ? product.price.toFixed(2) : "0.00";

  return (
    <Card 
      elevation={0} 
      sx={{ 
        maxWidth: 345, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 0, // Sharp edges 
        bgcolor: "transparent",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)"
        }
      }}
    >
      {/* Clickable Area for Product Details */}
      <CardActionArea component={Link} to={`/product/${product.id}`}>
        <Box sx={{ position: 'relative', overflow: 'hidden', pt: '140%' /* Book aspect ratio */ }}>
          <CardMedia
            component="img"
            image={product.coverUrl.startsWith('http') ? product.coverUrl : `http://localhost:8080${product.coverUrl}`}
            alt={product.title}
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
            }}
          />
        </Box>
        
        <CardContent sx={{ px: 1, pt: 2, pb: 1 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div" 
            sx={{ 
              fontFamily: "'Playfair Display', serif", 
              fontWeight: 700,
              fontSize: '1.1rem',
              lineHeight: 1.2,
              mb: 0.5,
              color: "#1a237e"
            }}
          >
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontStyle: 'italic' }}>
            {product.author}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
            ${displayPrice}
          </Typography>
        </CardContent>
      </CardActionArea>

      {/* Add to Cart Button */}
      <Box sx={{ px: 1, pb: 2, mt: 'auto' }}>
        <Button 
          fullWidth 
          variant="outlined" 
          startIcon={<ShoppingBagOutlinedIcon />}
          onClick={() => addToCart(product)}
          sx={{ 
            textTransform: 'none', 
            borderRadius: 0,
            borderColor: "#1a237e",
            color: "#1a237e",
            "&:hover": {
              borderColor: "#0d1440",
              bgcolor: "rgba(26, 35, 126, 0.04)"
            }
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
}