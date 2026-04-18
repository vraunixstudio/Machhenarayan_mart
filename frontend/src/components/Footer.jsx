import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, IconButton, Divider } from '@mui/material';
import {
  ShoppingBasket,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.dark',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <ShoppingBasket sx={{ fontSize: 32 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Machhenarayan Mart
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
              Your trusted destination for fresh groceries and quality essentials.
              We deliver the best products directly to your doorstep.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/" style={{ color: 'white', opacity: 0.8 }}>Home</Link>
              <Link to="/categories" style={{ color: 'white', opacity: 0.8 }}>Categories</Link>
              <Link to="/faq" style={{ color: 'white', opacity: 0.8 }}>FAQ</Link>
              <Link to="/about" style={{ color: 'white', opacity: 0.8 }}>About</Link>
              <Link to="/contact" style={{ color: 'white', opacity: 0.8 }}>Contact</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Policies
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/terms" style={{ color: 'white', opacity: 0.8 }}>Terms</Link>
              <Link to="/return-policy" style={{ color: 'white', opacity: 0.8 }}>Return Policy</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Machhenarayan Market, District
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  +91 1234567890
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  info@machhenarayanmart.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Store Hours
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
              Monday - Sunday: 7:00 AM - 9:00 PM
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              We deliver until 8:00 PM
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © {currentYear} Machhenarayan Mart. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;