import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Switch, FormControlLabel, Chip
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { categoryAPI } from '../services/api';
import ConfirmDialog from '../components/ConfirmDialog';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  
  // Confirm Dialog State
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState({ name: '', description: '', isActive: true });

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryAPI.getCategories();
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, description: category.description || '', isActive: category.isActive });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', description: '', isActive: true });
    }
    setOpen(true);
  };

  const handleClose = () => { setOpen(false); setEditingCategory(null); };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async () => {
    try {
      if (editingCategory) {
        await categoryAPI.updateCategory(editingCategory._id, formData);
        toast.success('Category updated');
      } else {
        await categoryAPI.createCategory(formData);
        toast.success('Category created');
      }
      handleClose();
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Operation failed');
    }
  };

  const handleDeleteRequest = (id) => {
    setItemToDelete(id);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await categoryAPI.deleteCategory(itemToDelete);
      toast.success('Category deleted');
      setConfirmOpen(false);
      setItemToDelete(null);
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Delete failed. Category might have linked products.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3">Manage Categories</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()} sx={{ borderRadius: '24px', px: 3 }}>
            Add Category
          </Button>
        </Box>

        <TableContainer sx={{ borderRadius: '16px', border: '1px solid #f1f5f9', backgroundColor: '#fff', boxShadow: 'none' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id} sx={{ '&:hover': { backgroundColor: '#fdfdfd' }, transition: 'all 0.2s' }}>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{category.name}</TableCell>
                  <TableCell sx={{ color: '#64748b', fontSize: '0.8125rem' }}>{category.description || '-'}</TableCell>
                  <TableCell>
                    <Chip label={category.isActive ? 'Active' : 'Inactive'} size="small" 
                      color={category.isActive ? 'success' : 'default'} sx={{ borderRadius: '8px', fontWeight: 600 }} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpen(category)} sx={{ mr: 1, backgroundColor: '#f8fafc' }}><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => handleDeleteRequest(category._id)} color="error" sx={{ backgroundColor: 'rgba(211,47,47,0.08)' }}><Delete fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}>
          <DialogTitle sx={{ fontWeight: 700 }}>{editingCategory ? 'Edit Category' : 'Add Category'}</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" size="small" required />
            <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} margin="normal" size="small" multiline rows={3} />
            <Box sx={{ mt: 2 }}>
              <FormControlLabel control={<Switch checked={formData.isActive} onChange={handleChange} name="isActive" color="primary" />} label="Active Status" />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleClose} sx={{ borderRadius: '24px', color: '#64748b' }}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" sx={{ borderRadius: '24px' }}>{editingCategory ? 'Update' : 'Create'}</Button>
          </DialogActions>
        </Dialog>

        <ConfirmDialog 
          open={confirmOpen}
          title="Delete Category"
          message="Are you sure you want to delete this category? This action cannot be undone and may fail if products are linked to it."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmOpen(false)}
          loading={deleting}
        />
      </motion.div>
    </Container>
  );
};

export default ManageCategories;