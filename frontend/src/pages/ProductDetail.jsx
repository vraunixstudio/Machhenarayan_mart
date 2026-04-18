import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Skeleton,
  Chip,
  IconButton
} from '@mui/material';
import {
  ShoppingBasket,
  CheckCircle,
  Cancel,
  Add,
  Remove,
  ShoppingCart
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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton width={200} height={40} />
            <Skeleton width={150} height={30} />
            <Skeleton width="100%" height={100} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h5">Product not found</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="400"
                image={product.images?.[0] || 'https://via.placeholder.com/400'}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Chip
                label={product.category?.name}
                component={Link}
                to={`/category/${product.category?.slug}`}
                clickable
                color="primary"
                variant="outlined"
                size="small"
              />
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700 }}>
                ₹{product.price}
              </Typography>
              {product.originalPrice && (
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  ₹{product.originalPrice}
                </Typography>
              )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              {product.inStock ? (
                <CheckCircle color="success" />
              ) : (
                <Cancel color="error" />
              )}
              <Typography
                variant="body1"
                color={product.inStock ? 'success.main' : 'error.main'}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Typography>
            </Box>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {product.description || 'No description available.'}
            </Typography>

            {product.isFeatured && (
              <Chip
                label="Featured"
                color="secondary"
                icon={<ShoppingBasket />}
                sx={{ mb: 2 }}
              />
            )}

            {product.inStock && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1 }}>
                  <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))} size="small">
                    <Remove />
                  </IconButton>
                  <Typography sx={{ px: 2, minWidth: 40, textAlign: 'center' }}>{quantity}</Typography>
                  <IconButton onClick={() => setQuantity(quantity + 1)} size="small">
                    <Add />
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={() => {
                    addToCart(product, quantity);
                    toast.success(`Added ${quantity} ${product.name} to cart!`);
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            )}

            {!product.inStock && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                This product is currently out of stock.
              </Typography>
            )}
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default ProductDetail;