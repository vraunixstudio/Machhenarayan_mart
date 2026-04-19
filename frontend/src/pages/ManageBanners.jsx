import { useState, useEffect } from 'react';
// MUI Default Imports
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';

// Icons
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Close from '@mui/icons-material/Close';

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
    title: '', subtitle: '', image: '', link: '', 
    position: 'hero', order: 0, isActive: true
  });

  useEffect(() => { fetchBanners(); }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await bannerAPI.getBanners();
      setBanners(res.data.banners || []);
    } catch (err) {
      toast.error('Failed to load banners');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (banner = null) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title || '',
        subtitle: banner.subtitle || '',
        image: banner.image || '',
        link: banner.link || '',
        position: banner.position || 'hero',
        order: banner.order || 0,
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
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    try {
      setUploading(true);
      const res = await uploadAPI.uploadImage(data);
      setFormData(prev => ({ ...prev, image: res.data.url }));
      toast.success('Banner image uploaded');
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.image) return toast.error('Banner image is required');
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
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this banner?')) {
      try {
        await bannerAPI.deleteBanner(id);
        toast.success('Banner deleted');
        fetchBanners();
      } catch (err) {
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
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} align="center"><CircularProgress size={30} /></TableCell></TableRow>
              ) : banners.map((banner) => (
                <TableRow key={banner._id}>
                  <TableCell>
                    <Box sx={{ width: 100, height: 40, borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                      <img src={banner.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{banner.title || 'No Title'}</Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>Order: {banner.order}</Typography>
                  </TableCell>
                  <TableCell><Chip label={banner.position} size="small" sx={{ textTransform: 'capitalize' }} /></TableCell>
                  <TableCell>
                    <Chip label={banner.isActive ? 'Active' : 'Hidden'} color={banner.isActive ? 'success' : 'default'} size="small" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpen(banner)} sx={{ mr: 1 }}><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(banner._id)} sx={{ backgroundColor: 'rgba(211,47,47,0.08)' }}><Delete fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px' } }}>
          <DialogTitle sx={{ fontWeight: 700 }}>{editingBanner ? 'Edit Banner' : 'Add New Banner'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                  {formData.image ? (
                    <Box sx={{ position: 'relative', width: '100%', height: 160, borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                      <img src={formData.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <IconButton onClick={() => setFormData(prev => ({ ...prev, image: '' }))} sx={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff' }}><Close size="small" /></IconButton>
                    </Box>
                  ) : (
                    <Button component="label" sx={{ width: '100%', height: 160, border: '2px dashed #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
                      {uploading ? <CircularProgress size={30} /> : <PhotoCamera sx={{ fontSize: 40, color: '#94a3b8', mb: 1 }} />}
                      <Typography variant="body2" sx={{ color: '#64748b' }}>Upload Banner Image</Typography>
                      <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                    </Button>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}><TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} size="small" /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} size="small" multiline rows={2} /></Grid>
              <Grid item xs={6}><TextField fullWidth type="number" label="Display Order" name="order" value={formData.order} onChange={handleChange} size="small" /></Grid>
              <Grid item xs={6}>
                <TextField fullWidth select label="Position" name="position" value={formData.position} onChange={handleChange} size="small">
                  <MenuItem value="hero">Hero Slider</MenuItem>
                  <MenuItem value="promo">Promo Section</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}><TextField fullWidth label="Link URL" name="link" value={formData.link} onChange={handleChange} size="small" placeholder="/shop" /></Grid>
              <Grid item xs={12}><FormControlLabel control={<Switch checked={formData.isActive} onChange={handleChange} name="isActive" color="primary" />} label="Banner Active" /></Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleClose} sx={{ color: '#64748b' }}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" sx={{ borderRadius: '24px', px: 4 }}>{editingBanner ? 'Update' : 'Create'}</Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default ManageBanners;