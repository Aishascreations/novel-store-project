import React from "react";
import { Container, Typography, Grid, Box, IconButton, Button, Divider, Paper, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCart } from "../context/CartContext"; // ✅ Using the custom hook

export default function Cart() {
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontFamily: "'Playfair Display', serif", mb: 2 }}>Your Library is Empty</Typography>
        <Button component={Link} to="/" variant="contained" startIcon={<ArrowBackIcon />} sx={{ bgcolor: "#1a237e" }}>
          Return to Shop
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" sx={{ fontFamily: "'Playfair Display', serif", mb: 4, fontWeight: 700 }}>
        Shopping Cart
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cart.map((item) => (
            <Paper key={item.id} variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 0, border: "none", borderBottom: "1px solid #e0e0e0" }}>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <img src={item.coverUrl.startsWith('http') ? item.coverUrl : `http://localhost:8080${item.coverUrl}`} alt={item.title} style={{ width: "100%" }} />
                </Grid>
                <Grid item xs={5} sx={{ px: 2 }}>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.author}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Stack direction="row" alignItems="center">
                    <IconButton onClick={() => updateQuantity(item.id, -1)}><RemoveIcon /></IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton onClick={() => updateQuantity(item.id, 1)}><AddIcon /></IconButton>
                  </Stack>
                </Grid>
                <Grid item xs={2} sx={{ textAlign: "right" }}>
                  <Typography variant="h6">${(item.price * item.quantity).toFixed(2)}</Typography>
                  <Button size="small" color="error" onClick={() => removeFromCart(item.id)}>Remove</Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 3, bgcolor: "#fafafa" }}>
            <Typography variant="h6" gutterBottom>Summary</Typography>
            <Box display="flex" justifyContent="space-between" sx={{ my: 2 }}>
              <Typography>Subtotal</Typography>
              <Typography variant="h6">${subtotal.toFixed(2)}</Typography>
            </Box>
            <Button component={Link} to="/checkout" variant="contained" fullWidth sx={{ bgcolor: "#1a237e" }}>
              Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}