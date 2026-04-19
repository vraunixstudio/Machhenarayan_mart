import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import { Add, FavoriteBorder } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product, index = 0, showQuickAdd = true }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`Added to cart`, {
      style: { borderRadius: '12px', background: '#135788', color: '#fff', fontSize: '13px', padding: '8px 16px' }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.25, 1, 0.5, 1] }}
    >
      <Box
        component={Link}
        to={`/product/${product.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          display: 'block', textDecoration: 'none', position: 'relative',
          borderRadius: '16px', backgroundColor: '#fff',
          border: '1px solid #f1f5f9', overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.08)', transform: 'translateY(-2px)' },
          '&:active': { transform: 'scale(0.98)' }
        }}
      >
        {/* Image */}
        <Box sx={{ position: 'relative', pt: '100%', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
          <Box
            component="img"
            src={product.images?.[0] || 'https://placehold.co/400x400/f8fafc/94a3b8?text=Product'}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            sx={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              objectFit: 'cover', opacity: imageLoaded ? 1 : 0,
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.4s ease'
            }}
          />

          {/* Discount badge */}
          {hasDiscount && (
            <Box sx={{
              position: 'absolute', top: 10, left: 10, backgroundColor: '#D32F2F',
              color: '#fff', fontSize: '0.7rem', fontWeight: 700, px: 1, py: 0.25,
              borderRadius: '8px'
            }}>
              -{discountPercent}%
            </Box>
          )}

          {/* Wishlist */}
          <IconButton
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            size="small"
            sx={{
              position: 'absolute', top: 10, right: 10,
              backgroundColor: 'rgba(255,255,255,0.9)',
              width: 32, height: 32,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.2s ease',
              '&:hover': { backgroundColor: '#fff', color: '#D32F2F' }
            }}
          >
            <FavoriteBorder sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: { xs: 1.5, md: 2 } }}>
          {product.category?.name && (
            <Typography sx={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.5 }}>
              {product.category.name}
            </Typography>
          )}
          <Typography sx={{
            fontSize: '0.8125rem', fontWeight: 600, color: '#1a1a2e', lineHeight: 1.3,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            mb: 1, minHeight: '2.1em'
          }}>
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75 }}>
              <Typography sx={{ fontWeight: 700, color: '#135788', fontSize: '1rem' }}>
                ₹{product.price}
              </Typography>
              {hasDiscount && (
                <Typography sx={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.75rem' }}>
                  ₹{product.originalPrice}
                </Typography>
              )}
            </Box>
            {showQuickAdd && product.inStock && (
              <IconButton
                onClick={handleAddToCart} size="small"
                sx={{
                  backgroundColor: '#135788', color: '#fff', width: 32, height: 32,
                  borderRadius: '10px',
                  '&:hover': { backgroundColor: '#0e4268' },
                  '&:active': { transform: 'scale(0.9)' }
                }}
              >
                <Add sx={{ fontSize: 18 }} />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ProductCard;
