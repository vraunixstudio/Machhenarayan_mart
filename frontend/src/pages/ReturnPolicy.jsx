import { Box, Container, Typography } from '@mui/material';
import { AssignmentReturn } from '@mui/icons-material';
import { motion } from 'framer-motion';

const policies = [
  'Returns accepted within 24 hours of delivery',
  'Products must be in original condition with packaging',
  'Perishable items (fruits, vegetables, dairy) cannot be returned',
  'Contact us before returning any item',
  'Refund will be processed within 5-7 business days'
];

const ReturnPolicy = () => {
  return (
    <Box sx={{ py: { xs: 5, md: 8 } }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Box sx={{ display: 'inline-flex', p: 2, borderRadius: '50%', backgroundColor: '#f8fafc', mb: 2 }}>
              <AssignmentReturn sx={{ fontSize: 32, color: '#135788' }} />
            </Box>
            <Typography variant="h1">Return & Refund Policy</Typography>
          </Box>

          <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px', border: '1px solid #f1f5f9', mb: 4 }}>
            <Typography sx={{ color: '#64748b', lineHeight: 1.7, mb: 3 }}>
              At Machhenarayan Mart, we want you to be completely satisfied with your purchase.
            </Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>Return Guidelines</Typography>
            {policies.map((p, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#cf7c1e', mt: 0.8, flexShrink: 0 }} />
                <Typography sx={{ color: '#64748b', fontSize: '0.875rem' }}>{p}</Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px', backgroundColor: '#f8fafc' }}>
            <Typography variant="h5" sx={{ mb: 1.5 }}>How to Return</Typography>
            <Typography sx={{ color: '#64748b', lineHeight: 1.7 }}>
              Contact our customer support within 24 hours to initiate a return. We'll schedule a pickup at your convenience.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ReturnPolicy;