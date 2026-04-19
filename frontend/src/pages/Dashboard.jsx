import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { Person, Settings, Logout, ShoppingCart, FavoriteBorder } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => { await logout(); navigate('/'); };

  const quickLinks = [
    { icon: <ShoppingCart sx={{ fontSize: 24 }} />, label: 'My Orders', path: '/orders', color: '#135788' },
    { icon: <FavoriteBorder sx={{ fontSize: 24 }} />, label: 'Wishlist', path: '/wishlist', color: '#cf7c1e' },
    { icon: <Settings sx={{ fontSize: 24 }} />, label: 'Settings', path: '/dashboard', color: '#64748b' }
  ];

  return (
    <Box sx={{ py: { xs: 5, md: 8 } }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h1" sx={{ mb: 5 }}>My Dashboard</Typography>

          {/* Profile Card */}
          <Box sx={{
            display: 'flex', alignItems: 'center', gap: 3, p: { xs: 3, md: 4 },
            borderRadius: '20px', backgroundColor: '#135788', color: '#fff', mb: 4
          }}>
            <Box sx={{
              width: 60, height: 60, borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Person sx={{ fontSize: 32, color: '#fff' }} />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#fff' }}>{user?.name}</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8125rem' }}>{user?.email}</Typography>
              <Typography sx={{ color: '#cf7c1e', fontSize: '0.75rem', fontWeight: 600, mt: 0.5, textTransform: 'capitalize' }}>
                {user?.role}
              </Typography>
            </Box>
          </Box>

          {/* Quick Links */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {quickLinks.map((link, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Box component={Link} to={link.path} sx={{
                  display: 'flex', alignItems: 'center', gap: 2, p: 3, borderRadius: '16px',
                  border: '1px solid #f1f5f9', textDecoration: 'none', color: 'inherit',
                  transition: 'all 0.3s ease',
                  '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.06)', transform: 'translateY(-2px)' }
                }}>
                  <Box sx={{ color: link.color }}>{link.icon}</Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{link.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Button variant="outlined" color="error" startIcon={<Logout />} onClick={handleLogout}
            sx={{ borderRadius: '24px' }}>
            Logout
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Dashboard;