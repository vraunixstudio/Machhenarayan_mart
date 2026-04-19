import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Container, Typography, Grid, Button, Skeleton, IconButton, Chip, Card, CardContent
} from '@mui/material';
import { ChevronLeft, ChevronRight, KeyboardArrowRight } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { bannerAPI, productAPI, categoryAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bannerRes, productRes, categoryRes] = await Promise.all([
          bannerAPI.getActiveBanners(),
          productAPI.getFeaturedProducts(),
          categoryAPI.getCategories()
        ]);
        setBanners(bannerRes.data.banners || []);
        setFeaturedProducts(productRes.data.products || []);
        setCategories(categoryRes.data.categories || []);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handlePrevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  const handleNextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);

  const currentImage = banners[currentBanner]?.image;
  const currentTitle = banners[currentBanner]?.title;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Hero Banner */}
      <Box sx={{ height: { xs: 250, md: 350 }, position: 'relative', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
        {loading ? (
          <Skeleton variant="rectangular" height="100%" />
        ) : currentImage ? (
          <Box>
            <Box component="img" src={currentImage} alt={currentTitle} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {banners.length > 1 && (
              <Box>
                <IconButton onClick={handlePrevBanner} sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.9)' }}>
                  <ChevronLeft />
                </IconButton>
                <IconButton onClick={handleNextBanner} sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.9)' }}>
                  <ChevronRight />
                </IconButton>
              </Box>
            )}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h4">Welcome to Machhenarayan Mart</Typography>
          </Box>
        )}
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Categories */}
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, mt: 4 }}>Shop by Category</Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {categories.slice(0, 10).map((category) => (
            <Grid item xs={6} sm={4} md={2.4} key={category._id}>
              <CategoryCard category={category} />
            </Grid>
          ))}
        </Grid>

        {/* Featured Products */}
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>Featured Products</Typography>
        <Grid container spacing={3}>
          {featuredProducts.slice(0, 8).map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;