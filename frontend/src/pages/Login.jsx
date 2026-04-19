import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MuiLink from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import ShoppingBasket from '@mui/icons-material/ShoppingBasket';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    if (result.success) { navigate(from, { replace: true }); }
    else { setError(result.error); }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', py: 6 }}>
      <Container maxWidth="xs">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{
              display: 'inline-flex', p: 1.5, borderRadius: '14px', backgroundColor: '#cf7c1e', mb: 2
            }}>
              <ShoppingBasket sx={{ fontSize: 28, color: '#fff' }} />
            </Box>
            <Typography variant="h2" sx={{ mb: 0.5 }}>Welcome back</Typography>
            <Typography sx={{ color: '#94a3b8' }}>Sign in to your account</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{
            p: { xs: 3, md: 4 }, borderRadius: '20px', border: '1px solid #f1f5f9',
            backgroundColor: '#fff'
          }}>
            <TextField fullWidth label="Email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2.5 }} required />
            <TextField fullWidth label="Password" type={showPassword ? 'text' : 'password'} value={password}
              onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }} required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }} />
            <Button fullWidth variant="contained" type="submit" size="large" disabled={loading}
              sx={{ borderRadius: '24px', py: 1.5, mb: 2 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            <Typography sx={{ textAlign: 'center', fontSize: '0.8125rem', color: '#64748b', mb: 1.5 }}>
              <MuiLink component={Link} to="/forgotpassword" sx={{ color: '#135788', fontWeight: 500, textDecoration: 'none' }}>
                Forgot password?
              </MuiLink>
            </Typography>
            <Typography sx={{ textAlign: 'center', fontSize: '0.8125rem', color: '#64748b' }}>
              Don't have an account?{' '}
              <MuiLink component={Link} to="/register" sx={{ color: '#135788', fontWeight: 600 }}>
                Register
              </MuiLink>
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;