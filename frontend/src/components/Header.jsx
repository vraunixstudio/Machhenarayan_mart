import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  Badge,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingBasket,
  Dashboard,
  Person,
  ExitToApp,
  AdminPanelSettings,
  Close as CloseIcon,
  ShoppingCart,
  Home,
  Category,
  Info,
  ContactMail,
  FavoriteBorder,
  History
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartCount } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchFocused(false);
    }
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', path: '/', icon: <Home sx={{ fontSize: 20 }} /> },
    { label: 'Categories', path: '/categories', icon: <Category sx={{ fontSize: 20 }} /> },
    { label: 'About', path: '/about', icon: <Info sx={{ fontSize: 20 }} /> },
    { label: 'Contact', path: '/contact', icon: <ContactMail sx={{ fontSize: 20 }} /> }
  ];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          color: 'text.primary'
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 2, md: 4 },
            py: { xs: 0.5, md: 1 }
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              color: 'primary.main'
            }}
          >
            <Box
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: 2,
                p: 0.75,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05) rotate(5deg)'
                }
              }}
            >
              <ShoppingBasket sx={{ fontSize: 24, color: 'white' }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.3rem', md: '1.5rem' },
                letterSpacing: '-0.02em',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Machhenarayan
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box
              component="nav"
              sx={{ display: 'flex', gap: 1 }}
            >
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  component={Link}
                  to={link.path}
                  startIcon={link.icon}
                  sx={{
                    color: location.pathname === link.path ? 'primary.main' : 'text.primary',
                    fontWeight: location.pathname === link.path ? 600 : 400,
                    position: 'relative',
                    py: 1,
                    px: 2,
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 4,
                      left: '50%',
                      transform: location.pathname === link.path ? 'translateX(-50%)' : 'translateX(-50%) scaleX(0)',
                      width: location.pathname === link.path ? '70%' : '0%',
                      height: 2,
                      backgroundColor: 'primary.main',
                      transition: 'transform 0.3s ease'
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(15, 92, 138, 0.04)',
                      '&::after': {
                        transform: 'translateX(-50%) scaleX(1)'
                      }
                    }
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Search */}
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                position: 'relative',
                display: { xs: 'none', sm: 'block' },
                transition: 'all 0.3s ease',
                width: searchFocused ? 320 : 200,
              }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            >
              <InputBase
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  pl: 3,
                  pr: 10,
                  py: { xs: 0.75, md: 1 },
                  width: '100%',
                  backgroundColor: alpha(theme.palette.primary.main, 0.06),
                  borderRadius: 3,
                  fontSize: { xs: '0.9rem', md: '0.95rem' },
                  transition: 'all 0.3s ease',
                  border: '1px solid transparent',
                  '&:focus': {
                    backgroundColor: 'white',
                    borderColor: 'primary.main',
                    boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`
                  }
                }}
              />
              <IconButton
                type="submit"
                sx={{
                  position: 'absolute',
                  right: 4,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
            </Box>

            {/* Mobile Search Icon */}
            <IconButton
              sx={{ display: { xs: 'flex', sm: 'none' } }}
              onClick={() => navigate('/search')}
            >
              <SearchIcon />
            </IconButton>

            {/* Cart */}
            <IconButton
              component={Link}
              to="/cart"
              sx={{
                position: 'relative',
                p: 1,
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  transform: 'scale(1.05)'
                }
              }}
            >
              <Badge
                badgeContent={cartCount}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.7rem',
                    minWidth: 20,
                    height: 20,
                    borderRadius: '10px'
                  }
                }}
              >
                <ShoppingCart sx={{ fontSize: 24 }} />
              </Badge>
            </IconButton>

            {/* User Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isAuthenticated ? (
                <>
                  <IconButton
                    component={Link}
                    to="/wishlist"
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      color: 'text.secondary',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.error.main, 0.08),
                        color: 'error.main'
                      }
                    }}
                  >
                    <FavoriteBorder />
                  </IconButton>
                  <IconButton
                    component={Link}
                    to="/dashboard"
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      color: 'text.secondary',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        color: 'primary.main'
                      }
                    }}
                  >
                    <History />
                  </IconButton>
                  <IconButton
                    onClick={handleMenuOpen}
                    sx={{
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      color: 'primary.main',
                      borderRadius: 2,
                      p: 0.5,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.15),
                        transform: 'scale(1.05)'
                      }
                    }}
                  >
                    <Person />
                  </IconButton>
                </>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  component={Link}
                  to="/login"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    fontWeight: 600,
                    borderRadius: 3,
                    py: 1,
                    px: 3,
                    boxShadow: '0 4px 12px rgba(15, 92, 138, 0.3)',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                      boxShadow: '0 6px 20px rgba(15, 92, 138, 0.4)',
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* User Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 180,
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {isAuthenticated ? (
          <>
            <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Signed in as
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, truncate: 1 }}>
                {user?.name || user?.email}
              </Typography>
            </Box>
            <MenuItem
              component={Link}
              to="/dashboard"
              onClick={handleMenuClose}
              sx={{ py: 1.5 }}
            >
              <ListItemIcon>
                <Dashboard fontSize="small" />
              </ListItemIcon>
              Dashboard
            </MenuItem>
            <MenuItem
              component={Link}
              to="/wishlist"
              onClick={handleMenuClose}
              sx={{ py: 1.5 }}
            >
              <ListItemIcon>
                <FavoriteBorder fontSize="small" />
              </ListItemIcon>
              Wishlist
            </MenuItem>
            <MenuItem
              component={Link}
              to="/orders"
              onClick={handleMenuClose}
              sx={{ py: 1.5 }}
            >
              <ListItemIcon>
                <History fontSize="small" />
              </ListItemIcon>
              Order History
            </MenuItem>
            {isAdmin && (
              <MenuItem
                component={Link}
                to="/admin"
                onClick={handleMenuClose}
                sx={{ py: 1.5 }}
              >
                <ListItemIcon>
                  <AdminPanelSettings fontSize="small" />
                </ListItemIcon>
                Admin Panel
              </MenuItem>
            )}
            <Divider />
            <MenuItem
              onClick={handleLogout}
              sx={{
                py: 1.5,
                color: 'error.main',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.error.main, 0.08)
                }
              }}
            >
              <ListItemIcon>
                <ExitToApp fontSize="small" color="error" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              component={Link}
              to="/login"
              onClick={handleMenuClose}
              sx={{ py: 1.5 }}
            >
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Login
            </MenuItem>
            <MenuItem
              component={Link}
              to="/register"
              onClick={handleMenuClose}
              sx={{ py: 1.5 }}
            >
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Create Account
            </MenuItem>
          </>
        )}
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            borderRadius: '0 16px 16px 0',
            boxShadow: '4px 0 32px rgba(0,0,0,0.12)'
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* Close Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Mobile Search */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 2,
              mb: 3,
              backgroundColor: alpha(theme.palette.primary.main, 0.06),
              borderRadius: 3
            }}
          >
            <InputBase
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flex: 1, pl: 1 }}
            />
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Navigation Links */}
          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.path}
                component={Link}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                sx={{
                  py: 1.5,
                  px: 2,
                  mb: 0.5,
                  borderRadius: 2,
                  color: location.pathname === link.path ? 'primary.main' : 'text.primary',
                  backgroundColor: location.pathname === link.path ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                  fontWeight: location.pathname === link.path ? 600 : 400,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.06)
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>

          {/* Mobile User Actions */}
          <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
            {isAuthenticated ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ px: 2, color: 'text.secondary', mb: 1 }}
                >
                  Signed in as
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ px: 2, mb: 2, fontWeight: 600 }}
                >
                  {user?.name || user?.email}
                </Typography>
                <ListItem
                  component={Link}
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  sx={{ borderRadius: 2, mb: 0.5 }}
                >
                  <ListItemIcon><Dashboard /></ListItemIcon>
                  Dashboard
                </ListItem>
                <ListItem
                  component={Link}
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  sx={{ borderRadius: 2, mb: 0.5 }}
                >
                  <ListItemIcon><FavoriteBorder /></ListItemIcon>
                  Wishlist
                </ListItem>
                <ListItem
                  component={Link}
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  sx={{ borderRadius: 2, mb: 0.5 }}
                >
                  <ListItemIcon><History /></ListItemIcon>
                  Order History
                </ListItem>
                {isAdmin && (
                  <ListItem
                    component={Link}
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    sx={{ borderRadius: 2, mb: 0.5 }}
                  >
                    <ListItemIcon><AdminPanelSettings /></ListItemIcon>
                    Admin Panel
                  </ListItem>
                )}
                <Divider sx={{ my: 1 }} />
                <ListItem
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  sx={{
                    borderRadius: 2,
                    color: 'error.main',
                    mt: 1
                  }}
                >
                  <ListItemIcon>
                    <ExitToApp color="error" />
                  </ListItemIcon>
                  Logout
                </ListItem>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <ListItem
                  component={Link}
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  sx={{ borderRadius: 2 }}
                >
                  <ListItemIcon><Person /></ListItemIcon>
                  Login
                </ListItem>
                <ListItem
                  component={Link}
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  sx={{ borderRadius: 2 }}
                >
                  <ListItemIcon><Person /></ListItemIcon>
                  Register
                </ListItem>
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
