import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0d1b2e' }}>
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          backgroundColor: '#ffffff',
          borderRadius: { xs: '24px 24px 0 0', md: '32px 32px 0 0' },
          mt: { xs: '64px', md: '72px' },
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;