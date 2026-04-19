import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  Chip,
  Badge,
  Skeleton
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Add,
  CheckCircle,
  Percent
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product, index = 0, showQuickAdd = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      style: {
        borderRadius: '10px',
        background: '#fff',
        color: '#1A202C'
      }
    });
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <Card
        component={Link}
        to={`/product/${product.slug}`}
        sx={{
          textDecoration: 'none',
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: isHovered
            ? '0 20px 50px rgba(0,0,0,0.12)'
            : '0 4px 20px rgba(0,0,0,0.06)',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 24px 60px rgba(0,0,0,0.14)'
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <Box
          sx={{
            position: 'relative',
            paddingTop: '100%',
            overflow: 'hidden',
            backgroundColor: '#F0F4F8'
          }}
        >
          {!imageLoaded && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E2E8F0'
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#CBD5E0',
                  animation: 'pulse 1.5s infinite'
                }}
              />
            </Box>
          )}

          <CardMedia
            component="img"
            image={product.images?.[0] || 'https://via.placeholder.com/400'}
            alt={product.name}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: imageLoaded ? 1 : 0,
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease'
            }}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Badges */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              zIndex: 2
            }}
          >
            {hasDiscount && (
              <Chip
                icon={<Percent sx={{ fontSize: 14 }} />}
                label={`-${discountPercent}%`}
                size="small"
                sx={{
                  backgroundColor: '#E53935',
                  color: 'white',
                  fontWeight: 700,
                  height: 24,
                  fontSize: '0.75rem',
                  boxShadow: '0 2px 8px rgba(229, 57, 53, 0.4)'
                }}
              />
            )}
            {product.isFeatured && (
              <Chip
                label="Featured"
                size="small"
                sx={{
                  backgroundColor: '#0F5C8A',
                  color: 'white',
                  fontWeight: 600,
                  height: 24,
                  fontSize: '0.75rem',
                  boxShadow: '0 2px 8px rgba(15, 92, 138, 0.4)'
                }}
              />
            )}
            {!product.inStock && (
              <Chip
                label="Out of Stock"
                size="small"
                sx={{
                  backgroundColor: '#718096',
                  color: 'white',
                  fontWeight: 600,
                  height: 24,
                  fontSize: '0.75rem'
                }}
              />
            )}
          </Box>

          {/* Quick Actions */}
          {showQuickAdd && isHovered && product.inStock && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  left: 12,
                  right: 12,
                  display: 'flex',
                  gap: 1,
                  zIndex: 2
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Add />}
                  fullWidth
                  onClick={handleAddToCart}
                  sx={{
                    borderRadius: 2,
                    py: 0.5,
                    boxShadow: '0 4px 12px rgba(15, 92, 138, 0.4)',
                    '&:hover': {
                      boxShadow: '0 6px 20px rgba(15, 92, 138, 0.5)'
                    }
                  }}
                >
                  Add
                </Button>
                <IconButton
                  onClick={handleWishlistToggle}
                  sx={{
                    backgroundColor: 'white',
                    color: isWishlisted ? '#E53935' : '#718096',
                    '&:hover': {
                      backgroundColor: '#F7FAFC',
                      color: isWishlisted ? '#C62828' : '#4A5568'
                    },
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  {isWishlisted ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </Box>
            </motion.div>
          )}

          {/* Wishlist Button (always visible on mobile) */}
          {showQuickAdd && (
            <IconButton
              onClick={handleWishlistToggle}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(4px)',
                color: isWishlisted ? '#E53935' : '#718096',
                width: 36,
                height: 36,
                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'scale(1.1)'
                },
                zIndex: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              {isWishlisted ? <Favorite sx={{ fontSize: 18 }} /> : <FavoriteBorder sx={{ fontSize: 18 }} />}
            </IconButton>
          )}
        </Box>

        {/* Content */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            '&:last-child': { pb: 2 }
          }}
        >
          {/* Category Link */}
          {product.category?.name && (
            <Typography
              component={Link}
              to={`/category/${product.category.slug}`}
              sx={{
                fontSize: '0.75rem',
                color: '#0F5C8A',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                mb: 0.5,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              {product.category.name}
            </Typography>
          )}

          {/* Product Name */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '1rem',
              lineHeight: 1.3,
              color: '#1A202C',
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flexGrow: 1
            }}
          >
            {product.name}
          </Typography>

          {/* Price */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 0.5
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#0F5C8A',
                fontSize: '1.1rem'
              }}
            >
              ₹{product.price}
            </Typography>

            {hasDiscount && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: '#A0AEC0',
                  fontSize: '0.85rem'
                }}
              >
                ₹{product.originalPrice}
              </Typography>
            )}
          </Box>

          {/* Stock Status */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              mt: 'auto'
            }}
          >
            <CheckCircle
              sx={{
                fontSize: 14,
                color: product.inStock ? '#48BB78' : '#A0AEC0'
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: product.inStock ? '#48BB78' : '#A0AEC0',
                fontWeight: 500,
                fontSize: '0.75rem'
              }}
            >
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
