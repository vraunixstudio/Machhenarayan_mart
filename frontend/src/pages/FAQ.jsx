import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore, HelpOutline } from '@mui/icons-material';
import { motion } from 'framer-motion';

const faqs = [
  { q: 'What are your delivery hours?', a: 'We deliver from 7:00 AM to 9:00 PM daily.' },
  { q: 'Is there a minimum order value?', a: 'No minimum order required. We deliver all orders free of delivery charges.' },
  { q: 'How can I track my order?', a: 'You can track your order through our delivery tracking system. Coming soon!' },
  { q: 'What is your return policy?', a: 'We offer easy returns within 24 hours of delivery. Check our Return Policy page for details.' },
  { q: 'Do you offer cash on delivery?', a: 'Yes! We offer multiple payment options including cash on delivery.' },
  { q: 'How do I contact customer support?', a: 'You can reach us via phone, email, or through our Contact page.' }
];

const FAQ = () => {
  return (
    <Box sx={{ py: { xs: 5, md: 8 } }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Box sx={{ display: 'inline-flex', p: 2, borderRadius: '50%', backgroundColor: '#f8fafc', mb: 2 }}>
              <HelpOutline sx={{ fontSize: 32, color: '#cf7c1e' }} />
            </Box>
            <Typography variant="h1">Frequently Asked Questions</Typography>
          </Box>

          {faqs.map((faq, i) => (
            <Accordion key={i} sx={{
              mb: 1.5, borderRadius: '12px !important', border: '1px solid #f1f5f9',
              boxShadow: 'none', '&:before': { display: 'none' },
              '&.Mui-expanded': { boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }
            }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{faq.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6 }}>{faq.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </motion.div>
      </Container>
    </Box>
  );
};

export default FAQ;