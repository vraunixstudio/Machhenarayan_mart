import { useState } from 'react';
import {
  Box, Container, Typography, TextField, Button, Grid, Avatar,
  IconButton, Paper, Divider, CircularProgress
} from '@mui/material';
import { PhotoCamera, Save, Badge, Email, Phone } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await authAPI.updateProfile(formData);
      if (res.data.success) {
        // Update local storage and context
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user); // Update state without reload
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#fafbfc', minHeight: '80vh' }}>
      <Container maxWidth="sm">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: '24px', border: '1px solid #f1f5f9' }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar src={formData.avatar} sx={{ width: 100, height: 100, mb: 2, bgcolor: '#135788', fontSize: '2.5rem' }}>
                  {formData.name.charAt(0)}
                </Avatar>
                <IconButton sx={{ position: 'absolute', bottom: 15, right: -5, bgcolor: '#fff', border: '1px solid #e2e8f0', '&:hover': { bgcolor: '#f8fafc' } }} size="small">
                  <PhotoCamera fontSize="small" sx={{ color: '#64748b' }} />
                </IconButton>
              </Box>
              <Typography variant="h2" sx={{ mb: 1 }}>Account Settings</Typography>
              <Typography sx={{ color: '#64748b' }}>Manage your personal information</Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange}
                    InputProps={{ startAdornment: <Badge sx={{ color: '#94a3b8', mr: 1, fontSize: 20 }} /> }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email Address" name="email" value={formData.email} onChange={handleChange}
                    InputProps={{ startAdornment: <Email sx={{ color: '#94a3b8', mr: 1, fontSize: 20 }} /> }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange}
                    InputProps={{ startAdornment: <Phone sx={{ color: '#94a3b8', mr: 1, fontSize: 20 }} /> }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                </Grid>
                
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button fullWidth type="submit" variant="contained" size="large" disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                    sx={{ py: 1.5, borderRadius: '12px', fontWeight: 600 }}>
                    {loading ? 'Saving Changes...' : 'Save Settings'}
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Divider sx={{ my: 4 }} />
            
            <Typography variant="subtitle2" sx={{ mb: 2, color: '#64748b', textAlign: 'center' }}>
              Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Profile;
