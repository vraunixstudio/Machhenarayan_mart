import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { LocalShipping, ShoppingCart } from '@mui/icons-material';
import { motion } from 'framer-motion';

const OrderHistory = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Order History
        </Typography>

        <Card sx={{ p: 4, textAlign: 'center' }}>
          <LocalShipping sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 2 }}>Order History Coming Soon!</Typography>
          <Typography variant="body1" color="text.secondary">
            Track your orders and view order history here.
          </Typography>
        </Card>
      </motion.div>
    </Container>
  );
};

export default OrderHistory;