import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, Button, IconButton, Divider, Alert } from '@mui/material';
import { Add, Remove, Delete, ShoppingCart, Lock } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, cartTotal, cartCount, updateQuantity, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="sm">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'inline-flex', p: 3, borderRadius: '50%', backgroundColor: '#f8fafc', mb: 3 }}>
                <ShoppingCart sx={{ fontSize: 48, color: '#94a3b8' }} />
              </Box>
              <Typography variant="h2" sx={{ mb: 1 }}>Your cart is empty</Typography>
              <Typography sx={{ color: '#64748b', mb: 4 }}>Add some products to get started!</Typography>
              <Button variant="contained" component={Link} to="/categories" sx={{ borderRadius: '24px', px: 4 }}>
                Continue Shopping
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h2" sx={{ mb: 4 }}>Shopping Cart ({cartCount} items)</Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              {cart.map((item) => (
                <Box key={item.productId} sx={{
                  display: 'flex', gap: { xs: 2, md: 3 }, mb: 2, p: 2,
                  borderRadius: '16px', border: '1px solid #f1f5f9',
                  transition: 'all 0.2s ease', '&:hover': { borderColor: '#e2e8f0' }
                }}>
                  <Box sx={{
                    width: { xs: 80, md: 100 }, height: { xs: 80, md: 100 }, flexShrink: 0,
                    borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f8fafc'
                  }}>
                    <img src={item.image || 'https://placehold.co/100x100/f8fafc/94a3b8?text=Item'} alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 0.5 }}>{item.name}</Typography>
                    <Typography sx={{ fontWeight: 700, color: '#135788', fontSize: '1rem' }}>₹{item.price * item.quantity}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <IconButton size="small" onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        sx={{ width: 28, height: 28, border: '1px solid #e2e8f0' }}><Remove sx={{ fontSize: 16 }} /></IconButton>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.8125rem', minWidth: 24, textAlign: 'center' }}>{item.quantity}</Typography>
                      <IconButton size="small" onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        sx={{ width: 28, height: 28, border: '1px solid #e2e8f0' }}><Add sx={{ fontSize: 16 }} /></IconButton>
                      <IconButton size="small" color="error" onClick={() => removeFromCart(item.productId)} sx={{ ml: 1 }}>
                        <Delete sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{
                position: 'sticky', top: 88, p: 3, borderRadius: '20px',
                border: '1px solid #f1f5f9', backgroundColor: '#fff'
              }}>
                <Typography variant="h4" sx={{ mb: 3 }}>Order Summary</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography sx={{ color: '#64748b' }}>Subtotal</Typography>
                  <Typography sx={{ fontWeight: 500 }}>₹{cartTotal}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography sx={{ color: '#64748b' }}>Shipping</Typography>
                  <Typography sx={{ fontWeight: 500, color: '#2E7D32' }}>Free</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography sx={{ fontWeight: 700 }}>Total</Typography>
                  <Typography sx={{ fontWeight: 800, color: '#135788', fontSize: '1.25rem' }}>₹{cartTotal}</Typography>
                </Box>
                <Alert severity="info" sx={{ mb: 2, borderRadius: '12px', fontSize: '0.8125rem' }}>
                  Payment integration coming soon!
                </Alert>
                <Button fullWidth variant="contained" size="large" startIcon={<Lock />}
                  sx={{ borderRadius: '24px', py: 1.5, mb: 2 }}>Coming Soon</Button>
                <Button fullWidth variant="outlined" onClick={clearCart}
                  sx={{ borderRadius: '24px' }}>Clear Cart</Button>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Cart;