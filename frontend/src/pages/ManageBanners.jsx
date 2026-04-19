import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, Switch, FormControlLabel, Chip, Grid, CircularProgress
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { bannerAPI, uploadAPI } from '../services/api';

const ManageBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    title: '', subtitle: '', image: '', link: '', position: 'hero', order: 0, isActive: true
  });

  useEffect(() => { fetchBanners(); }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await bannerAPI.getBanners();
      setBanners(response.data.banners || []);
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast.error('Failed to load banners');
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    try {
      setUploading(true);
      const res = await uploadAPI.uploadImage(data);
      setFormData({ ...formData, image: res.data.url });
      toast.success('Image uploaded successfully');
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.image) {
      toast.error('Please upload an image first');
      return;
    }
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
    if (window.confirm('Delete this banner?')) {
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
          <Typography variant="h3" sx={{ fontWeight: 800 }}>Manage Banners</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()} 
            sx={{ borderRadius: '24px', px: 3, bgcolor: '#135788', '&:hover': { bgcolor: '#0e4268' } }}>
            Add Banner
          </Button>
        </Box>

        <TableContainer sx={{ borderRadius: '20px', border: '1px solid #f1f5f9', backgroundColor: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Preview</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Position</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4 }}><CircularProgress size={24} /></TableCell></TableRow>
              ) : banners.map((banner) => (
                <TableRow key={banner._id} sx={{ '&:hover': { backgroundColor: '#fcfcfc' } }}>
                  <TableCell>
                    <Box sx={{ width: 80, height: 45, borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                      <img src={banner.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{banner.title || 'No Title'}</Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>{banner.subtitle?.substring(0, 30)}...</Typography>
                  </TableCell>
                  <TableCell><Chip label={banner.position} size="small" sx={{ textTransform: 'capitalize', fontWeight: 600, borderRadius: '8px' }} /></TableCell>
                  <TableCell>
                    <Chip label={banner.isActive ? 'Active' : 'Hidden'} color={banner.isActive ? 'success' : 'default'} size="small" sx={{ fontWeight: 600, borderRadius: '8px' }} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpen(banner)} size="small" sx={{ mr: 1, color: '#135788' }}><Edit fontSize="small" /></IconButton>
                    <IconButton onClick={() => handleDelete(banner._id)} size="small" color="error"><Delete fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {banners.length === 0 && !loading && (
                <TableRow><TableCell colSpan={5} align="center" sx={{ py: 6, color: '#94a3b8' }}>No banners configured yet</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '24px', p: 1 } }}>
          <DialogTitle sx={{ fontWeight: 800 }}>{editingBanner ? 'Edit Banner' : 'New Banner'}</DialogTitle>
          <DialogContent>
            <Box sx={{ my: 2, textAlign: 'center' }}>
              <Box sx={{ 
                width: '100%', height: 200, borderRadius: '16px', border: '2px dashed #e2e8f0', 
                mb: 2, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {formData.image ? (
                  <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Typography color="textSecondary">No image selected</Typography>
                )}
                {uploading && <CircularProgress sx={{ position: 'absolute' }} />}
              </Box>
              <Button component="label" variant="outlined" sx={{ borderRadius: '20px' }}>
                {formData.image ? 'Change Image' : 'Select Image'}
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
              </Button>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Main Title" name="title" value={formData.title} onChange={handleChange} margin="normal" size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Subtitle / Description" name="subtitle" value={formData.subtitle} onChange={handleChange} margin="dense" size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth select label="Position" name="position" value={formData.position} onChange={handleChange} margin="normal" size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}>
                  <MenuItem value="hero">Hero Section</MenuItem>
                  <MenuItem value="promo">Promo Section</MenuItem>
                  <MenuItem value="sidebar">Sidebar Ad</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Order Index" name="order" type="number" value={formData.order} onChange={handleChange} margin="normal" size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Target Link (URL or relative path)" name="link" value={formData.link} onChange={handleChange} margin="normal" size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
              </Grid>
            </Grid>
            <FormControlLabel sx={{ mt: 2 }} control={<Switch checked={formData.isActive} onChange={handleChange} name="isActive" color="primary" />} label="Display this banner on site" />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleClose} sx={{ color: '#64748b' }}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" sx={{ borderRadius: '24px', px: 4, bgcolor: '#135788' }}>
              {editingBanner ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default ManageBanners;