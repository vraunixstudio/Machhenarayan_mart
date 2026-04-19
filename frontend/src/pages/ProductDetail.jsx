import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box, Container, Typography, Grid, Button, IconButton, Chip, Skeleton, Divider,
  Rating, TextField, Avatar, Paper
} from '@mui/material';
import {
  ShoppingCart, CheckCircle, Add, Remove, FavoriteBorder, Favorite, Share,
  KeyboardArrowRight, Storefront, Star
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { productAPI, reviewAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  
  const { addToCart } = useCart();
  const { wishlistIds, toggleWishlist, isAuthenticated, user: currentUser } = useAuth();
  
  const isWishlisted = product ? wishlistIds.includes(product._id) : false;

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        setLoading(true);
        const productRes = await productAPI.getProductBySlug(slug);
        const prod = productRes.data.product;
        setProduct(prod);
        
        const reviewsRes = await reviewAPI.getProductReviews(prod._id);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductAndReviews();
  }, [slug]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to leave a review');
      return;
    }
    if (!reviewComment.trim()) {
      toast.error('Please add a comment');
      return;
    }

    try {
      setSubmittingReview(true);
      const res = await reviewAPI.createReview({
        product: product._id,
        rating: reviewRating,
        comment: reviewComment
      });
      setReviews([ { ...res.data, user: currentUser }, ...reviews ]);
      setReviewComment('');
      setReviewRating(5);
      toast.success('Thank you for your review!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to post review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}><Skeleton variant="rounded" sx={{ pt: '100%', borderRadius: '16px' }} /></Grid>
          <Grid item xs={12} md={6}>
            <Skeleton width={120} height={32} sx={{ mb: 2 }} />
            <Skeleton width="80%" height={40} sx={{ mb: 2 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!product) return null;

  const images = product.images?.length > 0 ? product.images : ['https://placehold.co/600x600/f8fafc/94a3b8?text=Product'];
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const avgRating = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : 0;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Grid container spacing={{ xs: 3, md: 5 }}>
        {/* Gallery */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', backgroundColor: '#f8fafc', aspectRatio: '1' }}>
            <motion.img key={selectedImageIndex} src={images[selectedImageIndex]} alt={product.name}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {hasDiscount && <Box sx={{ position: 'absolute', top: 20, left: 20, bgcolor: '#D32F2F', color: '#fff', px: 1.5, py: 0.5, borderRadius: '8px', fontWeight: 700 }}>-{discountPercent}%</Box>}
            <IconButton onClick={handleWishlist} sx={{ position: 'absolute', top: 20, right: 20, bgcolor: '#fff' }}>
              {isWishlisted ? <Favorite sx={{ color: '#D32F2F' }} /> : <FavoriteBorder />}
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, mt: 2, overflowX: 'auto' }}>
            {images.map((img, i) => (
              <Box key={i} onClick={() => setSelectedImageIndex(i)} sx={{ width: 70, height: 70, borderRadius: '12px', border: selectedImageIndex === i ? '2px solid #135788' : '2px solid transparent', cursor: 'pointer', overflow: 'hidden' }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Info */}
        <Grid item xs={12} md={6}>
          <Chip label={product.category?.name} sx={{ mb: 2, bgcolor: 'rgba(19,87,136,0.08)', color: '#135788', fontWeight: 600 }} />
          <Typography variant="h1" sx={{ mb: 1 }}>{product.name}</Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <Rating value={Number(avgRating)} readOnly precision={0.5} size="small" />
            <Typography variant="body2" sx={{ color: '#64748b' }}>({reviews.length} reviews)</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, bgcolor: '#f8fafc', p: 3, borderRadius: '20px', width: 'fit-content' }}>
            <Typography sx={{ fontSize: '2.25rem', fontWeight: 800, color: '#135788' }}>₹{product.price}</Typography>
            {hasDiscount && <Typography sx={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '1.25rem' }}>₹{product.originalPrice}</Typography>}
          </Box>

          <Typography variant="h5" sx={{ mb: 1.5 }}>Description</Typography>
          <Typography sx={{ color: '#64748b', mb: 4 }}>{product.description}</Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e2e8f0', borderRadius: '12px' }}>
              <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}><Remove /></IconButton>
              <Typography sx={{ px: 2, fontWeight: 700 }}>{quantity}</Typography>
              <IconButton onClick={() => setQuantity(quantity + 1)}><Add /></IconButton>
            </Box>
            <Button variant="contained" size="large" startIcon={<ShoppingCart />} onClick={handleAddToCart}
              sx={{ borderRadius: '24px', px: 4, py: 1.5, fontWeight: 700 }}>Add to Cart</Button>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Reviews Section */}
          <Typography variant="h4" sx={{ mb: 3 }}>Customer Reviews</Typography>
          
          {isAuthenticated ? (
            <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: '16px', mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Write a review</Typography>
              <form onSubmit={handleReviewSubmit}>
                <Box sx={{ mb: 2 }}>
                  <Rating value={reviewRating} onChange={(_, val) => setReviewRating(val)} />
                </Box>
                <TextField fullWidth multiline rows={3} placeholder="Share your thoughts..." 
                  value={reviewComment} onChange={(e) => setReviewComment(e.target.value)}
                  sx={{ bgcolor: '#fff', mb: 2 }} />
                <Button variant="contained" type="submit" disabled={submittingReview} sx={{ borderRadius: '24px' }}>
                  {submittingReview ? 'Posting...' : 'Post Review'}
                </Button>
              </form>
            </Paper>
          ) : (
            <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: '16px', mb: 4, textAlign: 'center' }}>
              <Typography sx={{ color: '#64748b' }}>Please <Link to="/login" style={{ color: '#135788', fontWeight: 600 }}>Login</Link> to write a review.</Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {reviews.map((r) => (
              <Box key={r._id}>
                <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: '#cf7c1e' }}>{r.user?.name?.charAt(0)}</Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>{r.user?.name}</Typography>
                    <Rating value={r.rating} readOnly size="small" />
                  </Box>
                  <Typography variant="caption" sx={{ ml: 'auto', color: '#94a3b8' }}>{dayjs(r.createdAt).fromNow ? dayjs(r.createdAt).format('MMM D') : 'Just now'}</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#334155', ml: 7 }}>{r.comment}</Typography>
              </Box>
            ))}
            {reviews.length === 0 && <Typography align="center" sx={{ color: '#94a3b8', py: 2 }}>No reviews yet. Be the first!</Typography>}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
