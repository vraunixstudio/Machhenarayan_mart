import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
  Skeleton,
  Chip
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  KeyboardArrowRight,
  LocalGroceryStore,
  Sparkles
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { bannerAPI, productAPI, categoryAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

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
        setBanners(bannerRes.data.banners);
        setFeaturedProducts(productRes.data.products);
        setCategories(categoryRes.data.categories);
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

  const handlePrevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Banner Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '60vh', sm: '70vh', md: '85vh' },
          minHeight: { xs: 500, sm: 600, md: 700 },
          maxHeight: 800,
          overflow: 'hidden',
          backgroundColor: '#0F5C8A'
        }}
      >
        {loading ? (
          <Skeleton variant="rectangular" height="100%" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        ) : banners.length > 0 ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBanner}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
                }}
              >
                <Box
                  component="img"
                  src={banners[currentBanner].image}
                  alt={banners[currentBanner].title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.7)'
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '80%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.8) 100%)',
                pointerEvents: 'none'
              }}
            />

            {/* Banner Content */}
            <motion.div
              key={`content-${currentBanner}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: { xs: '15%', md: '20%' },
                  left: 0,
                  right: 0,
                  px: { xs: 4, sm: 6, md: 8 },
                  color: 'white',
                  textAlign: 'center',
                  zIndex: 2
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                    fontWeight: 800,
                    mb: 2,
                    textShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1
                  }}
                >
                  {banners[currentBanner].title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                    fontWeight: 400,
                    mb: 4,
                    opacity: 0.95,
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    maxWidth: 800,
                    mx: 'auto'
                  }}
                >
                  {banners[currentBanner].subtitle}
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/categories"
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      backgroundColor: 'white',
                      color: 'primary.main',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                      '&:hover': {
                        backgroundColor: '#F8FAFC',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.3)'
                      }
                    }}
                  >
                    Shop Now
                    <KeyboardArrowRight sx={{ ml: 1, fontSize: 20 }} />
                  </Button>
                </Box>
              </Box>
            </motion.div>

            {/* Navigation Arrows */}
            {banners.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevBanner}
                  sx={{
                    position: 'absolute',
                    left: { xs: 8, md: 24 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    color: 'white',
                    width: { xs: 40, md: 56 },
                    height: { xs: 40, md: 56 },
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.25)',
                      transform: 'translateY(-50%) scale(1.05)'
                    },
                    zIndex: 3,
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <ChevronLeft sx={{ fontSize: 32 }} />
                </IconButton>
                <IconButton
                  onClick={handleNextBanner}
                  sx={{
                    position: 'absolute',
                    right: { xs: 8, md: 24 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    color: 'white',
                    width: { xs: 40, md: 56 },
                    height: { xs: 40, md: 56 },
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.25)',
                      transform: 'translateY(-50%) scale(1.05)'
                    },
                    zIndex: 3,
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <ChevronRight sx={{ fontSize: 32 }} />
                </IconButton>
              </>
            )}

            {/* Banner Dots */}
            {banners.length > 1 && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: { xs: 24, md: 40 },
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 2,
                  zIndex: 3
                }}
              >
                {banners.map((_, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setCurrentBanner(idx)}
                    sx={{
                      width: idx === currentBanner ? 32 : 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: idx === currentBanner ? 'white' : 'rgba(255,255,255,0.4)',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        transform: 'scale(1.1)'
                      }
                    }}
                  />
                ))}
              </Box>
            )}
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              flexDirection: 'column',
              color: 'white',
              textAlign: 'center',
              px: 4
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Machhenarayan Mart
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: 600 }}>
              Your trusted destination for fresh groceries and quality essentials delivered to your doorstep
            </Typography>
          </Box>
        )}
      </Box>

      {/* Categories Section */}
      <Box
        sx={{
          position: 'relative',
          mt: { xs: -8, md: -12 },
          mb: { xs: 6, md: 8 },
          zIndex: 10
        }}
      >
        <Container maxWidth="xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(4, 1fr)',
                  lg: 'repeat(5, 1fr)',
                  xl: 'repeat(6, 1fr)'
                },
                gap: { xs: 2, sm: 3, md: 4 }
              }}
            >
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <Box key={i}>
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          borderRadius: 3,
                          pt: '100%',
                          position: 'relative'
                        }}
                      />
                    </Box>
                  ))
                : categories.slice(0, 6).map((category, index) => (
                    <motion.div key={category._id} variants={itemVariants}>
                      <CategoryCard category={category} index={index} />
                    </motion.div>
                  ))
              }
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Box
        sx={{
          py: { xs: 8, md: 14 },
          position: 'relative',
          backgroundColor: { xs: 'transparent', md: 'rgba(15, 92, 138, 0.01)' },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'radial-gradient(ellipse at 30% 10%, rgba(15, 92, 138, 0.04) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(230, 81, 0, 0.03) 0%, transparent 50%)',
            pointerEvents: 'none',
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Section Header */}
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: { xs: 4, md: 6 },
                  flexWrap: 'wrap',
                  gap: 3
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative' }}>
                  {/* Decorative sparkle icons */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      left: -30,
                      display: { xs: 'none', md: 'block' }
                    }}
                  >
                    <Sparkles sx={{ fontSize: 20, color: 'warning.main', opacity: 0.6 }} />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'primary.main',
                      borderRadius: 2,
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: 2,
                        backgroundColor: 'primary.main',
                        filter: 'blur(12px)',
                        opacity: 0.4,
                        zIndex: -1,
                        transform: 'scale(1.3)'
                      }
                    }}
                  >
                    <LocalGroceryStore sx={{ fontSize: 32, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1
                      }}
                    >
                      Featured Products
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        mt: 0.5,
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        maxWidth: 500
                      }}
                    >
                      {!loading && featuredProducts.length > 0 && (
                        <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                          {featuredProducts.length} premium items
                        </Box>
                      )}
                      {' '}handpicked for quality & freshness
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/categories"
                  endIcon={<KeyboardArrowRight />}
                  sx={{
                    py: { xs: 1.5, md: 1.75 },
                    px: { xs: 3, md: 4 },
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    fontWeight: 700,
                    borderRadius: 3,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    boxShadow: '0 4px 14px rgba(15, 92, 138, 0.35)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 24px rgba(15, 92, 138, 0.45)'
                    }
                  }}
                >
                  View All Products
                </Button>
              </Box>
            </motion.div>

            {/* Products Grid */}
            <Grid container spacing={{ xs: 2, sm: 2.5, md: 3, lg: 3 }}>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <Grid item xs={6} sm={4} md={3} key={i}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: i * 0.06,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: 'white',
                            borderRadius: 3,
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {/* Image Skeleton with shimmer */}
                          <Box
                            sx={{
                              position: 'relative',
                              pt: '100%',
                              backgroundColor: '#E2E8F0',
                              overflow: 'hidden',
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                                backgroundSize: '1000px 100%',
                                animation: 'shimmer 2.5s infinite linear',
                                willChange: 'transform'
                              }
                            }}
                          />
                          {/* Content Skeleton */}
                          <Box sx={{ p: 2 }}>
                            <Skeleton
                              variant="text"
                              width="85%"
                              height={26}
                              sx={{
                                borderRadius: 1,
                                '&::after': {
                                  animation: 'pulse 1.5s infinite'
                                }
                              }}
                            />
                            <Skeleton
                              variant="text"
                              width="60%"
                              height={18}
                              sx={{
                                mb: 1.5,
                                '&::after': {
                                  animation: 'pulse 1.5s infinite'
                                }
                              }}
                            />
                            <Skeleton
                              variant="text"
                              width="45%"
                              height={30}
                              sx={{
                                borderRadius: 1,
                                '&::after': {
                                  animation: 'pulse 1.5s infinite'
                                }
                              }}
                            />
                          </Box>
                        </Box>
                      </motion.div>
                    </Grid>
                  ))
                : featuredProducts.length > 0 ? (
                    featuredProducts.slice(0, 8).map((product, index) => (
                      <Grid item xs={6} sm={4} md={3} key={product._id}>
                        <ProductCard product={product} index={index} showQuickAdd={true} />
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Box
                          sx={{
                            textAlign: 'center',
                            py: { xs: 10, md: 14 },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2.5,
                            backgroundColor: 'grey.50',
                            borderRadius: 4,
                            border: '2px dashed',
                            borderColor: 'divider',
                            mx: 2
                          }}
                        >
                          <Box
                            sx={{
                              p: 3,
                              borderRadius: '50%',
                              backgroundColor: 'rgba(15, 92, 138, 0.08)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <LocalGroceryStore
                              sx={{
                                fontSize: { xs: 50, md: 64 },
                                color: 'primary.main',
                                opacity: 0.7
                              }}
                            />
                          </Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: 'text.primary',
                              fontSize: { xs: '1.3rem', md: '1.5rem' }
                            }}
                          >
                            No Featured Products Yet
                          </Typography>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                              maxWidth: 500,
                              lineHeight: 1.6,
                              fontSize: '1rem'
                            }}
                          >
                            Our team is carefully selecting the freshest products for you.
                            Check back soon for an amazing collection!
                          </Typography>
                          <Button
                            variant="contained"
                            component={Link}
                            to="/categories"
                            sx={{
                              mt: 2,
                              py: 1.5,
                              px: 4,
                              fontSize: '1rem',
                              fontWeight: 600,
                              borderRadius: 3,
                              backgroundColor: 'primary.main',
                              '&:hover': {
                                backgroundColor: 'primary.dark',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(15, 92, 138, 0.35)'
                              }
                            }}
                          >
                            Browse All Products
                          </Button>
                        </Box>
                      </motion.div>
                    </Grid>
                  )
              }
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          backgroundColor: '#0F5C8A',
          color: 'white',
          py: { xs: 8, md: 16 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative gradient */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)'
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3rem' },
                textAlign: 'center',
                mb: 3,
                lineHeight: 1.2
              }}
            >
              Fresh Groceries Delivered to Your Doorstep
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                fontSize: '1.2rem',
                opacity: 0.9,
                mb: 5,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Experience the convenience of online shopping with the freshest products delivered right to your home.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/categories"
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  '&:hover': {
                    backgroundColor: '#F8FAFC',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.2)'
                  }
                }}
              >
                Start Shopping
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/about"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderWidth: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Learn More
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
