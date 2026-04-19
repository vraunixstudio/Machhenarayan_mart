import { Box, Container, Typography, Paper } from '@mui/material';
import { HourglassEmpty } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#fafbfc', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="xs">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: '24px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
            <Box sx={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
              <HourglassEmpty sx={{ fontSize: 32, color: '#d97706' }} />
            </Box>
            <Typography variant="h2" sx={{ mb: 2, fontWeight: 800 }}>Coming Soon</Typography>
            <Typography sx={{ color: '#64748b' }}>
              Password reset feature will be available shortly. Please contact support if you need assistance.
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ForgotPassword;