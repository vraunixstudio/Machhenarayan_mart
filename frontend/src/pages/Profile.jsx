import { useState } from 'react';
import {
  Box, Container, Typography, TextField, Button, Grid, Avatar,
  IconButton, Paper, Divider, CircularProgress, Dialog, DialogTitle,
  DialogContent, Grid as MuiGrid
} from '@mui/material';
import { CameraAlt, Save, Badge, Email, Phone, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || ''
  });

  const avatars = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Tigger',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Bella',
    'https://api.dicebear.com/7.x/bottts/svg?seed=Robo1',
    'https://api.dicebear.com/7.x/bottts/svg?seed=Robo2',
    'https://api.dicebear.com/7.x/pixel-art/svg?seed=P1',
    'https://api.dicebear.com/7.x/pixel-art/svg?seed=P2'
  ];

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
                <IconButton 
                  onClick={() => setAvatarModalOpen(true)}
                  sx={{ position: 'absolute', bottom: 15, right: -5, bgcolor: '#fff', border: '1px solid #e2e8f0', '&:hover': { bgcolor: '#f8fafc' }, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                  size="small"
                >
                  <CameraAlt fontSize="small" sx={{ color: '#64748b' }} />
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

      {/* Avatar Selection Modal */}
      <Dialog 
        open={avatarModalOpen} 
        onClose={() => setAvatarModalOpen(false)}
        PaperProps={{ sx: { borderRadius: '24px', p: 1, maxWidth: '400px' } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Choose an Icon
          <IconButton onClick={() => setAvatarModalOpen(false)} size="small"><Close /></IconButton>
        </DialogTitle>
        <DialogContent>
          <MuiGrid container spacing={2} sx={{ p: 1 }}>
            {avatars.map((url, index) => (
              <MuiGrid item xs={4} key={index}>
                <Avatar 
                  src={url} 
                  onClick={() => {
                    setFormData({ ...formData, avatar: url });
                    setAvatarModalOpen(false);
                  }}
                  sx={{ 
                    width: '100%', 
                    height: 'auto', 
                    aspectRatio: '1/1', 
                    cursor: 'pointer',
                    border: formData.avatar === url ? '3px solid #135788' : '2px solid transparent',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.1)', border: '2px solid #cf7c1e' }
                  }}
                />
              </MuiGrid>
            ))}
          </MuiGrid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Profile;
