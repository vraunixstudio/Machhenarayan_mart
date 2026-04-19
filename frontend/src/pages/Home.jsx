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
      <Box sx={{ height: { xs: 300, md: 450 }, position: 'relative', overflow: 'hidden', backgroundColor: '#135788' }}>
        {loading ? (
          <Skeleton variant="rectangular" height="100%" />
        ) : banners.length > 0 ? (
          <Box sx={{ height: '100%', position: 'relative' }}>
            <motion.div
              key={currentBanner}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ height: '100%', width: '100%' }}
            >
              <Box component="img" src={banners[currentBanner].image} alt={banners[currentBanner].title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              
              {/* Text Overlay */}
              {(banners[currentBanner].title || banners[currentBanner].subtitle) && (
                <Box sx={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to right, rgba(13,27,46,0.7) 0%, rgba(13,27,46,0) 60%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  px: { xs: 4, md: 8 }, color: '#fff'
                }}>
                  <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
                    <Typography variant="h1" sx={{ 
                      color: '#fff', mb: 2, fontWeight: 900,
                      fontSize: { xs: '1.8rem', md: '3.5rem' }, maxWidth: 600,
                      lineHeight: 1.1, textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}>
                      {banners[currentBanner].title}
                    </Typography>
                    <Typography sx={{ 
                      color: 'rgba(255,255,255,0.9)', fontSize: { xs: '0.9rem', md: '1.15rem' }, 
                      maxWidth: 450, fontWeight: 500,
                      textShadow: '0 1px 5px rgba(0,0,0,0.2)'
                    }}>
                      {banners[currentBanner].subtitle}
                    </Typography>
                    {banners[currentBanner].link && (
                      <Button variant="contained" component={Link} to={banners[currentBanner].link}
                        sx={{ 
                          mt: 4, bgcolor: '#cf7c1e', color: '#fff', borderRadius: '24px', px: 4, py: 1.2,
                          fontWeight: 700, fontSize: '0.9rem', '&:hover': { bgcolor: '#b06a1a' }
                        }}>
                        Shop Now
                      </Button>
                    )}
                  </motion.div>
                </Box>
              )}
            </motion.div>

            {banners.length > 1 && (
              <>
                <IconButton onClick={handlePrevBanner} 
                  sx={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }, zIndex: 10 }}>
                  <ChevronLeft />
                </IconButton>
                <IconButton onClick={handleNextBanner} 
                  sx={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }, zIndex: 10 }}>
                  <ChevronRight />
                </IconButton>
                
                {/* Dots indicator */}
                <Box sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1.5, zIndex: 10 }}>
                  {banners.map((_, idx) => (
                    <Box key={idx} onClick={() => setCurrentBanner(idx)}
                      sx={{ 
                        width: idx === currentBanner ? 24 : 8, height: 8, borderRadius: 4,
                        bgcolor: idx === currentBanner ? '#cf7c1e' : 'rgba(255,255,255,0.5)',
                        cursor: 'pointer', transition: 'all 0.3s ease'
                      }} />
                  ))}
                </Box>
              </>
            )}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', bgcolor: '#135788', color: 'white' }}>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>Machhenarayan Mart</Typography>
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