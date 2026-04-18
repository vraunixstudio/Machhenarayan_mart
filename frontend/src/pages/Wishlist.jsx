import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { Favorite, ShoppingCart } from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Wishlist = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          My Wishlist
        </Typography>

        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Favorite sx={{ fontSize: 80, color: 'secondary.main', mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 2 }}>Wishlist Coming Soon!</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            We're working on your wishlist feature. Save your favorite products for later!
          </Typography>
          <Button variant="contained" onClick={() => toast.success('Coming soon!')}>
            Get Notified
          </Button>
        </Card>
      </motion.div>
    </Container>
  );
};

export default Wishlist;