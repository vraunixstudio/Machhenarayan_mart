import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import ShoppingBasket from '@mui/icons-material/ShoppingBasket';
import Email from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';
import LocationOn from '@mui/icons-material/LocationOn';
import Instagram from '@mui/icons-material/Instagram';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const linkStyle = {
    color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem',
    textDecoration: 'none', transition: 'color 0.2s ease',
    display: 'block', py: 0.5
  };

  return (
    <Box component="footer" sx={{ backgroundColor: '#0d1b2e', color: '#fff', pt: { xs: 6, md: 8 }, pb: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: '2fr 1fr 1fr 1.5fr' },
          gap: { xs: 4, md: 6 }
        }}>
          {/* Brand */}
          <Box sx={{ gridColumn: { xs: 'span 2', md: 'span 1' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={{
                backgroundColor: '#cf7c1e', borderRadius: '10px', width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <ShoppingBasket sx={{ fontSize: 20, color: '#fff' }} />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: '1.125rem', lineHeight: 1.1 }}>Machhenarayan</Typography>
                <Typography sx={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>mart</Typography>
              </Box>
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem', lineHeight: 1.6, mb: 3 }}>
              Your trusted destination for fresh groceries and quality essentials.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <Box key={i} sx={{
                  width: 34, height: 34, borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  '&:hover': { backgroundColor: '#cf7c1e' }
                }}>
                  <Icon sx={{ fontSize: 16 }} />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', mb: 2, color: 'rgba(255,255,255,0.8)' }}>Quick Links</Typography>
            {[
              { label: 'Home', path: '/' }, { label: 'Catalogue', path: '/categories' },
              { label: 'About Us', path: '/about' }, { label: 'Contact', path: '/contact' }
            ].map((l) => (
              <Typography key={l.path} component={Link} to={l.path}
                sx={{ ...linkStyle, '&:hover': { color: '#cf7c1e' } }}>
                {l.label}
              </Typography>
            ))}
          </Box>

          {/* Support */}
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', mb: 2, color: 'rgba(255,255,255,0.8)' }}>Support</Typography>
            {[
              { label: 'FAQs', path: '/faq' }, { label: 'Return Policy', path: '/return-policy' },
              { label: 'Terms', path: '/terms' }
            ].map((l) => (
              <Typography key={l.path} component={Link} to={l.path}
                sx={{ ...linkStyle, '&:hover': { color: '#cf7c1e' } }}>
                {l.label}
              </Typography>
            ))}
          </Box>

          {/* Contact */}
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', mb: 2, color: 'rgba(255,255,255,0.8)' }}>Contact</Typography>
            {[
              { icon: <LocationOn sx={{ fontSize: 16 }} />, text: 'Machhenarayan Market' },
              { icon: <Phone sx={{ fontSize: 16 }} />, text: '+977 9800000000' },
              { icon: <Email sx={{ fontSize: 16 }} />, text: 'info@machhenarayanmart.com' }
            ].map((item, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Box sx={{ color: '#cf7c1e' }}>{item.icon}</Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem' }}>{item.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 4 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
            © {currentYear} Machhenarayan Mart. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography component={Link} to="/terms" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', '&:hover': { color: 'rgba(255,255,255,0.6)' } }}>Privacy</Typography>
            <Typography component={Link} to="/return-policy" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', '&:hover': { color: 'rgba(255,255,255,0.6)' } }}>Terms</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
