import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { ShoppingBasket, Category, People, Article, LocalShipping, ViewCarousel } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { productAPI, categoryAPI, userAPI, bannerAPI, orderAPI, reviewAPI, messageAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

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
    { title: 'Orders', value: stats.orders, icon: <LocalShipping />, link: '/admin/orders', color: '#cf7c1e', bg: 'rgba(207,124,30,0.1)' },
    { title: 'Products', value: stats.products, icon: <ShoppingBasket />, link: '/admin/products', color: '#135788', bg: 'rgba(19,87,136,0.1)' },
    { title: 'Categories', value: stats.categories, icon: <Category />, link: '/admin/categories', color: '#135788', bg: 'rgba(19,87,136,0.1)' },
    { title: 'Banners', value: stats.banners, icon: <ViewCarousel />, link: '/admin/banners', color: '#135788', bg: 'rgba(19,87,136,0.1)' },
  ];

  const chartData = [
    { name: 'Products', value: stats.products, color: '#135788' },
    { name: 'Categories', value: stats.categories * 10, color: '#cf7c1e' },
    { name: 'Users', value: stats.users * 5, color: '#10b981' },
    { name: 'Orders', value: stats.orders * 8, color: '#6366f1' },
  ];

  const COLORS = ['#135788', '#cf7c1e', '#10b981', '#6366f1', '#f59e0b'];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Box sx={{ mb: 5, p: { xs: 3, md: 4 }, borderRadius: '24px', backgroundColor: '#135788', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', backgroundColor: 'rgba(207,124,30,0.15)' }} />
          <Typography variant="h2" sx={{ color: '#fff', mb: 1, position: 'relative', zIndex: 1, fontWeight: 800 }}>
            Master Dashboard
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', position: 'relative', zIndex: 1 }}>
            Admin Control Center: Monitoring performance and data integrity.
          </Typography>
        </Box>

        {/* Quick Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box component={Link} to={stat.link} sx={{
                display: 'block', textDecoration: 'none', p: 3, borderRadius: '20px', border: '1px solid #f1f5f9',
                backgroundColor: '#fff', transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ width: 56, height: 56, borderRadius: '14px', backgroundColor: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

        {/* Graphical Analytics Section */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={8}>
            <Box sx={{ p: 4, borderRadius: '24px', backgroundColor: '#fff', border: '1px solid #f1f5f9', height: 400 }}>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Activity Trends</Typography>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#135788" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#135788" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#135788" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 4, borderRadius: '24px', backgroundColor: '#fff', border: '1px solid #f1f5f9', height: 400, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Platform Split</Typography>
              <Box sx={{ flexGrow: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ mt: 2 }}>
                {chartData.map((entry, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: COLORS[index], mr: 1 }} />
                    <Typography sx={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 500 }}>{entry.name}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Quick Management Links */}
        <Box sx={{ p: 4, borderRadius: '24px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>System Management</Typography>
          <Grid container spacing={2}>
            {[
              { label: 'Products', path: '/admin/products' },
              { label: 'Categories', path: '/admin/categories' },
              { label: 'Orders', path: '/admin/orders' },
              { label: 'Users', path: '/admin/users' },
              { label: 'Banners', path: '/admin/banners' },
              { label: 'Reviews', path: '/admin/reviews' },
              { label: 'Inquiries', path: '/admin/messages' }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Button fullWidth variant="outlined" component={Link} to={item.path}
                  sx={{ 
                    borderRadius: '16px', py: 1.5, borderColor: '#e2e8f0', color: '#1a1a2e',
                    backgroundColor: '#fff', fontWeight: 600,
                    '&:hover': { borderColor: '#135788', backgroundColor: '#fff', transform: 'translateY(-2px)' }
                  }}>
                  Manage {item.label}
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