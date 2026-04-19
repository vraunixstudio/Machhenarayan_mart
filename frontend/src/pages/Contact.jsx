import { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button } from '@mui/material';
import { Email, Phone, LocationOn, AccessTime } from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const contactInfo = [
  { icon: <LocationOn />, label: 'Address', value: 'Machhenarayan Market, District' },
  { icon: <Phone />, label: 'Phone', value: '+977 982-3207452' },
  { icon: <Email />, label: 'Email', value: 'info@machhenarayanmart.com' },
  { icon: <AccessTime />, label: 'Store Hours', value: 'Mon - Sun: 7:00 AM - 9:00 PM' }
];

import { messageAPI } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      await messageAPI.sendMessage(formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 5, md: 8 } }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h1" sx={{ mb: 1 }}>Contact Us</Typography>
          <Typography sx={{ color: '#64748b', mb: 5 }}>We'd love to hear from you</Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px', backgroundColor: '#135788', color: '#fff', height: '100%' }}>
                <Typography variant="h4" sx={{ color: '#fff', mb: 3 }}>Get in Touch</Typography>
                {contactInfo.map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                    <Box sx={{ color: '#cf7c1e', mt: 0.25 }}>{item.icon}</Box>
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#fff' }}>{item.label}</Typography>
                      <Typography sx={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)' }}>{item.value}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                <Typography variant="h4" sx={{ mb: 3 }}>Send a Message</Typography>
                <form onSubmit={handleSubmit}>
                  <TextField fullWidth label="Name" name="name" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} sx={{ mb: 2.5 }} required />
                  <TextField fullWidth label="Email" name="email" type="email" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} sx={{ mb: 2.5 }} required />
                  <TextField fullWidth label="Subject" name="subject" value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })} sx={{ mb: 2.5 }} />
                  <TextField fullWidth label="Message" name="message" value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })} multiline rows={4} sx={{ mb: 3 }} required />
                  <Button fullWidth variant="contained" type="submit" size="large" disabled={sending}
                    sx={{ borderRadius: '24px', py: 1.5 }}>
                    {sending ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact;