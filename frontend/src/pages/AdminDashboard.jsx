import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { ShoppingBasket, Category, People, Article, LocalShipping } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { productAPI, categoryAPI, userAPI, bannerAPI, orderAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ products: 0, categories: 0, users: 0, banners: 0, orders: 0, reviews: 0, messages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes, usersRes, bannersRes, ordersRes, reviewsRes, messagesRes] = await Promise.all([
          productAPI.getProducts({ limit: 1 }),
          categoryAPI.getCategories(),
          userAPI.getUsers(),
          bannerAPI.getBanners(),
          orderAPI.getAllOrders(),
          reviewAPI.getAllReviews(),
          messageAPI.getMessages()
        ]);
        setStats({
          products: productsRes.data.total || 0,
          categories: categoriesRes.data.count || categoriesRes.data.categories?.length || 0,
          users: usersRes.data.count || usersRes.data.users?.length || 0,
          banners: bannersRes.data.count || bannersRes.data.banners?.length || 0,
          orders: ordersRes.data.orders?.length || 0,
          reviews: reviewsRes.data?.length || 0,
          messages: messagesRes.data?.length || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Orders', value: stats.orders, icon: <LocalShipping sx={{ fontSize: 32 }} />, link: '/admin/orders', color: '#cf7c1e', bg: 'rgba(207,124,30,0.1)' },
    { title: 'Products', value: stats.products, icon: <ShoppingBasket sx={{ fontSize: 32 }} />, link: '/admin/products', color: '#135788', bg: 'rgba(19,87,136,0.1)' },
    { title: 'Categories', value: stats.categories, icon: <Category sx={{ fontSize: 32 }} />, link: '/admin/categories', color: '#135788', bg: 'rgba(19,87,136,0.1)' },
    { title: 'Users', value: stats.users, icon: <People sx={{ fontSize: 32 }} />, link: '/admin/users', color: '#64748b', bg: '#f1f5f9' },
    { title: 'Reviews', value: stats.reviews, icon: <motion.div whileHover={{ scale: 1.2 }}>⭐</motion.div>, link: '/admin/reviews', color: '#cf7c1e', bg: 'rgba(207,124,30,0.05)' },
    { title: 'Inquiries', value: stats.messages, icon: <motion.div whileHover={{ scale: 1.2 }}>✉️</motion.div>, link: '/admin/messages', color: '#135788', bg: 'rgba(19,87,136,0.05)' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Box sx={{ mb: 5, p: { xs: 3, md: 4 }, borderRadius: '20px', backgroundColor: '#135788', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', backgroundColor: 'rgba(207,124,30,0.15)' }} />
          <Typography variant="h2" sx={{ color: '#fff', mb: 1, position: 'relative', zIndex: 1 }}>
            Admin Dashboard
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', position: 'relative', zIndex: 1 }}>
            Welcome back, {user?.name}! Here's what's happening today.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box component={Link} to={stat.link} sx={{
                display: 'block', textDecoration: 'none', p: 3, borderRadius: '16px', border: '1px solid #f1f5f9',
                backgroundColor: '#fff', transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ width: 64, height: 64, borderRadius: '16px', backgroundColor: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h2" sx={{ fontWeight: 800, color: '#1a1a2e' }}>
                    {loading ? '...' : stat.value}
                  </Typography>
                </Box>
                <Typography sx={{ color: '#64748b', fontWeight: 600 }}>{stat.title}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, p: { xs: 3, md: 4 }, borderRadius: '16px', backgroundColor: '#f8fafc' }}>
          <Typography variant="h4" sx={{ mb: 3 }}>Quick Actions</Typography>
          <Grid container spacing={2}>
            {statCards.map((stat, index) => (
              <Grid item xs={12} sm={4} md={2.4} key={index}>
                <Button variant="contained" fullWidth component={Link} to={stat.link}
                  sx={{ borderRadius: '24px', py: 1.5, '&:hover': { boxShadow: '0 4px 16px rgba(19,87,136,0.3)' } }}>
                  Manage {stat.title.replace('Total ', '')}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default AdminDashboard;