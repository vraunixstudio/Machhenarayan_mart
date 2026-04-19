import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Button, Paper, Divider, Skeleton, Chip, Avatar } from '@mui/material';
import { Person, Logout, ShoppingBag, Favorite, ArrowForward, LocalMall } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { orderAPI, wishlistAPI } from '../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [ordersRes, wishlistRes] = await Promise.all([
          orderAPI.getMyOrders(),
          wishlistAPI.getWishlist()
        ]);
        setOrders(ordersRes.data.orders || []);
        setWishlistCount(wishlistRes.data.wishlist?.length || 0);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleLogout = async () => { await logout(); navigate('/'); };

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: <ShoppingBag sx={{ color: '#135788' }} />, color: 'rgba(19,87,136,0.08)' },
    { label: 'Wishlist Items', value: wishlistCount, icon: <Favorite sx={{ color: '#cf7c1e' }} />, color: 'rgba(207,124,30,0.08)' },
    { label: 'Member Since', value: new Date(user?.createdAt || Date.now()).getFullYear(), icon: <Person sx={{ color: '#64748b' }} />, color: 'rgba(100,116,139,0.08)' }
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#fafbfc', minHeight: '80vh' }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
            <Box>
              <Typography variant="h1" sx={{ mb: 1 }}>Welcome back, {user?.name.split(' ')[0]}!</Typography>
              <Typography sx={{ color: '#64748b' }}>Here is what is happening with your account today.</Typography>
            </Box>
            <Button variant="outlined" color="error" startIcon={<Logout />} onClick={handleLogout} sx={{ borderRadius: '24px' }}>
              Logout
            </Button>
          </Box>

          <Grid container spacing={3} sx={{ mb: 5 }}>
            {stats.map((stat, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 2.5 }}>
                  <Box sx={{ width: 50, height: 50, borderRadius: '15px', backgroundColor: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>{stat.value}</Typography>
                    <Typography sx={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>{stat.label}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={4}>
            {/* Recent Orders */}
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h4">Recent Orders</Typography>
                  <Button component={Link} to="/orders" endIcon={<ArrowForward />} sx={{ fontSize: '0.8125rem' }}>View all</Button>
                </Box>
                
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} height={80} sx={{ mb: 1, borderRadius: '12px' }} />)
                ) : orders.length > 0 ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {orders.slice(0, 3).map((order) => (
                      <Box key={order._id} sx={{ p: 2, borderRadius: '16px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ p: 1, bgcolor: '#f8fafc', borderRadius: '10px' }}><LocalMall sx={{ color: '#135788', fontSize: 20 }} /></Box>
                          <Box>
                            <Typography sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Order #{order._id.slice(-6).toUpperCase()}</Typography>
                            <Typography sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>{new Date(order.createdAt).toLocaleDateString()}</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography sx={{ fontWeight: 700, mb: 0.5 }}>₹{order.totalPrice}</Typography>
                          <Chip label={order.status} size="small" sx={{ fontSize: '0.65rem', height: 20, textTransform: 'uppercase', fontWeight: 800 }} />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 5 }}>
                    <Typography sx={{ color: '#94a3b8', mb: 2 }}>You haven't placed any orders yet.</Typography>
                    <Button variant="contained" component={Link} to="/shop" sx={{ borderRadius: '20px' }}>Start Shopping</Button>
                  </Box>
                )}
              </Paper>
            </Grid>

            {/* Account Settings Shortcut */}
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #f1f5f9', height: '100%', bgcolor: '#135788', color: '#fff' }}>
                <Typography variant="h4" sx={{ color: '#fff', mb: 3 }}>Quick Access</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button component={Link} to="/profile" startIcon={<Person />} 
                    sx={{ justifyContent: 'flex-start', color: '#fff', py: 1.5, px: 2, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                    Profile Settings
                  </Button>
                  <Button component={Link} to="/wishlist" startIcon={<Favorite />} 
                    sx={{ justifyContent: 'flex-start', color: '#fff', py: 1.5, px: 2, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                    My Wishlist
                  </Button>
                </Box>
                <Box sx={{ mt: 5, p: 3, borderRadius: '20px', bgcolor: 'rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, bgcolor: '#cf7c1e', fontSize: '1.5rem', fontWeight: 800 }}>{user?.name.charAt(0)}</Avatar>
                  <Typography sx={{ fontWeight: 700 }}>{user?.name}</Typography>
                  <Typography sx={{ fontSize: '0.75rem', opacity: 0.7 }}>{user?.email}</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Dashboard;