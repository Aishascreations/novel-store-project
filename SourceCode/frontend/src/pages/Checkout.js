import React, { useState } from "react";
import { 
  Container, Typography, Grid, TextField, Button, 
  Paper, Box, Divider, Stack, Stepper, Step, StepLabel 
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderComplete, setOrderComplete] = useState(false);

  // Total calculation (Subtotal + Mock Shipping)
  const shipping = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the order to your Spring Boot backend
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontFamily: "'Playfair Display', serif", mb: 2 }}>
          Thank you for your order.
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
          Your story is on its way. We've sent a confirmation email to your inbox.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")} sx={{ bgcolor: "#1a237e" }}>
          Continue Browsing
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontFamily: "'Playfair Display', serif", mb: 4, fontWeight: 700 }}>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* Shipping Form */}
        <Grid item xs={12} md={7}>
          <Paper variant="outlined" sx={{ p: 4, borderRadius: 0, border: "1px solid #e0e0e0" }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Shipping Information</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="First Name" required variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Last Name" required variant="standard" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Address" required variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="City" required variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Postal Code" required variant="standard" />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>Payment</Typography>
                  <TextField fullWidth label="Card Number" placeholder="0000 0000 0000 0000" required variant="standard" />
                </Grid>
              </Grid>
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                size="large"
                startIcon={<LockIcon />}
                sx={{ mt: 6, bgcolor: "#1a237e", py: 1.5, borderRadius: 0 }}
              >
                Complete Purchase — ${total.toFixed(2)}
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Order Review Summary */}
        <Grid item xs={12} md={5}>
          <Box sx={{ bgcolor: "#f9f9f9", p: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Your Selection</Typography>
            <Stack spacing={2}>
              {cart.map((item) => (
                <Box key={item.id} display="flex" justifyContent="space-between">
                  <Typography variant="body2">{item.title} (x{item.quantity})</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Shipping</Typography>
                <Typography variant="body2">${shipping.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">${total.toFixed(2)}</Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}