import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export default function HeroBanner() {
  return (
    <Box
      sx={{
        /*Navy to Charcoal Gradient */
        background: "linear-gradient(135deg, #1a237e 0%, #0d1440 100%)",
        padding: { xs: "6rem 1rem", md: "8rem 2rem" },
        textAlign: "center",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        /*  texture overlay for a "paper" feel */
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')",
          pointerEvents: "none"
        }
      }}
    >
      <Container maxWidth="md">
        <AutoStoriesIcon sx={{ fontSize: 50, mb: 2, opacity: 0.8 }} />
        
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: { xs: "2.5rem", md: "4rem" },
            letterSpacing: "-0.02em",
            mb: 2
          }}
        >
          Curating Timeless Stories
        </Typography>

        <Typography
          variant="h6"
          sx={{ 
            fontFamily: "'Inter', sans-serif", 
            fontWeight: 300, 
            color: "rgba(255, 255, 255, 0.8)",
            maxWidth: "600px",
            mx: "auto",
            mb: 4,
            lineHeight: 1.6
          }}
        >
          From legendary classics to modern masterpieces. Explore a collection 
          hand-selected for the discerning reader.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{
              bgcolor: "#ffffff",
              color: "#1a237e",
              fontWeight: 700,
              px: 4,
              py: 1.5,
              borderRadius: 0, // Sharp edges 
              textTransform: "none",
              fontSize: "1.1rem",
              "&:hover": { 
                bgcolor: "#f4f1ea",
                transform: "translateY(-2px)"
              },
              transition: "all 0.2s"
            }}
          >
            Explore the Collection
          </Button>
        </Box>
      </Container>
    </Box>
  );
}