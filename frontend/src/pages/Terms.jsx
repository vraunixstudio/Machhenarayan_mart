import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Terms & Conditions
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          By using Machhenarayan Mart, you agree to these terms.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>1. Acceptance of Terms</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          By accessing and using this website, you accept and agree to be bound by the terms.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>2. Privacy Policy</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          We are committed to protecting your privacy. Your personal information is secure with us.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>3. User Account</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          You are responsible for maintaining the confidentiality of your account credentials.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>4. Product Information</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          We strive to provide accurate product information. Prices subject to change without notice.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>5. Ordering</Typography>
        <Typography variant="body2" color="text.secondary">
          Orders are subject to availability. We reserve the right to refuse any order.
        </Typography>
      </motion.div>
    </Container>
  );
};

export default Terms;