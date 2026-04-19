import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';

import Search from '@mui/icons-material/Search';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Person from '@mui/icons-material/Person';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Dashboard from '@mui/icons-material/Dashboard';
import History from '@mui/icons-material/History';
import ExitToApp from '@mui/icons-material/ExitToApp';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import MenuIcon from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import Home from '@mui/icons-material/Home';
import Category from '@mui/icons-material/Category';
import Info from '@mui/icons-material/Info';
import ContactMail from '@mui/icons-material/ContactMail';
import ShoppingBasket from '@mui/icons-material/ShoppingBasket';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

import { productAPI } from '../services/api';

const Header = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searching, setSearching] = useState(false);

  const fetchRecommendations = async (q) => {
    if (q.length < 2) {
      setRecommendations([]);
      setShowDropdown(false);
      return;
    }
    try {
      setSearching(true);
      setShowDropdown(true);
      const res = await productAPI.getProducts({ search: q, limit: 5 });
      setRecommendations(res.data.products || []);
    } catch (e) {
      console.error(e);
    } finally {
      setSearching(false);
    }
  };

  const handleSearchChange = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    fetchRecommendations(q);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowDropdown(false);
    }
  };

  const handleSelectRecommendation = (slug) => {
    navigate(`/product/${slug}`);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    await logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'Shop', path: '/shop', icon: <Category fontSize="small" /> },
    { label: 'About', path: '/about', icon: <Info fontSize="small" /> },
    { label: 'Contact', path: '/contact', icon: <ContactMail fontSize="small" /> }
  ];

  return (
    <>
      {/* Fixed Header on dark navy background */}
      <Box
        sx={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100,
          backgroundColor: '#1a365d',
          height: { xs: 64, md: 72 }
        }}
      >
        <Box
          sx={{
            maxWidth: '1280px', mx: 'auto', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: { xs: 2, md: 4 }, gap: 2
          }}
        >
          {/* Logo */}
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img src="/text logo.png" alt="Machhenarayan Mart" style={{ height: '40px', objectFit: 'contain' }} />
          </Box>

          {/* Desktop Navigation Pills */}
          {!isMobile && (
            <Box sx={{
              display: 'flex', alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '28px',
              p: '4px', gap: '2px'
            }}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  component={Link} to={link.path}
                  startIcon={link.icon}
                  sx={{
                    borderRadius: '24px', px: 2.5, py: 0.8,
                    color: location.pathname === link.path ? '#fff' : 'rgba(255,255,255,0.6)',
                    backgroundColor: location.pathname === link.path ? '#135788' : 'transparent',
                    fontSize: '0.8125rem', fontWeight: 500,
                    '&:hover': {
                      backgroundColor: location.pathname === link.path ? '#135788' : 'rgba(255,255,255,0.06)',
                      color: '#fff'
                    }
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Right Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Search */}
            <Box
              component="form" onSubmit={handleSearch}
              sx={{
                display: { xs: 'none', sm: 'flex' }, alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '24px',
                px: 1.5, height: 40, width: 180, position: 'relative',
                transition: 'all 0.3s ease',
                '&:focus-within': {
                  backgroundColor: 'rgba(255,255,255,0.12)', width: 280
                }
              }}
            >
              <Search sx={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', mr: 1 }} />
              <InputBase
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
                sx={{ flex: 1, color: '#fff', fontSize: '0.8125rem', '& ::placeholder': { color: 'rgba(255,255,255,0.4)' } }}
              />

              {/* Recommendation Dropdown */}
              {showDropdown && (
                <Box sx={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
                  bgcolor: '#fff', borderRadius: '16px', py: 1,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                  zIndex: 1400, overflow: 'hidden'
                }}>
                  {searching ? (
                    <Typography sx={{ py: 2, px: 2, fontSize: '0.8125rem', color: '#64748b', textAlign: 'center' }}>Searching...</Typography>
                  ) : recommendations.length > 0 ? (
                    <>
                      {recommendations.map((item) => (
                        <Box key={item._id} component={Link} to={`/product/${item.slug}`} onClick={() => setShowDropdown(false)}
                          sx={{
                            display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1,
                            cursor: 'pointer', '&:hover': { bgcolor: '#f8fafc' },
                            textDecoration: 'none', color: 'inherit'
                          }}>
                          <Box sx={{ width: 36, height: 36, borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                            <img src={item.images?.[0] || 'https://placehold.co/40x40'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </Box>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography noWrap sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1a1a2e' }}>{item.name}</Typography>
                            <Typography sx={{ fontSize: '0.75rem', color: '#135788', fontWeight: 700 }}>₹{item.price}</Typography>
                          </Box>
                        </Box>
                      ))}
                      <Button fullWidth onClick={handleSearch} sx={{ py: 1, fontSize: '0.75rem', color: '#64748b', justifyContent: 'center' }}>
                        View all results
                      </Button>
                    </>
                  ) : (
                    <Typography sx={{ py: 2, px: 2, fontSize: '0.8125rem', color: '#64748b', textAlign: 'center' }}>No products found</Typography>
                  )}
                </Box>
              )}
            </Box>

            {/* Wishlist */}
            <IconButton
              component={Link} to="/wishlist"
              sx={{
                color: 'rgba(255,255,255,0.6)', width: 40, height: 40,
                backgroundColor: '#cf7c1e', borderRadius: '50%',
                '&:hover': { backgroundColor: '#a86318' }
              }}
            >
              <FavoriteBorder sx={{ fontSize: 18, color: '#fff' }} />
            </IconButton>

            {/* Cart */}
            <IconButton
              component={Link} to="/cart"
              sx={{
                color: 'rgba(255,255,255,0.6)', width: 40, height: 40,
                backgroundColor: '#cf7c1e', borderRadius: '50%',
                '&:hover': { backgroundColor: '#a86318' }
              }}
            >
              <Badge badgeContent={cartCount} color="error"
                sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', minWidth: 16, height: 16 } }}>
                <ShoppingCart sx={{ fontSize: 18, color: '#fff' }} />
              </Badge>
            </IconButton>

            {/* User */}
            <IconButton
              onClick={isAuthenticated ? (e) => setAnchorEl(e.currentTarget) : () => navigate('/login')}
              sx={{
                color: 'rgba(255,255,255,0.6)', width: 40, height: 40,
                backgroundColor: '#cf7c1e', borderRadius: '50%',
                '&:hover': { backgroundColor: '#a86318' }
              }}
            >
              <Person sx={{ fontSize: 18, color: '#fff' }} />
            </IconButton>

            {/* Mobile hamburger */}
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#fff' }}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>

      {/* User Dropdown */}
      <Menu
        anchorEl={anchorEl} open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { mt: 1, minWidth: 200, borderRadius: 3, boxShadow: '0 12px 40px rgba(0,0,0,0.12)', p: 0.5 } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isAuthenticated && (
          <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #f1f5f9' }}>
            <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8' }}>Signed in as</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{user?.name || user?.email}</Typography>
          </Box>
        )}
        <MenuItem component={Link} to="/dashboard" onClick={() => setAnchorEl(null)} sx={{ borderRadius: 2, fontSize: '0.8125rem', mt: 0.5 }}>
          <Dashboard sx={{ fontSize: 18, mr: 1.5, color: '#64748b' }} /> Dashboard
        </MenuItem>
        <MenuItem component={Link} to="/orders" onClick={() => setAnchorEl(null)} sx={{ borderRadius: 2, fontSize: '0.8125rem' }}>
          <History sx={{ fontSize: 18, mr: 1.5, color: '#64748b' }} /> Orders
        </MenuItem>
        {isAdmin && (
          <MenuItem component={Link} to="/admin" onClick={() => setAnchorEl(null)} sx={{ borderRadius: 2, fontSize: '0.8125rem' }}>
            <AdminPanelSettings sx={{ fontSize: 18, mr: 1.5, color: '#64748b' }} /> Admin Panel
          </MenuItem>
        )}
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleLogout} sx={{ borderRadius: 2, fontSize: '0.8125rem', color: '#D32F2F' }}>
          <ExitToApp sx={{ fontSize: 18, mr: 1.5 }} /> Logout
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right" open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, backgroundColor: '#1a365d', color: '#fff', borderRadius: '24px 0 0 24px' } }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Menu</Typography>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#fff' }}><Close /></IconButton>
          </Box>

          {/* Mobile search with recommendations */}
          <Box
            component="form" onSubmit={(e) => { handleSearch(e); setDrawerOpen(false); }}
            sx={{ position: 'relative', mb: 3 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', px: 2, py: 1 }}>
              <Search sx={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', mr: 1 }} />
              <InputBase
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
                sx={{ flex: 1, color: '#fff', fontSize: '0.875rem' }}
              />
            </Box>

            {showDropdown && recommendations.length > 0 && (
              <Box sx={{
                position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
                bgcolor: '#fff', borderRadius: '12px', overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)', zIndex: 1200
              }}>
                {recommendations.map((item) => (
                  <Box key={item._id} component={Link} to={`/product/${item.slug}`} onClick={() => { setShowDropdown(false); setDrawerOpen(false); }}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1,
                      cursor: 'pointer', '&:hover': { bgcolor: '#f1f5f9' },
                      textDecoration: 'none', color: 'inherit'
                    }}>
                    <Box sx={{ width: 32, height: 32, borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={item.images?.[0] || 'https://placehold.co/32x32'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    <Typography noWrap sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1a1a2e' }}>{item.name}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          <List sx={{ mb: 2 }}>
            {[{ label: 'Home', path: '/', icon: <Home /> }, ...navLinks].map((link) => (
              <ListItem key={link.path} component={Link} to={link.path}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  borderRadius: 2, mb: 0.5, py: 1.5,
                  backgroundColor: location.pathname === link.path ? 'rgba(19,87,136,0.2)' : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' }
                }}>
                <ListItemIcon sx={{ minWidth: 36, color: location.pathname === link.path ? '#cf7c1e' : 'rgba(255,255,255,0.5)' }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.label} primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: location.pathname === link.path ? 600 : 400 }} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', my: 2 }} />

          {isAuthenticated ? (
            <Button fullWidth variant="outlined" onClick={() => { handleLogout(); setDrawerOpen(false); }}
              sx={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 3 }}>
              Logout
            </Button>
          ) : (
            <Button fullWidth variant="contained" component={Link} to="/login"
              onClick={() => setDrawerOpen(false)}
              sx={{ borderRadius: 3, backgroundColor: '#135788' }}>
              Login
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
