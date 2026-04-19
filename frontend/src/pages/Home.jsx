import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Container, Typography, Grid, Button, Skeleton, IconButton
} from '@mui/material';
import {
  KeyboardArrowRight, LocalShipping, Verified, ChevronLeft, ChevronRight
} from '@mui/icons-material';
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
    }, 6000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <Box>
      {/* ===== HERO SECTION ===== */}
      <Box sx={{
        position: 'relative',
        minHeight: { xs: 420, md: 520 },
        display: 'flex', alignItems: 'center',
        overflow: 'hidden',
        px: { xs: 3, md: 6 }, py: { xs: 5, md: 8 }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left - Text Content */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    color: '#1a1a2e', lineHeight: 1.08,
                    letterSpacing: '-0.03em', mb: 2.5
                  }}
                >
                  Quality groceries,{' '}
                  <Box component="span" sx={{ color: '#cf7c1e' }}>right at your doorstep</Box>
                </Typography>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', md: '1rem' }, color: '#64748b',
                  lineHeight: 1.6, mb: 4, maxWidth: 440
                }}>
                  Your trusted local mart bringing fresh produce, daily essentials, and household goods — all in one place at the best prices.
                </Typography>
                <Button
                  variant="contained" size="large"
                  component={Link} to="/categories"
                  endIcon={<KeyboardArrowRight />}
                  sx={{
                    backgroundColor: '#135788', borderRadius: '28px',
                    px: 4, py: 1.5, fontSize: '0.9375rem', fontWeight: 600,
                    boxShadow: '0 4px 16px rgba(19, 87, 136, 0.3)',
                    '&:hover': { backgroundColor: '#0e4268', transform: 'translateY(-1px)', boxShadow: '0 8px 24px rgba(19, 87, 136, 0.35)' }
                  }}
                >
                  Product catalogue
                </Button>

                {/* Feature Badges */}
                <Box sx={{ display: 'flex', gap: 3, mt: 5, flexWrap: 'wrap' }}>
                  <Box sx={{
                    display: 'flex', alignItems: 'center', gap: 1.5,
                    backgroundColor: '#f8fafc', border: '1px solid #f1f5f9',
                    borderRadius: '14px', px: 2.5, py: 1.5
                  }}>
                    <LocalShipping sx={{ fontSize: 22, color: '#135788' }} />
                    <Box>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#1a1a2e' }}>Fast Delivery</Typography>
                      <Typography sx={{ fontSize: '0.65rem', color: '#94a3b8' }}>Across the region</Typography>
                    </Box>
                  </Box>
                  <Box sx={{
                    display: 'flex', alignItems: 'center', gap: 1.5,
                    backgroundColor: '#f8fafc', border: '1px solid #f1f5f9',
                    borderRadius: '14px', px: 2.5, py: 1.5
                  }}>
                    <Verified sx={{ fontSize: 22, color: '#cf7c1e' }} />
                    <Box>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#1a1a2e' }}>100% Fresh</Typography>
                      <Typography sx={{ fontSize: '0.65rem', color: '#94a3b8' }}>Quality guaranteed</Typography>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* Right - Banner Image */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              >
                <Box sx={{
                  position: 'relative', borderRadius: '24px', overflow: 'hidden',
                  backgroundColor: '#fdf2e4', height: { xs: 260, md: 400 }
                }}>
                  {banners.length > 0 ? (
                    <>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentBanner}
                          src={banners[currentBanner].image}
                          alt={banners[currentBanner].title || 'Banner'}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6 }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                        />
                      </AnimatePresence>
                      {banners.length > 1 && (
                        <>
                          <IconButton
                            onClick={() => setCurrentBanner((p) => (p - 1 + banners.length) % banners.length)}
                            sx={{
                              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                              backgroundColor: 'rgba(255,255,255,0.85)', width: 36, height: 36, zIndex: 3,
                              '&:hover': { backgroundColor: '#fff' }
                            }}
                          >
                            <ChevronLeft fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={() => setCurrentBanner((p) => (p + 1) % banners.length)}
                            sx={{
                              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                              backgroundColor: 'rgba(255,255,255,0.85)', width: 36, height: 36, zIndex: 3,
                              '&:hover': { backgroundColor: '#fff' }
                            }}
                          >
                            <ChevronRight fontSize="small" />
                          </IconButton>
                          <Box sx={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1, zIndex: 3 }}>
                            {banners.map((_, idx) => (
                              <Box key={idx} onClick={() => setCurrentBanner(idx)} sx={{
                                width: idx === currentBanner ? 24 : 8, height: 8, borderRadius: 4,
                                backgroundColor: idx === currentBanner ? '#135788' : 'rgba(255,255,255,0.6)',
                                cursor: 'pointer', transition: 'all 0.3s ease'
                              }} />
                            ))}
                          </Box>
                        </>
                      )}
                    </>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <Typography sx={{ color: '#cf7c1e', fontWeight: 700, fontSize: '1.5rem' }}>
                        Machhenarayan Mart
                      </Typography>
                    </Box>
                  )}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ===== CATEGORIES ===== */}
      <Box sx={{ py: { xs: 5, md: 7 }, backgroundColor: '#fff' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a1a2e' }}>
                Shop by Category
              </Typography>
              <Typography sx={{ color: '#94a3b8', fontSize: '0.875rem', mt: 0.5 }}>
                Browse our wide selection
              </Typography>
            </Box>
            <Button component={Link} to="/categories" endIcon={<KeyboardArrowRight />}
              sx={{ color: '#135788', fontWeight: 600, fontSize: '0.8125rem' }}>
              View all
            </Button>
          </Box>
          <Grid container spacing={2}>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Grid item xs={4} sm={3} md={2} key={i}>
                    <Skeleton variant="rounded" height={120} sx={{ borderRadius: '16px' }} />
                  </Grid>
                ))
              : categories.slice(0, 6).map((cat, i) => (
                  <Grid item xs={4} sm={3} md={2} key={cat._id}>
                    <CategoryCard category={cat} index={i} />
                  </Grid>
                ))
            }
          </Grid>
        </Container>
      </Box>

      {/* ===== FEATURED PRODUCTS ===== */}
      <Box sx={{ py: { xs: 5, md: 7 }, backgroundColor: '#fafbfc' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a1a2e' }}>
                Featured Products
              </Typography>
              <Typography sx={{ color: '#94a3b8', fontSize: '0.875rem', mt: 0.5 }}>
                Handpicked for quality & freshness
              </Typography>
            </Box>
            <Button component={Link} to="/categories" endIcon={<KeyboardArrowRight />}
              sx={{ color: '#135788', fontWeight: 600, fontSize: '0.8125rem' }}>
              View all
            </Button>
          </Box>
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <Grid item xs={6} sm={4} md={3} key={i}>
                    <Skeleton variant="rounded" height={280} sx={{ borderRadius: '16px' }} />
                  </Grid>
                ))
              : featuredProducts.length > 0
                ? featuredProducts.slice(0, 8).map((product, i) => (
                    <Grid item xs={6} sm={4} md={3} key={product._id}>
                      <ProductCard product={product} index={i} showQuickAdd />
                    </Grid>
                  ))
                : (
                    <Grid item xs={12}>
                      <Box sx={{
                        textAlign: 'center', py: 8, backgroundColor: '#fff',
                        borderRadius: '16px', border: '1px solid #f1f5f9'
                      }}>
                        <Typography sx={{ fontWeight: 600, color: '#1a1a2e', mb: 1 }}>
                          No products yet
                        </Typography>
                        <Typography sx={{ color: '#94a3b8', fontSize: '0.8125rem' }}>
                          Check back soon for fresh arrivals!
                        </Typography>
                      </Box>
                    </Grid>
                  )
            }
          </Grid>
        </Container>
      </Box>

      {/* ===== CTA BANNER ===== */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#135788', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{
          position: 'absolute', top: -60, right: -60, width: 200, height: 200,
          borderRadius: '50%', backgroundColor: 'rgba(207, 124, 30, 0.15)'
        }} />
        <Box sx={{
          position: 'absolute', bottom: -40, left: -40, width: 160, height: 160,
          borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)'
        }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 800, color: '#fff', mb: 2 }}>
            Fresh groceries delivered to you
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', mb: 4, maxWidth: 500, mx: 'auto' }}>
            Experience quality shopping with the freshest products at the best prices.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" component={Link} to="/categories"
              sx={{
                backgroundColor: '#cf7c1e', color: '#fff', borderRadius: '28px',
                px: 4, py: 1.5, fontWeight: 600,
                '&:hover': { backgroundColor: '#a86318' }
              }}>
              Start Shopping
            </Button>
            <Button variant="outlined" component={Link} to="/about"
              sx={{
                borderColor: 'rgba(255,255,255,0.3)', color: '#fff', borderRadius: '28px',
                px: 4, py: 1.5, fontWeight: 600,
                '&:hover': { borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.05)' }
              }}>
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
