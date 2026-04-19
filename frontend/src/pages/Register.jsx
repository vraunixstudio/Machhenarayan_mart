import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, TextField, Button, Link as MuiLink, Alert, IconButton, InputAdornment } from '@mui/material';
import { ShoppingBasket, Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    const result = await register(name, email, password);
    if (result.success) { navigate('/'); }
    else { setError(result.error); }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', py: 6 }}>
      <Container maxWidth="xs">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'inline-flex', p: 1.5, borderRadius: '14px', backgroundColor: '#cf7c1e', mb: 2 }}>
              <ShoppingBasket sx={{ fontSize: 28, color: '#fff' }} />
            </Box>
            <Typography variant="h2" sx={{ mb: 0.5 }}>Create account</Typography>
            <Typography sx={{ color: '#94a3b8' }}>Join Machhenarayan Mart</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{
            p: { xs: 3, md: 4 }, borderRadius: '20px', border: '1px solid #f1f5f9', backgroundColor: '#fff'
          }}>
            <TextField fullWidth label="Full Name" value={name}
              onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} required />
            <TextField fullWidth label="Email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} required />
            <TextField fullWidth label="Password" type={showPassword ? 'text' : 'password'} value={password}
              onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }} />
            <TextField fullWidth label="Confirm Password" type={showPassword ? 'text' : 'password'} value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} sx={{ mb: 3 }} required />
            <Button fullWidth variant="contained" type="submit" size="large" disabled={loading}
              sx={{ borderRadius: '24px', py: 1.5, mb: 2 }}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
            <Typography sx={{ textAlign: 'center', fontSize: '0.8125rem', color: '#64748b' }}>
              Already have an account?{' '}
              <MuiLink component={Link} to="/login" sx={{ color: '#135788', fontWeight: 600 }}>Sign In</MuiLink>
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Register;