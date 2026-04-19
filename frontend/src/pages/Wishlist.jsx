import { Box, Container, Typography, Button } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Wishlist = () => {
  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'inline-flex', p: 3, borderRadius: '50%', backgroundColor: '#fdf2e4', mb: 3 }}>
              <Favorite sx={{ fontSize: 48, color: '#cf7c1e' }} />
            </Box>
            <Typography variant="h2" sx={{ mb: 1 }}>Wishlist Coming Soon!</Typography>
            <Typography sx={{ color: '#64748b', mb: 4 }}>
              Save your favourite products for later. We're working on this feature!
            </Typography>
            <Button variant="contained" onClick={() => toast.success('We\'ll notify you!')}
              sx={{ borderRadius: '24px', px: 4 }}>Get Notified</Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Wishlist;