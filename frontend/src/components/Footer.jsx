import { Link } from 'react-router-dom';
import { Box, Container, Typography, Divider, useTheme } from '@mui/material';
import {
  ShoppingBasket,
  Email,
  Phone,
  LocationOn,
  Instagram,
  Facebook,
  Twitter
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#0A1628',
        color: 'white',
        pt: { xs: 8, md: 10 },
        pb: 4,
        mt: 'auto',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #0F5C8A 0%, #1E88E5 50%, #0F5C8A 100%)'
        }
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: { xs: 5, md: 6 }
          }}
        >
          {/* Brand Column */}
          <Box sx={{ gridColumn: { md: 'span 1' } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 2.5
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'primary.main',
                  borderRadius: 2,
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ShoppingBasket sx={{ fontSize: 22, color: 'white' }} />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  letterSpacing: '-0.02em'
                }}
              >
                Machhenarayan
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.7,
                lineHeight: 1.6,
                mb: 3,
                fontSize: '0.95rem'
              }}
            >
              Your trusted destination for fresh groceries and quality essentials delivered to your doorstep.
            </Typography>
            {/* Social Icons */}
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 2.5,
                fontSize: '1rem',
                letterSpacing: '0.02em'
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Link
                to="/"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.95rem',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                Home
              </Link>
              <Link
                to="/categories"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.95rem',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                Shop
              </Link>
              <Link
                to="/about"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.95rem',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.95rem',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                Contact
              </Link>
            </Box>
          </Box>

          {/* Customer Service */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 2.5,
                fontSize: '1rem',
                letterSpacing: '0.02em'
              }}
            >
              Customer Service
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Link
                to="/faq"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.95rem',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                FAQs
              </Link>
              <Link
                to="/return-policy"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.95rem',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                Returns
              </Link>
              <Link
                to="/terms"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.95rem',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                Terms of Service
              </Link>
            </Box>
          </Box>

          {/* Contact Info */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 2.5,
                fontSize: '1rem',
                letterSpacing: '0.02em'
              }}
            >
              Get in Touch
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LocationOn sx={{ fontSize: 18, opacity: 0.7 }} />
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.8,
                    fontSize: '0.95rem',
                    lineHeight: 1.4
                  }}
                >
                  Machhenarayan Market, District
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Phone sx={{ fontSize: 18, opacity: 0.7 }} />
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.8,
                    fontSize: '0.95rem'
                  }}
                >
                  +91 1234567890
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Email sx={{ fontSize: 18, opacity: 0.7 }} />
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.8,
                    fontSize: '0.95rem'
                  }}
                >
                  info@machhenarayanmart.com
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Bottom Bar */}
        <Divider
          sx={{
            my: 5,
            borderColor: 'rgba(255,255,255,0.08)'
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography
            variant="body2"
            sx={{
              opacity: 0.5,
              fontSize: '0.85rem'
            }}
          >
            © {currentYear} Machhenarayan Mart. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              to="/terms"
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.85rem',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '0.5'}
            >
              Privacy Policy
            </Link>
            <Link
              to="/return-policy"
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.85rem',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '0.5'}
            >
              Terms
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
