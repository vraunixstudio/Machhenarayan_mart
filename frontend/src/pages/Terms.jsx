import { Box, Container, Typography } from '@mui/material';
import { Gavel } from '@mui/icons-material';
import { motion } from 'framer-motion';

const sections = [
  { title: '1. Acceptance of Terms', body: 'By accessing and using this website, you accept and agree to be bound by the terms.' },
  { title: '2. Privacy Policy', body: 'We are committed to protecting your privacy. Your personal information is secure with us.' },
  { title: '3. User Account', body: 'You are responsible for maintaining the confidentiality of your account credentials.' },
  { title: '4. Product Information', body: 'We strive to provide accurate product information. Prices subject to change without notice.' },
  { title: '5. Ordering', body: 'Orders are subject to availability. We reserve the right to refuse any order.' }
];

const Terms = () => {
  return (
    <Box sx={{ py: { xs: 5, md: 8 } }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Box sx={{ display: 'inline-flex', p: 2, borderRadius: '50%', backgroundColor: '#f8fafc', mb: 2 }}>
              <Gavel sx={{ fontSize: 32, color: '#135788' }} />
            </Box>
            <Typography variant="h1">Terms & Conditions</Typography>
          </Box>

          <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px', border: '1px solid #f1f5f9' }}>
            <Typography sx={{ color: '#64748b', mb: 4 }}>
              By using Machhenarayan Mart, you agree to these terms.
            </Typography>
            {sections.map((s, i) => (
              <Box key={i} sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ mb: 1 }}>{s.title}</Typography>
                <Typography sx={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.7 }}>{s.body}</Typography>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Terms;