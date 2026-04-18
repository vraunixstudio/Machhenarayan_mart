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
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingBasket,
  Dashboard,
  Person,
  ExitToApp,
  AdminPanelSettings,
  Close as CloseIcon
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    }
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Categories', path: '/categories' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <ShoppingBasket sx={{ fontSize: 28 }} />
            {!isMobile && 'Machhenarayan'}
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: location.pathname === link.path ? 'primary.main' : 'text.primary',
                    fontWeight: location.pathname === link.path ? 600 : 400
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                position: 'relative',
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.12)
                },
                width: { xs: 'auto', md: 300 },
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              <InputBase
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  pl: 2,
                  pr: 4,
                  py: 0.5,
                  width: '100%'
                }}
              />
              <IconButton
                type="submit"
                sx={{ position: 'absolute', right: 4 }}
              >
                <SearchIcon />
              </IconButton>
            </Box>

            <IconButton
              onClick={handleMenuOpen}
              sx={{ ml: 1 }}
            >
              {isAuthenticated ? (
                <Person />
              ) : (
                <Button variant="contained" size="small">
                  Login
                </Button>
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { mt: 1, minWidth: 180 }
        }}
      >
        {isAuthenticated ? (
          <>
            <MenuItem
              component={Link}
              to="/dashboard"
              onClick={handleMenuClose}
            >
              <Dashboard sx={{ mr: 1 }} /> Dashboard
            </MenuItem>
            {isAdmin && (
              <MenuItem
                component={Link}
                to="/admin"
                onClick={handleMenuClose}
              >
                <AdminPanelSettings sx={{ mr: 1 }} /> Admin
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout}>
              <ExitToApp sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              component={Link}
              to="/login"
              onClick={handleMenuClose}
            >
              Login
            </MenuItem>
            <MenuItem
              component={Link}
              to="/register"
              onClick={handleMenuClose}
            >
              Register
            </MenuItem>
          </>
        )}
      </Menu>

      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: { width: 280 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.path}
                component={Link}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                sx={{
                  color: location.pathname === link.path ? 'primary.main' : 'text.primary'
                }}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: 'flex',
              p: 2,
              gap: 1,
              borderTop: 1,
              borderColor: 'divider'
            }}
          >
            <InputBase
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flex: 1, border: 1, borderColor: 'divider', borderRadius: 1, px: 2 }}
            />
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;