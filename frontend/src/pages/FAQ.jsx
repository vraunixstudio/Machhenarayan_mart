import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
          Frequently Asked Questions
        </Typography>

        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ fontWeight: 500 }}>{faq.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </motion.div>
    </Container>
  );
};

export default FAQ;