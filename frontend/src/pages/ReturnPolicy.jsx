import { Box, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';

const ReturnPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Return & Refund Policy
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          At Machhenarayan Mart, we want you to be completely satisfied with your purchase.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Return Guidelines:</Typography>
        <List>
          <ListItem><ListItemText primary="• Returns accepted within 24 hours of delivery" /></ListItem>
          <ListItem><ListItemText primary="• Products must be in original condition with packaging" /></ListItem>
          <ListItem><ListItemText primary="• Perishable items (fruits, vegetables, dairy) cannot be returned" /></ListItem>
          <ListItem><ListItemText primary="• Contact us before returning any item" /></ListItem>
          <ListItem><ListItemText primary="• Refund will be processed within 5-7 business days" /></ListItem>
        </List>

        <Typography variant="h6" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>How to Return:</Typography>
        <Typography variant="body1" color="text.secondary">
          Contact our customer support within 24 hours to initiate a return. We'll schedule a pickup at your convenience.
        </Typography>
      </motion.div>
    </Container>
  );
};

export default ReturnPolicy;