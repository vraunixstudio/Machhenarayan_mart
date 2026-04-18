import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';
import {
  ShoppingBasket,
  Category,
  People,
  Article
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { productAPI, categoryAPI, userAPI, bannerAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    users: 0,
    banners: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes, usersRes, bannersRes] = await Promise.all([
          productAPI.getProducts({ limit: 1 }),
          categoryAPI.getCategories(),
          userAPI.getUsers(),
          bannerAPI.getBanners()
        ]);
        setStats({
          products: productsRes.data.total || 0,
          categories: categoriesRes.data.count || 0,
          users: usersRes.data.count || 0,
          banners: bannersRes.data.count || 0
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
    { title: 'Products', value: stats.products, icon: <ShoppingBasket />, link: '/admin/products', color: '#4CAF50' },
    { title: 'Categories', value: stats.categories, icon: <Category />, link: '/admin/categories', color: '#2196F3' },
    { title: 'Users', value: stats.users, icon: <People />, link: '/admin/users', color: '#FF9800' },
    { title: 'Banners', value: stats.banners, icon: <Article />, link: '/admin/banners', color: '#9C27B0' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Admin Dashboard
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Welcome, {user?.name}!
        </Typography>

        <Grid container spacing={3}>
          {statCards.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card
                component={Link}
                to={stat.link}
                sx={{
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: stat.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {loading ? '...' : stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Button
                variant="contained"
                fullWidth
                component={Link}
                to="/admin/products"
              >
                Manage Products
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                variant="contained"
                fullWidth
                component={Link}
                to="/admin/categories"
              >
                Manage Categories
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                variant="contained"
                fullWidth
                component={Link}
                to="/admin/banners"
              >
                Manage Banners
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                variant="contained"
                fullWidth
                component={Link}
                to="/admin/users"
              >
                Manage Users
              </Button>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default AdminDashboard;