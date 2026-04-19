import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Stable Default Imports for MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';

// Icons
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import LocalShipping from '@mui/icons-material/LocalShipping';
import Verified from '@mui/icons-material/Verified';

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
    }, 8000); // Slower interval for slow motion feel
    return () => clearInterval(interval);
  }, [banners.length]);

  const handlePrevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  const handleNextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);

  // PREMIUM FLOATING SWOOP ANIMATION (Slow-Motion)
  const swoopVariants = {
    initial: { 
      opacity: 0, 
      x: 350, 
      y: -350, 
      scale: 0.3, 
      rotate: 45,
      filter: 'blur(15px)'
    },
    animate: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      scale: 1, 
      rotate: 0,
      filter: 'blur(0px)',
      transition: { 
        duration: 3.5, // SUPER SLOW MOTION
        ease: [0.16, 1, 0.3, 1], // Smooth professional curve
        opacity: { duration: 2 }
      }
    },
    exit: { 
      opacity: 0, 
      x: -150, 
      y: 150, 
      scale: 0.8, 
      rotate: -20,
      filter: 'blur(10px)',
      transition: { 
        duration: 2.5,
        ease: "easeInOut"
      }
    }
  };

  // Secondary Floating Animation (Once settled)
  const idleVariants = {
    animate: {
      y: [0, -25, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* HERO SECTION - CLEAN MINIMALIST */}
      <Box sx={{ 
        position: 'relative', overflow: 'hidden', 
        pt: { xs: 4, md: 10 }, pb: { xs: 8, md: 12 }, 
        backgroundColor: '#fafafa' 
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Left Column - Content */}
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: "easeOut" }}>
                <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '2.5rem', md: '4rem' }, color: '#1a1a2e', lineHeight: 1.1, mb: 3 }}>
                  Freshness and <Box component="span" sx={{ color: '#135788' }}>Quality</Box> right at your side
                </Typography>
                <Typography sx={{ color: '#64748b', fontSize: '1.1rem', mb: 5, maxWidth: 500, lineHeight: 1.6 }}>
                  Machhenarayan Mart brings you the finest selection of local produce and daily essentials, curated with care for your family.
                </Typography>
                <Button variant="contained" component={Link} to="/shop" sx={{ backgroundColor: '#135788', borderRadius: '30px', px: 5, py: 1.8, fontWeight: 700, fontSize: '1rem', mb: 8, boxShadow: '0 10px 30px rgba(19,87,136,0.3)', '&:hover': { backgroundColor: '#0e4268' } }}>
                  Product Catalogue
                </Button>
                
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <Box sx={{ p: 2.5, borderRadius: '20px', display: 'flex', alignItems: 'center', gap: 2, flex: '1 1 200px' }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: '12px', backgroundColor: 'rgba(207,124,30,0.1)', color: '#cf7c1e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LocalShipping /></Box>
                    <Box><Typography sx={{ fontWeight: 800, fontSize: '0.875rem' }}>Fast Delivery</Typography><Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>Across the community</Typography></Box>
                  </Box>
                  <Box sx={{ p: 2.5, borderRadius: '20px', display: 'flex', alignItems: 'center', gap: 2, flex: '1 1 200px' }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: '12px', backgroundColor: 'rgba(19,87,136,0.1)', color: '#135788', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Verified /></Box>
                    <Box><Typography sx={{ fontWeight: 800, fontSize: '0.875rem' }}>100% Quality</Typography><Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>Curated with care</Typography></Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Column - FLOATING PNG SWOOP */}
            <Grid item xs={12} md={6} sx={{ position: 'relative', height: { xs: 400, md: 600 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Decorative Soft Background Orb */}
                <Box sx={{ position: 'absolute', width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(207,124,30,0.05) 0%, rgba(19,87,136,0.05) 100%)', filter: 'blur(100px)', zIndex: 0 }} />
                
                <AnimatePresence mode="wait">
                  {loading ? (
                    <Box key="skeleton" sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Skeleton variant="circular" width={300} height={300} />
                    </Box>
                  ) : banners.length > 0 ? (
                    <motion.div
                      key={currentBanner}
                      variants={swoopVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{ 
                        position: 'relative', zIndex: 2, width: '100%', height: '100%', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center' 
                      }}
                    >
                      {/* Idle Floating motion wrapper */}
                      <motion.div variants={idleVariants} animate="animate" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box
                          component="img"
                          src={banners[currentBanner]?.image}
                          alt=""
                          sx={{ 
                            maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
                            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.12)) drop-shadow(0 10px 20px rgba(19,87,136,0.08))'
                          }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </motion.div>
                    </motion.div>
                  ) : (
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#e2e8f0' }}>Premium Taste</Typography>
                  )}
                </AnimatePresence>

                {/* SLIDER CONTROLS - FLOATING MINIMALIST */}
                {banners.length > 1 && (
                  <Box sx={{ position: 'absolute', bottom: { xs: -20, md: 0 }, right: { xs: '50%', md: 0 }, transform: { xs: 'translateX(50%)', md: 'none' }, display: 'flex', gap: 2, zIndex: 10 }}>
                    <IconButton onClick={handlePrevBanner} sx={{ backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid #f1f5f9', backdropFilter: 'blur(8px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', '&:hover': { backgroundColor: '#fff', transform: 'scale(1.1)' } }}>
                      <ChevronLeft />
                    </IconButton>
                    <IconButton onClick={handleNextBanner} sx={{ backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid #f1f5f9', backdropFilter: 'blur(8px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', '&:hover': { backgroundColor: '#fff', transform: 'scale(1.1)' } }}>
                      <ChevronRight />
                    </IconButton>
                  </Box>
                )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Categories & Products */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, mt: 4 }}>Shop by Category</Typography>
        <Grid container spacing={2} sx={{ mb: 6 }}>
          {categories.slice(0, 10).map((cat) => (
            <Grid item xs={6} sm={4} md={2.4} key={cat._id}><CategoryCard category={cat} /></Grid>
          ))}
          {loading && Array.from({ length: 5 }).map((_, i) => (
            <Grid item xs={6} sm={4} md={2.4} key={i}><Skeleton variant="rounded" height={200} sx={{ borderRadius: '16px' }} /></Grid>
          ))}
        </Grid>

        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Featured Selection</Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {featuredProducts.slice(0, 8).map((p) => (
            <Grid item xs={6} sm={4} md={3} key={p._id}><ProductCard product={p} /></Grid>
          ))}
          {loading && Array.from({ length: 4 }).map((_, i) => (
            <Grid item xs={6} sm={4} md={3} key={i}><Skeleton variant="rounded" height={320} sx={{ borderRadius: '20px' }} /></Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;