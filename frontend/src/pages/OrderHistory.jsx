import { Box, Container, Typography } from '@mui/material';
import { LocalShipping } from '@mui/icons-material';
import { motion } from 'framer-motion';

const OrderHistory = () => {
  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'inline-flex', p: 3, borderRadius: '50%', backgroundColor: 'rgba(19,87,136,0.08)', mb: 3 }}>
              <LocalShipping sx={{ fontSize: 48, color: '#135788' }} />
            </Box>
            <Typography variant="h2" sx={{ mb: 1 }}>Order History Coming Soon!</Typography>
            <Typography sx={{ color: '#64748b' }}>
              Track your orders and view order history here.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default OrderHistory;