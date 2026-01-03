import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { 
  Container, Grid, Typography, Button, Box, 
  Chip, Divider, CircularProgress, Breadcrumbs, Stack 
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for the "Go Back" logic
  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchNovel = async () => {
      try {
        const data = await getProductById(id);
        if (data) {
          setNovel(data);
        } else {
          setError("Novel not found.");
        }
      } catch (err) {
        setError("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };
    fetchNovel();
  }, [id]);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <CircularProgress sx={{ color: "#1a237e" }} />
    </Box>
  );

  if (error) return (
    <Container sx={{ py: 5, textAlign: "center" }}>
      <Typography variant="h5" color="error" gutterBottom>{error}</Typography>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} variant="outlined">
        Return to Catalog
      </Button>
    </Container>
  );

  const isLiked = isInWishlist(novel.id);

  return (
    <Container sx={{ py: 5 }}>
      {/* Navigation Row */}
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ mb: 4 }}
      >
        <Breadcrumbs>
          <Link to="/" style={{ textDecoration: 'none', color: '#1a237e', fontWeight: 500 }}>
            Library
          </Link>
          <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
            {novel.title}
          </Typography>
        </Breadcrumbs>

        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)} // Takes user back to exactly where they were
          sx={{ 
            color: '#1a237e', 
            textTransform: 'none', 
            fontWeight: 600,
            '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } 
          }}
        >
          Back to Results
        </Button>
      </Stack>

      <Grid container spacing={6}>
        {/* 📘 Left: Book Cover */}
        <Grid item xs={12} md={5}>
          <Box 
            component="img"
            src={novel.coverUrl.startsWith('http') ? novel.coverUrl : `http://localhost:8080${novel.coverUrl}`}
            alt={novel.title}
            sx={{ 
              width: "100%", 
              borderRadius: 0,
              boxShadow: "20px 20px 60px rgba(0,0,0,0.1)",
              maxHeight: "650px",
              objectFit: "cover",
              border: "1px solid #e0e0e0"
            }}
          />
        </Grid>

        {/*Right: Book Details */}
        <Grid item xs={12} md={7}>
          <Typography variant="h2" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, mb: 1, color: "#1a237e" }}>
            {novel.title}
          </Typography>
          
          <Typography variant="h5" color="text.secondary" gutterBottom sx={{ fontStyle: "italic", mb: 3 }}>
            By {novel.author} {novel.publishedYear && <Chip label={novel.publishedYear} size="small" sx={{ ml: 1, borderRadius: 0 }} />}
          </Typography>

          <Typography variant="h4" sx={{ color: "#1a237e", my: 3, fontWeight: 700 }}>
            ${novel.price?.toFixed(2)}
          </Typography>

          <Divider sx={{ mb: 4 }} />

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>
            Synopsis
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#444", fontSize: '1.1rem' }}>
            {novel.description}
          </Typography>

          <Box sx={{ bgcolor: "#f4f1ea", p: 3, borderLeft: "4px solid #1a237e", my: 4 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Edition Details</Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              {novel.details || "A meticulously curated edition for the discerning reader."}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button 
              variant="contained" 
              size="large" 
              startIcon={<ShoppingCartIcon />}
              onClick={() => addToCart(novel)}
              sx={{ 
                bgcolor: "#1a237e", 
                borderRadius: 0,
                "&:hover": { bgcolor: "#0d1440" },
                px: 6,
                py: 2,
                textTransform: "none",
                fontSize: "1.1rem",
                flexGrow: 2
              }}
            >
              Add to Collection
            </Button>

            <Button 
              variant="outlined" 
              size="large"
              startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={() => toggleWishlist(novel)}
              sx={{ 
                borderRadius: 0, 
                textTransform: "none", 
                borderColor: "#1a237e", 
                color: "#1a237e",
                px: 4,
                flexGrow: 1,
                "&:hover": { borderColor: "#0d1440", bgcolor: "rgba(26, 35, 126, 0.04)" }
              }}
            >
              {isLiked ? "Saved" : "Reading List"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}