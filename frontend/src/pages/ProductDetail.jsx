import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box, Container, Typography, Grid, Button, IconButton, Chip, Skeleton, Divider
} from '@mui/material';
import {
  ShoppingCart, CheckCircle, Add, Remove, FavoriteBorder, Favorite, Share,
  KeyboardArrowRight, Storefront
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { wishlistIds, toggleWishlist } = useAuth();
  
  const isWishlisted = product ? wishlistIds.includes(product._id) : false;

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
    toast.success(`Added to cart`, {
      style: { borderRadius: '12px', background: '#135788', color: '#fff', fontSize: '13px' }
    });
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}><Skeleton variant="rounded" sx={{ pt: '100%', borderRadius: '16px' }} /></Grid>
          <Grid item xs={12} md={6}>
            <Skeleton width={120} height={32} sx={{ mb: 2 }} />
            <Skeleton width="80%" height={40} sx={{ mb: 2 }} />
            <Skeleton width="40%" height={30} sx={{ mb: 3 }} />
            <Skeleton width="100%" height={80} sx={{ mb: 3 }} />
            <Skeleton width={180} height={48} sx={{ borderRadius: '24px' }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>Product Not Found</Typography>
          <Typography sx={{ color: '#64748b', mb: 4 }}>The product you're looking for doesn't exist.</Typography>
          <Button variant="contained" component={Link} to="/categories" endIcon={<KeyboardArrowRight />}
            sx={{ borderRadius: '24px' }}>Browse Products</Button>
        </Box>
      </Container>
    );
  }

  const images = product.images?.length > 0 ? product.images : ['https://placehold.co/600x600/f8fafc/94a3b8?text=Product'];
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Grid container spacing={{ xs: 3, md: 5 }}>
        {/* Image Gallery */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Box sx={{
              position: 'relative', borderRadius: '20px', overflow: 'hidden',
              backgroundColor: '#f8fafc', aspectRatio: '1'
            }}>
              <motion.img key={selectedImageIndex} src={images[selectedImageIndex]} alt={product.name}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {hasDiscount && (
                <Box sx={{
                  position: 'absolute', top: 16, left: 16, backgroundColor: '#D32F2F',
                  color: '#fff', fontWeight: 700, fontSize: '0.75rem', px: 1.5, py: 0.5, borderRadius: '10px'
                }}>-{discountPercent}%</Box>
              )}
              <IconButton onClick={handleWishlist} sx={{
                position: 'absolute', top: 16, right: 16, backgroundColor: isWishlisted ? '#fff' : 'rgba(255,255,255,0.9)',
                color: isWishlisted ? '#D32F2F' : 'inherit',
                width: 42, height: 42, '&:hover': { backgroundColor: '#fff', color: '#D32F2F' }
              }}>
                {isWishlisted ? <Favorite sx={{ color: '#D32F2F' }} /> : <FavoriteBorder />}
              </IconButton>
            </Box>
            {images.length > 1 && (
              <Box sx={{ display: 'flex', gap: 1.5, mt: 2, overflowX: 'auto', pb: 1 }}>
                {images.map((img, i) => (
                  <Box key={i} onClick={() => setSelectedImageIndex(i)} sx={{
                    width: 68, height: 68, borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', flexShrink: 0,
                    border: selectedImageIndex === i ? '2px solid #135788' : '2px solid transparent',
                    opacity: selectedImageIndex === i ? 1 : 0.5, transition: 'all 0.2s ease'
                  }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                ))}
              </Box>
            )}
          </motion.div>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            {product.category?.name && (
              <Chip label={product.category.name} component={Link} to={`/category/${product.category.slug}`} clickable
                sx={{
                  mb: 2, backgroundColor: 'rgba(19,87,136,0.08)', color: '#135788', fontWeight: 600,
                  '&:hover': { backgroundColor: 'rgba(19,87,136,0.12)' }
                }} />
            )}

            <Typography variant="h1" sx={{ mb: 2 }}>{product.name}</Typography>

            {/* Price */}
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 2, mb: 3,
              p: 2.5, borderRadius: '14px', backgroundColor: '#f8fafc', width: 'fit-content'
            }}>
              <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: '#135788' }}>₹{product.price}</Typography>
              {hasDiscount && (
                <>
                  <Typography sx={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '1.25rem' }}>₹{product.originalPrice}</Typography>
                  <Chip label={`Save ₹${product.originalPrice - product.price}`} size="small"
                    sx={{ backgroundColor: '#2E7D32', color: '#fff', fontWeight: 600 }} />
                </>
              )}
            </Box>

            {/* Stock */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <CheckCircle sx={{ fontSize: 20, color: product.inStock ? '#2E7D32' : '#94a3b8' }} />
              <Typography sx={{ fontWeight: 600, color: product.inStock ? '#2E7D32' : '#94a3b8', fontSize: '0.875rem' }}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Typography>
            </Box>

            {product.description && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 1 }}>Description</Typography>
                <Typography sx={{ color: '#64748b', lineHeight: 1.7 }}>{product.description}</Typography>
              </Box>
            )}

            {product.inStock && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4, pt: 3, borderTop: '1px solid #f1f5f9' }}>
                <Box sx={{
                  display: 'flex', alignItems: 'center', border: '1.5px solid #e2e8f0', borderRadius: '12px',
                  '&:hover': { borderColor: '#135788' }
                }}>
                  <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}><Remove /></IconButton>
                  <Typography sx={{ px: 2, fontWeight: 600, minWidth: 40, textAlign: 'center' }}>{quantity}</Typography>
                  <IconButton onClick={() => setQuantity(quantity + 1)}><Add /></IconButton>
                </Box>
                <Button variant="contained" size="large" startIcon={<ShoppingCart />} onClick={handleAddToCart}
                  sx={{
                    flex: { xs: '1 1 100%', sm: '1 1 auto' }, borderRadius: '24px', py: 1.5, px: 4,
                    fontWeight: 700, boxShadow: '0 4px 16px rgba(19,87,136,0.3)'
                  }}>
                  Add to Cart
                </Button>
                <IconButton onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }}
                  sx={{ width: 48, height: 48, border: '1.5px solid #e2e8f0', '&:hover': { borderColor: '#135788' } }}>
                  <Share />
                </IconButton>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2.5, borderRadius: '14px', backgroundColor: '#f8fafc' }}>
              <Storefront sx={{ color: '#cf7c1e', fontSize: 24 }} />
              <Box>
                <Typography sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>Sold by</Typography>
                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Machhenarayan Mart</Typography>
              </Box>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
