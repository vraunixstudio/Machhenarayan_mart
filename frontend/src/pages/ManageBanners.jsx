import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, Switch, FormControlLabel, Chip
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { bannerAPI } from '../services/api';

const ManageBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    title: '', subtitle: '', image: '', link: '', position: 'hero', order: 0, isActive: true
  });

  useEffect(() => { fetchBanners(); }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await bannerAPI.getBanners();
      setBanners(response.data.banners);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (banner = null) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title || '', subtitle: banner.subtitle || '', image: banner.image || '',
        link: banner.link || '', position: banner.position || 'hero', order: banner.order || 0,
        isActive: banner.isActive
      });
    } else {
      setEditingBanner(null);
      setFormData({ title: '', subtitle: '', image: '', link: '', position: 'hero', order: 0, isActive: true });
    }
    setOpen(true);
  };

  const handleClose = () => { setOpen(false); setEditingBanner(null); };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async () => {
    try {
      if (editingBanner) {
        await bannerAPI.updateBanner(editingBanner._id, formData);
        toast.success('Banner updated');
      } else {
        await bannerAPI.createBanner(formData);
        toast.success('Banner created');
      }
      handleClose();
      fetchBanners();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await bannerAPI.deleteBanner(id);
        toast.success('Banner deleted');
        fetchBanners();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3">Manage Banners</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()} sx={{ borderRadius: '24px', px: 3 }}>
            Add Banner
          </Button>
        </Box>

        <TableContainer sx={{ borderRadius: '16px', border: '1px solid #f1f5f9', backgroundColor: '#fff', boxShadow: 'none' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Position</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Order</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner._id} sx={{ '&:hover': { backgroundColor: '#fdfdfd' }, transition: 'all 0.2s' }}>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{banner.title || '-'}</TableCell>
                  <TableCell><Chip label={banner.position} size="small" sx={{ borderRadius: '8px' }} /></TableCell>
                  <TableCell>{banner.order}</TableCell>
                  <TableCell>
                    <Chip label={banner.isActive ? 'Active' : 'Inactive'} size="small" 
                      color={banner.isActive ? 'success' : 'default'} sx={{ borderRadius: '8px', fontWeight: 600 }} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpen(banner)} sx={{ mr: 1, backgroundColor: '#f8fafc' }}><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => handleDelete(banner._id)} color="error" sx={{ backgroundColor: 'rgba(211,47,47,0.08)' }}><Delete fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}>
          <DialogTitle sx={{ fontWeight: 700 }}>{editingBanner ? 'Edit Banner' : 'Add Banner'}</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} margin="normal" size="small" />
            <TextField fullWidth label="Subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} margin="normal" size="small" />
            <TextField fullWidth label="Image URL" name="image" value={formData.image} onChange={handleChange} margin="normal" size="small" required />
            <TextField fullWidth label="Link" name="link" value={formData.link} onChange={handleChange} margin="normal" size="small" />
            <TextField fullWidth select label="Position" name="position" value={formData.position} onChange={handleChange} margin="normal" size="small">
              <MenuItem value="hero">Hero</MenuItem>
              <MenuItem value="promo">Promo</MenuItem>
              <MenuItem value="sidebar">Sidebar</MenuItem>
            </TextField>
            <TextField fullWidth label="Order" name="order" type="number" value={formData.order} onChange={handleChange} margin="normal" size="small" />
            <Box sx={{ mt: 2 }}>
              <FormControlLabel control={<Switch checked={formData.isActive} onChange={handleChange} name="isActive" color="primary" />} label="Active Status" />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleClose} sx={{ borderRadius: '24px', color: '#64748b' }}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" sx={{ borderRadius: '24px' }}>{editingBanner ? 'Update' : 'Create'}</Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default ManageBanners;