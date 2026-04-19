import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
  Chip,
  Skeleton,
  Divider
} from '@mui/material';
import {
  ShoppingCart,
  CheckCircle,
  Add,
  Remove,
  Favorite,
  FavoriteBorder,
  Share,
  KeyboardArrowRight,
  Storefront
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getProductBySlug(slug);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart!`, {
      icon: '🛒',
      style: {
        borderRadius: '12px',
        background: '#fff',
        color: '#1A202C'
      }
    });
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 6 } }}>
        <Grid container spacing={{ xs: 3, md: 6 }}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" sx={{ borderRadius: 4, pt: '100%' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton width={200} height={50} sx={{ mb: 3 }} />
            <Skeleton width="80%" height={60} sx={{ mb: 3 }} />
            <Skeleton width="40%" height={40} sx={{ mb: 2 }} />
            <Skeleton width="60%" height={30} sx={{ mb: 4 }} />
            <Skeleton width="100%" height={100} sx={{ mb: 4 }} />
            <Skeleton width={200} height={56} sx={{ borderRadius: 3 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 8, md: 12 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Product Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            The product you're looking for doesn't exist or has been removed.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/categories"
            endIcon={<KeyboardArrowRight />}
          >
            Browse Products
          </Button>
        </Box>
      </Container>
    );
  }

  const images = product.images?.length > 0 ? product.images : ['https://via.placeholder.com/600'];
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 6 } }}>
      <Grid container spacing={{ xs: 3, md: 6 }}>
        {/* Image Gallery */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main Image */}
            <Box
              sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                mb: 2,
                backgroundColor: '#F0F4F8',
                aspectRatio: '1',
                boxShadow: '0 8px 40px rgba(0,0,0,0.08)'
              }}
            >
              <motion.img
                key={selectedImageIndex}
                src={images[selectedImageIndex]}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* Badges */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                {hasDiscount && (
                  <Chip
                    label={`-${discountPercent}%`}
                    sx={{
                      backgroundColor: '#E53935',
                      color: 'white',
                      fontWeight: 700,
                      height: 28,
                      px: 1
                    }}
                  />
                )}
                {product.isFeatured && (
                  <Chip
                    label="Featured"
                    sx={{
                      backgroundColor: '#0F5C8A',
                      color: 'white',
                      fontWeight: 600,
                      height: 28,
                      px: 1
                    }}
                  />
                )}
              </Box>

              {/* Wishlist Button */}
              <IconButton
                onClick={handleWishlistToggle}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  color: isWishlisted ? '#E53935' : '#718096',
                  width: 44,
                  height: 44,
                  '&:hover': {
                    backgroundColor: 'white',
                    transform: 'scale(1.1)'
                  },
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                {isWishlisted ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mt: 3,
                  overflowX: 'auto',
                  pb: 1
                }}
              >
                {images.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: selectedImageIndex === index ? '3px solid' : '3px solid transparent',
                      borderColor: 'primary.main',
                      opacity: selectedImageIndex === index ? 1 : 0.6,
                      transform: selectedImageIndex === index ? 'scale(1.05)' : 'scale(1)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        opacity: 0.9
                      }
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </motion.div>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Category */}
            {product.category?.name && (
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={product.category.name}
                  component={Link}
                  to={`/category/${product.category.slug}`}
                  clickable
                  sx={{
                    backgroundColor: 'rgba(15, 92, 138, 0.1)',
                    color: 'primary.main',
                    fontWeight: 600,
                    textDecoration: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(15, 92, 138, 0.15)'
                    }
                  }}
                />
              </Box>
            )}

            {/* Title */}
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 800,
                lineHeight: 1.2,
                mb: 3,
                letterSpacing: '-0.02em'
              }}
            >
              {product.name}
            </Typography>

            {/* Rating - placeholder for future */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Typography key={star} sx={{ color: '#FFB400', fontSize: '1.2rem' }}>
                    ★
                  </Typography>
                ))}
                <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                  (4.8)
                </Typography>
              </Box>
            </Box>

            {/* Price */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 3,
                p: 3,
                borderRadius: 3,
                backgroundColor: '#F8FAFC',
                width: 'fit-content'
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', md: '2.8rem' },
                  fontWeight: 800,
                  color: 'primary.main',
                  lineHeight: 1
                }}
              >
                ₹{product.price}
              </Typography>

              {hasDiscount && (
                <>
                  <Typography
                    variant="h5"
                    sx={{
                      textDecoration: 'line-through',
                      color: 'text.secondary',
                      fontSize: '1.5rem'
                    }}
                  >
                    ₹{product.originalPrice}
                  </Typography>
                  <Chip
                    label={`Save ₹${product.originalPrice - product.price}`}
                    sx={{
                      backgroundColor: '#48BB78',
                      color: 'white',
                      fontWeight: 600,
                      '& span': { fontSize: '0.9rem' }
                    }}
                  />
                </>
              )}
            </Box>

            {/* Stock Status */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 4,
                p: 2,
                borderRadius: 2,
                backgroundColor: product.inStock ? 'rgba(72, 187, 120, 0.1)' : 'rgba(160, 174, 192, 0.1)',
                width: 'fit-content'
              }}
            >
              <CheckCircle
                sx={{
                  fontSize: 24,
                  color: product.inStock ? '#48BB78' : '#A0AEC0'
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: product.inStock ? '#48BB78' : '#718096',
                  fontSize: '1rem'
                }}
              >
                {product.inStock ? 'In Stock - Ready to Ship' : 'Out of Stock'}
              </Typography>
            </Box>

            {/* Description */}
            {product.description && (
              <Box sx={{ mb: 5 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 2, fontSize: '1.2rem' }}
                >
                  Description
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                    fontSize: '1.05rem'
                  }}
                >
                  {product.description}
                </Typography>
              </Box>
            )}

            {/* Actions */}
            {product.inStock && (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  mb: 4,
                  pt: 4,
                  borderTop: '1px solid',
                  borderColor: 'divider'
                }}
              >
                {/* Quantity Selector */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '2px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: 'primary.main'
                    }
                  }}
                >
                  <IconButton
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                  >
                    <Remove />
                  </IconButton>
                  <Typography
                    sx={{
                      px: 3,
                      minWidth: 56,
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '1.2rem'
                    }}
                  >
                    {quantity}
                  </Typography>
                  <IconButton
                    onClick={() => setQuantity(quantity + 1)}
                    sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                  >
                    <Add />
                  </IconButton>
                </Box>

                {/* Add to Cart */}
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  sx={{
                    flex: { xs: '1 1 100%', sm: '1 1 auto' },
                    py: 1.8,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 2,
                    boxShadow: '0 8px 24px rgba(15, 92, 138, 0.35)',
                    '&:hover': {
                      boxShadow: '0 12px 32px rgba(15, 92, 138, 0.45)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Add to Cart
                </Button>

                {/* Share Button */}
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Link copied to clipboard!');
                  }}
                  sx={{
                    width: 56,
                    height: 56,
                    border: '2px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'rgba(15, 92, 138, 0.04)'
                    }
                  }}
                >
                  <Share />
                </IconButton>
              </Box>
            )}

            {/* Store Info */}
            <Divider sx={{ my: 4 }} />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 3,
                borderRadius: 2,
                backgroundColor: '#F8FAFC'
              }}
            >
              <Storefront sx={{ color: 'primary.main', fontSize: 28 }} />
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Sold by
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Machhenarayan Mart
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
