import React from "react"; // Removed useContext
import { 
  Container, Typography, Grid, Button, 
  Box, Divider, Stack, Paper 
} from "@mui/material";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext"; // ✅ Fixed Hook Import
import { useCart } from "../context/CartContext"; // ✅ Already using hook
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist(); // ✅ Using the hook
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <Container sx={{ py: 12, textAlign: "center" }}>
        <AutoStoriesIcon sx={{ fontSize: 60, color: "#d1d1d1", mb: 2 }} />
        <Typography variant="h4" sx={{ fontFamily: "'Playfair Display', serif", mb: 2, color: "#1a237e" }}>
          Your Reading List is Empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Discover stories that resonate with you and save them for later.
        </Typography>
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          sx={{ bgcolor: "#1a237e", borderRadius: 0, px: 4, textTransform: "none" }}
        >
          Explore Collection
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" sx={{ fontFamily: "'Playfair Display', serif", mb: 1, fontWeight: 900, color: "#1a237e" }}>
        Saved Stories
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 5, fontStyle: "italic" }}>
        A personal curated collection for your future library.
      </Typography>

      <Grid container spacing={4}>
        {wishlist.map((novel) => (
          <Grid item key={novel.id} xs={12} sm={6} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 0, 
                bgcolor: "#ffffff", 
                border: "1px solid #e0e0e0",
                borderRadius: 0,
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": { 
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.1)" 
                }
              }}
            >
              {/* Image Container */}
              <Box sx={{ position: "relative", pt: "140%", overflow: "hidden", bgcolor: "#f5f5f5" }}>
                <img 
                  src={novel.coverUrl.startsWith('http') ? novel.coverUrl : `http://localhost:8080${novel.coverUrl}`} 
                  alt={novel.title}
                  style={{ 
                    position: "absolute", 
                    top: 0, 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover" 
                  }}
                />
              </Box>

              {/* Content */}
              <Box sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
                  {novel.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {novel.author}
                </Typography>
                
                <Divider sx={{ mb: 2 }} />
                
                <Stack direction="row" spacing={1}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    size="medium"
                    startIcon={<ShoppingBagOutlinedIcon />}
                    onClick={() => addToCart(novel)}
                    sx={{ 
                      bgcolor: "#1a237e", 
                      borderRadius: 0, 
                      textTransform: "none",
                      "&:hover": { bgcolor: "#0d1440" }
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error"
                    onClick={() => removeFromWishlist(novel.id)}
                    sx={{ borderRadius: 0, minWidth: "45px", borderColor: "#e0e0e0", color: "#999" }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}