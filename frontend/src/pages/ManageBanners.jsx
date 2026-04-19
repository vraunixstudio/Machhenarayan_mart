import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, Switch, FormControlLabel, Chip
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    try {
      setUploading(true);
      const res = await uploadAPI.uploadImage(data);
      setFormData({ ...formData, image: res.data.url });
      toast.success('Banner image uploaded');
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.image) {
      toast.error('Image is required');
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
                <TableCell sx={{ fontWeight: 600 }}>Preview</TableCell>
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
                  <TableCell>
                    <Box sx={{ width: 80, height: 40, borderRadius: '4px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                      <img src={banner.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                  </TableCell>
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
            <Box sx={{ mb: 3, mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: '100%', height: 180, borderRadius: '12px', overflow: 'hidden', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc', position: 'relative' }}>
                {formData.image ? (
                  <img src={formData.image} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Add sx={{ fontSize: 48, color: '#e2e8f0' }} />
                  </Box>
                )}
                {uploading && (
                  <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress size={24} />
                  </Box>
                )}
              </Box>
              <Button component="label" variant="outlined" startIcon={<Add />} sx={{ borderRadius: '20px' }}>
                Upload Banner Image
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
              </Button>
            </Box>

            <TextField fullWidth label="Title (Optional)" name="title" value={formData.title} onChange={handleChange} margin="normal" size="small" />
            <TextField fullWidth label="Subtitle (Optional)" name="subtitle" value={formData.subtitle} onChange={handleChange} margin="normal" size="small" />
            <TextField fullWidth label="Link (e.g., /categories)" name="link" value={formData.link} onChange={handleChange} margin="normal" size="small" />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth select label="Position" name="position" value={formData.position} onChange={handleChange} margin="normal" size="small">
                  <MenuItem value="hero">Hero</MenuItem>
                  <MenuItem value="promo">Promo</MenuItem>
                  <MenuItem value="sidebar">Sidebar</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Display Order" name="order" type="number" value={formData.order} onChange={handleChange} margin="normal" size="small" />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <FormControlLabel control={<Switch checked={formData.isActive} onChange={handleChange} name="isActive" color="primary" />} label="Active Status" />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleClose} sx={{ borderRadius: '24px', color: '#64748b' }}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" disabled={uploading} sx={{ borderRadius: '24px' }}>
              {editingBanner ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default ManageBanners;