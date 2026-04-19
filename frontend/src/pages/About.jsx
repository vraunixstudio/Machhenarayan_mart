import { Box, Container, Typography, Grid } from '@mui/material';
import { ShoppingBasket, Store, LocalShipping } from '@mui/icons-material';
import { motion } from 'framer-motion';

const features = [
  { icon: <ShoppingBasket sx={{ fontSize: 40, color: '#135788' }} />, title: 'Fresh Products', desc: 'We source our products fresh from local farms every day.' },
  { icon: <Store sx={{ fontSize: 40, color: '#cf7c1e' }} />, title: 'Quality Guaranteed', desc: 'We ensure the highest quality standards for all products.' },
  { icon: <LocalShipping sx={{ fontSize: 40, color: '#135788' }} />, title: 'Fast Delivery', desc: 'Quick and reliable delivery to your doorstep.' }
];

const About = () => {
  return (
    <Box sx={{ py: { xs: 5, md: 8 } }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Hero */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h1" sx={{ mb: 2 }}>
              About <Box component="span" sx={{ color: '#cf7c1e' }}>Machhenarayan Mart</Box>
            </Typography>
            <Typography sx={{ color: '#64748b', fontSize: '1rem', maxWidth: 600, mx: 'auto', lineHeight: 1.7 }}>
              Your trusted destination for fresh groceries and quality essentials delivered to your doorstep.
            </Typography>
          </Box>

          {/* Our Story */}
          <Box sx={{
            p: { xs: 3, md: 5 }, borderRadius: '16px', backgroundColor: '#f8fafc',
            border: '1px solid #f1f5f9', mb: 6
          }}>
            <Typography variant="h3" sx={{ mb: 2 }}>Our Story</Typography>
            <Typography sx={{ color: '#64748b', lineHeight: 1.7, mb: 2 }}>
              Machhenarayan Mart is committed to providing the best quality products directly from local farms and trusted suppliers to your doorstep.
            </Typography>
            <Typography sx={{ color: '#64748b', lineHeight: 1.7 }}>
              Our mission is to make fresh, quality groceries accessible to everyone. We believe in supporting local farmers and providing our customers with the freshest produce possible.
            </Typography>
          </Box>

          {/* Features */}
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 4 }}>Why Choose Us</Typography>
          <Grid container spacing={3}>
            {features.map((f, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Box sx={{
                  textAlign: 'center', p: 4, borderRadius: '16px',
                  backgroundColor: '#fff', border: '1px solid #f1f5f9',
                  transition: 'all 0.3s ease', height: '100%',
                  '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.06)', transform: 'translateY(-2px)' }
                }}>
                  <Box sx={{ mb: 2, display: 'inline-flex', p: 2, borderRadius: '14px', backgroundColor: '#f8fafc' }}>
                    {f.icon}
                  </Box>
                  <Typography variant="h5" sx={{ mb: 1 }}>{f.title}</Typography>
                  <Typography sx={{ color: '#64748b', fontSize: '0.875rem' }}>{f.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;