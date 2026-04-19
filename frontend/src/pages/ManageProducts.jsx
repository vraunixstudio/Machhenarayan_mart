import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, Select, FormControl, InputLabel,
  Switch, FormControlLabel, Chip
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { productAPI, categoryAPI } from '../services/api';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '',
    inStock: true, isFeatured: false, isActive: true
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        productAPI.getProducts({ limit: 100 }),
        categoryAPI.getCategories()
      ]);
      setProducts(productsRes.data.products);
      setCategories(categoriesRes.data.categories);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name, description: product.description || '', price: product.price,
        category: product.category?._id || '', inStock: product.inStock,
        isFeatured: product.isFeatured, isActive: product.isActive
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '', description: '', price: '', category: '',
        inStock: true, isFeatured: false, isActive: true
      });
    }
    setOpen(true);
  };

  const handleClose = () => { setOpen(false); setEditingProduct(null); };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async () => {
    try {
      if (editingProduct) {
        await productAPI.updateProduct(editingProduct._id, formData);
        toast.success('Product updated');
      } else {
        await productAPI.createProduct(formData);
        toast.success('Product created');
      }
      handleClose();
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(id);
        toast.success('Product deleted');
        fetchData();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3">Manage Products</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()} sx={{ borderRadius: '24px', px: 3 }}>
            Add Product
          </Button>
        </Box>

        <TableContainer sx={{ borderRadius: '16px', border: '1px solid #f1f5f9', backgroundColor: '#fff', boxShadow: 'none' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id} sx={{ '&:hover': { backgroundColor: '#fdfdfd' }, transition: 'all 0.2s' }}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{product.name}</Typography>
                    {product.isFeatured && <Chip label="Featured" size="small" sx={{ height: 20, fontSize: '0.65rem', backgroundColor: 'rgba(207,124,30,0.1)', color: '#cf7c1e', fontWeight: 700, mt: 0.5 }} />}
                  </TableCell>
                  <TableCell><Chip label={product.category?.name || 'None'} size="small" sx={{ borderRadius: '8px' }} /></TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#135788' }}>₹{product.price}</TableCell>
                  <TableCell>
                    <Chip label={product.inStock ? 'In Stock' : 'Out of Stock'} size="small" 
                      color={product.inStock ? 'success' : 'default'} sx={{ borderRadius: '8px', fontWeight: 600 }} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpen(product)} sx={{ mr: 1, backgroundColor: '#f8fafc' }}><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => handleDelete(product._id)} color="error" sx={{ backgroundColor: 'rgba(211,47,47,0.08)' }}><Delete fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}>
          <DialogTitle sx={{ fontWeight: 700 }}>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" size="small" required />
            <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} margin="normal" size="small" multiline rows={3} />
            <TextField fullWidth label="Price" name="price" type="number" value={formData.price} onChange={handleChange} margin="normal" size="small" required />
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel>Category</InputLabel>
              <Select name="category" value={formData.category} label="Category" onChange={handleChange}>
                {categories.map((cat) => <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>)}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
               <FormControlLabel control={<Switch checked={formData.inStock} onChange={handleChange} name="inStock" color="primary" />} label="In Stock" />
               <FormControlLabel control={<Switch checked={formData.isFeatured} onChange={handleChange} name="isFeatured" color="secondary" />} label="Featured" />
               <FormControlLabel control={<Switch checked={formData.isActive} onChange={handleChange} name="isActive" />} label="Active" />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleClose} sx={{ borderRadius: '24px', color: '#64748b' }}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" sx={{ borderRadius: '24px' }}>{editingProduct ? 'Update' : 'Create'}</Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default ManageProducts;