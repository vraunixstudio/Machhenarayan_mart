import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Skeleton } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { wishlistAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await wishlistAPI.getWishlist();
        setWishlist(res.data.wishlist);
      } catch (error) {
        console.error('Failed to fetch wishlist', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Skeleton width={200} height={50} sx={{ mb: 4 }} />
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
            {[1, 2, 3, 4].map(i => (
              <Grid item xs={6} sm={4} md={3} key={i}>
                <Skeleton variant="rounded" height={280} sx={{ borderRadius: '16px' }} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 5, md: 8 }, minHeight: '70vh' }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h2" sx={{ mb: 4 }}>My Wishlist</Typography>

          {wishlist.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 10 }}>
              <Box sx={{ display: 'inline-flex', p: 3, borderRadius: '50%', backgroundColor: '#fdf2e4', mb: 3 }}>
                <Favorite sx={{ fontSize: 48, color: '#cf7c1e' }} />
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>Your wishlist is empty</Typography>
              <Typography sx={{ color: '#64748b' }}>
                Save your favourite products by clicking the heart icon.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
              {wishlist.map((product, i) => (
                <Grid item xs={6} sm={4} md={3} key={product._id}>
                  <ProductCard product={product} index={i} showQuickAdd />
                </Grid>
              ))}
            </Grid>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};

export default Wishlist;