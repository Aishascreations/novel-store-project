import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Pagination, Stack, CircularProgress, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "../components/ProductCard";
import HeroBanner from "../components/HeroBanner";
import { getProductsByPage } from "../services/productService";

export default function Home() {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;

  // Unified Fetch Function
  const fetchNovels = () => {
    setLoading(true);
    // Passing page-1 because Spring Boot indices start at 0
    getProductsByPage(page - 1, itemsPerPage)
      .then((data) => {
        setNovels(data.content || []);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend Error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNovels();
  }, [page]);

  // Client-side filtering (or you can link this to the /api/novels/search backend)
  const filteredNovels = novels.filter((n) =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <HeroBanner />

      <Container sx={{ py: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Playfair Display, serif",
            color: "#c72c41",
            textAlign: "center",
            mb: 2,
          }}
        >
          Featured Novels
        </Typography>

        {/* 🔍 Search Bar */}
        <TextField
          fullWidth
          placeholder="Search for your favorite novel..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4, maxWidth: 600, mx: "auto", display: "flex" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#c72c41" }} />
              </InputAdornment>
            ),
          }}
        />

        {loading ? (
          <Stack alignItems="center" sx={{ py: 5 }}>
            <CircularProgress sx={{ color: "#c72c41" }} />
          </Stack>
        ) : filteredNovels.length === 0 ? (
          <Typography textAlign="center" color="textSecondary">
            No novels found in the collection.
          </Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {filteredNovels.map((novel) => (
                <Grid item key={novel.id} xs={12} sm={6} md={4}>
                  <ProductCard product={novel} />
                </Grid>
              ))}
            </Grid>

            {/* ✅ Pagination Footer */}
            <Stack spacing={2} sx={{ mt: 4, alignItems: "center" }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                sx={{
                  "& .MuiPaginationItem-root": { color: "#c72c41" },
                  "& .Mui-selected": {
                    backgroundColor: "#ffc0cb !important",
                    color: "#fff",
                  },
                }}
              />
            </Stack>
          </>
        )}
      </Container>
    </>
  );
}