import React from "react";
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton, 
  Stack, 
  TextField, 
  Button, 
  Divider 
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import BookIcon from "@mui/icons-material/Book";

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: "#0d1440", // Deepest navy
        color: "#f4f1ea", // Cream text
        pt: 8, 
        pb: 4,
        mt: 8,
        borderTop: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          {/*Column 1: Brand & Philosophy */}
          <Grid item xs={12} md={4}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <BookIcon sx={{ color: "#ffffff" }} />
              <Typography variant="h6" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                NOVELSTORE
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ opacity: 0.7, lineHeight: 1.8, mb: 2 }}>
              Dedicated to the preservation of great stories. We curate only the finest 
              editions for readers who appreciate the art of the written word.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ color: "#f4f1ea" }}><FacebookIcon fontSize="small" /></IconButton>
              <IconButton size="small" sx={{ color: "#f4f1ea" }}><InstagramIcon fontSize="small" /></IconButton>
              <IconButton size="small" sx={{ color: "#f4f1ea" }}><TwitterIcon fontSize="small" /></IconButton>
            </Stack>
          </Grid>

          {/*  Column 2: Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Shop</Typography>
            <Stack spacing={1}>
              <Link href="/" underline="hover" color="inherit" variant="body2" sx={{ opacity: 0.7 }}>All Collections</Link>
              <Link href="/" underline="hover" color="inherit" variant="body2" sx={{ opacity: 0.7 }}>New Arrivals</Link>
              <Link href="/" underline="hover" color="inherit" variant="body2" sx={{ opacity: 0.7 }}>Classic Lit</Link>
              <Link href="/" underline="hover" color="inherit" variant="body2" sx={{ opacity: 0.7 }}>Featured</Link>
            </Stack>
          </Grid>

          {/* Column 3: Support */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Support</Typography>
            <Stack spacing={1}>
              <Link href="#" underline="hover" color="inherit" variant="body2" sx={{ opacity: 0.7 }}>Shipping Policy</Link>
              <Link href="#" underline="hover" color="inherit" variant="body2" sx={{ opacity: 0.7 }}>Returns</Link>
              <Link href="#" underline="hover" color="inherit" variant="body2" sx={{ opacity: 0.7 }}>Contact Us</Link>
              <Link href="#" underline="hover" color="inherit" variant="body2" sx={{ opacity: 0.7 }}>Privacy</Link>
            </Stack>
          </Grid>

          {/* Column 4: Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>The Literary Letter</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
              Receive updates on new collections and exclusive author interviews.
            </Typography>
            <Box component="form" sx={{ display: 'flex', gap: 1 }}>
              <TextField 
                size="small" 
                placeholder="Email Address" 
                variant="outlined"
                sx={{ 
                  bgcolor: "rgba(255,255,255,0.05)", 
                  borderRadius: 0,
                  input: { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" }
                }}
              />
              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: "#ffffff", 
                  color: "#0d1440", 
                  borderRadius: 0,
                  "&:hover": { bgcolor: "#f4f1ea" }
                }}
              >
                Join
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

        <Typography variant="caption" sx={{ opacity: 0.5, textAlign: 'center', display: 'block' }}>
          © {new Date().getFullYear()} Novelstore. All rights reserved. Designed for the discerning reader.
        </Typography>
      </Container>
    </Box>
  );
}