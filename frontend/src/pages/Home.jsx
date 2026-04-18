import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Skeleton
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Category,
  LocalFlorist,
  LocalDrink,
  Restaurant,
  Pool,
  LocalPizza,
  Grass,
  Spa,
  MoreVert
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { bannerAPI, productAPI, categoryAPI } from '../services/api';

const categoryIcons = {
  'Fruits': <Category />,
  'Vegetables': <LocalFlorist />,
  'Dairy': <LocalDrink />,
  'Bakery': <LocalPizza />,
  'Meat & Poultry': <Restaurant />,
  'Fish & Seafood': <Pool />,
  'Beverages': <LocalDrink />,
  'Snacks': <LocalPizza />,
  'Grains & Pulses': <Grass />,
  'Spices & Condiments': <Spa />
};

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
  hidden: { opacity: 0, y: 20 },
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
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handlePrevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          height: { xs: 250, md: 400 },
          overflow: 'hidden'
        }}
      >
        {loading ? (
          <Skeleton variant="rectangular" height="100%" />
        ) : banners.length > 0 ? (
          <>
            <Box
              component="img"
              src={banners[currentBanner].image}
              alt={banners[currentBanner].title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'rgba(0,0,0,0.5)',
                color: 'white',
                p: { xs: 2, md: 4 }
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {banners[currentBanner].title}
              </Typography>
              <Typography variant="h6">
                {banners[currentBanner].subtitle}
              </Typography>
            </Box>
            {banners.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevBanner}
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.9)',
                    '&:hover': { bgcolor: 'white' }
                  }}
                >
                  <ChevronLeft />
                </IconButton>
                <IconButton
                  onClick={handleNextBanner}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.9)',
                    '&:hover': { bgcolor: 'white' }
                  }}
                >
                  <ChevronRight />
                </IconButton>
              </>
            )}
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              bgcolor: 'primary.main',
              color: 'white'
            }}
          >
            <Typography variant="h4">Welcome to Machhenarayan Mart</Typography>
          </Box>
        )}
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 3, fontWeight: 600 }}
            component={motion.h4}
            variants={itemVariants}
          >
            Shop by Category
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <Grid item xs={6} sm={4} md={2.4} key={i}>
                    <Card sx={{ p: 2, textAlign: 'center' }}>
                      <Skeleton variant="circular" width={60} height={60} sx={{ mx: 'auto', mb: 1 }} />
                      <Skeleton width="80%" />
                    </Card>
                  </Grid>
                ))
              : categories.slice(0, 10).map((category, index) => (
                  <Grid item xs={6} sm={4} md={2.4} key={category._id}>
                    <motion.div variants={itemVariants}>
                      <Card
                        component={Link}
                        to={`/category/${category.slug}`}
                        sx={{
                          p: 2,
                          textAlign: 'center',
                          textDecoration: 'none',
                          '&:hover': {
                            bgcolor: 'action.hover'
                          }
                        }}
                      >
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            bgcolor: 'primary.light',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 1
                          }}
                        >
                          {categoryIcons[category.name] || <Category />}
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {category.name}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
          </Grid>
        </motion.div>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Featured Products
        </Typography>
        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <Card>
                    <Skeleton variant="rectangular" height={180} />
                    <CardContent>
                      <Skeleton width="80%" />
                      <Skeleton width="60%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : featuredProducts.slice(0, 8).map((product) => (
                <Grid item xs={6} sm={4} md={3} key={product._id}>
                  <Card
                    component={Link}
                    to={`/product/${product.slug}`}
                    sx={{ textDecoration: 'none' }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={product.images?.[0] || 'https://via.placeholder.com/300'}
                      alt={product.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {product.category?.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="primary.main"
                        sx={{ fontWeight: 600, mt: 1 }}
                      >
                        ₹{product.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/categories"
          >
            View All Products
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;