import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';
import { Email, Send } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');

    try {
      setLoading(true);
      const res = await authAPI.forgotPassword({ email });
      if (res.data.success) {
        setSent(true);
        toast.success('Reset link sent to your email!');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#fafbfc', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="xs">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: '24px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
            <Typography variant="h2" sx={{ mb: 2, fontWeight: 800 }}>Forgot Password?</Typography>
            <Typography sx={{ color: '#64748b', mb: 4 }}>
              {sent ? "Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder." : "Enter your email address and we'll send you a link to reset your password."}
            </Typography>

            {!sent && (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: <Email sx={{ color: '#94a3b8', mr: 1 }} />,
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                </Box>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                  sx={{ py: 1.5, borderRadius: '12px', fontWeight: 600, textTransform: 'none', fontSize: '1rem' }}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            )}

            {sent && (
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setSent(false)}
                sx={{ py: 1.5, borderRadius: '12px', fontWeight: 600, textTransform: 'none', mt: 2 }}
              >
                Try another email
              </Button>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
