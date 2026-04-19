import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Container, Typography, Grid, Button, Skeleton, IconButton, 
  Avatar, AvatarGroup
} from '@mui/material';
import { ChevronLeft, ChevronRight, LocalShipping, Verified } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Animation variants for Card Shuffle effect
  const shuffleVariants = {
    initial: {
      x: 300,
      opacity: 0,
      scale: 0.8,
      rotate: 10,
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    exit: {
      x: -300,
      opacity: 0,
      scale: 0.8,
      rotate: -10,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* ===== HERO REDESIGN - SPLIT LAYOUT ===== */}
      <Box sx={{ 
        position: 'relative', overflow: 'hidden', 
        pt: { xs: 4, md: 10 }, pb: { xs: 8, md: 12 }, 
        backgroundColor: '#fafafa' 
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Left Column - Typography & CTAs */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h1" sx={{ 
                  fontWeight: 900, fontSize: { xs: '2.5rem', md: '4rem' }, 
                  color: '#1a1a2e', lineHeight: 1.1, mb: 3 
                }}>
                  Freshness and <Box component="span" sx={{ color: '#135788' }}>Quality</Box> right at your side
                </Typography>
                <Typography sx={{ color: '#64748b', fontSize: '1.1rem', mb: 5, maxWidth: 500, lineHeight: 1.6 }}>
                  Machhenarayan Mart brings you the finest selection of local produce and daily essentials, curated with care for your family.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, mb: 8, flexWrap: 'wrap' }}>
                  <Button variant="contained" component={Link} to="/shop" 
                    sx={{ 
                      backgroundColor: '#135788', borderRadius: '30px', px: 5, py: 1.8, 
                      fontWeight: 700, fontSize: '1rem',
                      boxShadow: '0 10px 30px rgba(19,87,136,0.3)',
                      '&:hover': { backgroundColor: '#0e4268', transform: 'translateY(-2px)' }
                    }}>
                    Product Catalogue
                  </Button>
                </Box>

                {/* Trust Signal Cards */}
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <Box sx={{ 
                    p: 2.5, borderRadius: '20px', backgroundColor: '#fff', 
                    border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)', flex: '1 1 200px'
                  }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: '12px', backgroundColor: 'rgba(207,124,30,0.1)', color: '#cf7c1e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <LocalShipping />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: '0.875rem', color: '#1a1a2e' }}>Fast Delivery</Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>Across the community</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ 
                    p: 2.5, borderRadius: '20px', backgroundColor: '#fff', 
                    border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)', flex: '1 1 200px'
                  }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: '12px', backgroundColor: 'rgba(19,87,136,0.1)', color: '#135788', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Verified />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: '0.875rem', color: '#1a1a2e' }}>100% Quality</Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>Curated with care</Typography>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Column - Deck Shuffle Hero Slider */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <Box sx={{ 
                  position: 'relative', 
                  height: { xs: 350, md: 550 }, 
                  borderRadius: '40px', 
                  backgroundColor: '#fdf2e4', // Warm minimal background
                  padding: { xs: 1.5, md: 2.5 },
                  overflow: 'visible' 
                }}>
                  {/* Decorative Background Blob */}
                  <Box sx={{ 
                    position: 'absolute', top: '10%', right: '-5%', width: '100%', height: '100%', 
                    backgroundColor: 'rgba(207,124,30,0.1)', borderRadius: '40px', zIndex: 0 
                  }} />

                  <Box sx={{ position: 'relative', zIndex: 1, height: '100%', borderRadius: '32px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 20px 60px rgba(13,27,46,0.1)' }}>
                    {loading ? (
                      <Skeleton variant="rectangular" height="100%" />
                    ) : banners.length > 0 ? (
                      <Box sx={{ height: '100%', position: 'relative' }}>
                        <AnimatePresence mode="wait">
                          <Box key={currentBanner} sx={{ position: 'absolute', inset: 0 }}>
                            <motion.div 
                              variants={shuffleVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              style={{ height: '100%' }}
                            >
                               {/* Robust Image Loading to prevent 404s */}
                               {banners[currentBanner]?.image && (
                                   <img 
                                     src={banners[currentBanner].image} 
                                     alt="" 
                                     style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                   />
                               )}
                            </motion.div>
                          </Box>
                        </AnimatePresence>

                        {/* Banner Navigation Overlays */}
                        {banners.length > 1 && (
                          <>
                            <Box sx={{ position: 'absolute', bottom: 30, right: 30, display: 'flex', gap: 1, zIndex: 30 }}>
                              <IconButton onClick={handlePrevBanner} sx={{ backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', '&:hover': { backgroundColor: '#fff' } }}>
                                <ChevronLeft />
                              </IconButton>
                              <IconButton onClick={handleNextBanner} sx={{ backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', '&:hover': { backgroundColor: '#fff' } }}>
                                <ChevronRight />
                              </IconButton>
                            </Box>
                          </>
                        )}
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#135788', color: '#fff' }}>
                        <Typography variant="h3" sx={{ fontWeight: 800 }}>Premium Taste</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content Sections */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Categories Grid */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, mt: 4, color: '#1a1a2e' }}>Shop by Category</Typography>
        <Grid container spacing={2} sx={{ mb: 6 }}>
          {categories.slice(0, 10).map((category) => (
            <Grid item xs={6} sm={4} md={2.4} key={category._id}>
              <CategoryCard category={category} />
            </Grid>
          ))}
          {loading && Array.from({ length: 5 }).map((_, i) => (
            <Grid item xs={6} sm={4} md={2.4} key={i}>
              <Skeleton variant="rounded" height={200} sx={{ borderRadius: '16px' }} />
            </Grid>
          ))}
        </Grid>

        {/* Featured Products Grid */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#1a1a2e' }}>Featured Selection</Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {featuredProducts.slice(0, 8).map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
          {loading && Array.from({ length: 4 }).map((_, i) => (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <Skeleton variant="rounded" height={320} sx={{ borderRadius: '20px' }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;