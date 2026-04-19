import { useState, useEffect, useRef } from 'react';
import {
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, Select, FormControl, InputLabel,
  Switch, FormControlLabel, Chip, Grid, CircularProgress
} from '@mui/material';
import { Add, Edit, Delete, PhotoCamera, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { productAPI, categoryAPI, uploadAPI } from '../services/api';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '', description: '', price: '', originalPrice: '', category: '',
    inStock: true, stockQuantity: 0, isFeatured: false, isActive: true, images: []
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
        originalPrice: product.originalPrice || '', category: product.category?._id || '',
        inStock: product.inStock, stockQuantity: product.stockQuantity || 0,
        isFeatured: product.isFeatured, isActive: product.isActive,
        images: product.images || []
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '', description: '', price: '', originalPrice: '', category: '',
        inStock: true, stockQuantity: 0, isFeatured: false, isActive: true, images: []
      });
    }
    setOpen(true);
  };

  const handleClose = () => { setOpen(false); setEditingProduct(null); };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const data = new FormData();
    if (files.length === 1) {
      data.append('image', files[0]);
      try {
        setUploading(true);
        const res = await uploadAPI.uploadImage(data);
        setFormData(prev => ({ ...prev, images: [...prev.images, res.data.url] }));
        toast.success('Image uploaded');
      } catch (err) {
        toast.error('Upload failed');
      } finally {
        setUploading(false);
      }
    } else {
      files.forEach(file => data.append('images', file));
      try {
        setUploading(true);
        const res = await uploadAPI.uploadImages(data);
        setFormData(prev => ({ ...prev, images: [...prev.images, ...res.data.urls] }));
        toast.success('Images uploaded');
      } catch (err) {
        toast.error('Upload failed');
      } finally {
        setUploading(false);
      }
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
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
                <TableCell sx={{ fontWeight: 600 }}>Stock</TableCell>
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
                  <TableCell sx={{ fontWeight: 600, color: '#135788' }}>
                    <Box>
                      ₹{product.price}
                      {product.originalPrice > product.price && (
                        <Chip label="SALE" size="small" color="error" sx={{ height: 16, fontSize: '0.6rem', ml: 1, verticalAlign: 'middle' }} />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'} size="small" 
                      color={product.stockQuantity > 0 ? (product.stockQuantity < 10 ? 'warning' : 'success') : 'error'} 
                      sx={{ borderRadius: '8px', fontWeight: 600 }} />
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

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}>
          <DialogTitle sx={{ fontWeight: 700 }}>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" size="small" required />
                <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} margin="normal" size="small" multiline rows={4} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Price (₹)" name="price" type="number" value={formData.price} onChange={handleChange} margin="normal" size="small" required />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Compare-at Price (₹) - for Discount" name="originalPrice" type="number" value={formData.originalPrice} onChange={handleChange} margin="normal" size="small" helperText="Set this higher than the Price to show a discount" />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth margin="normal" size="small">
                      <InputLabel>Category</InputLabel>
                      <Select name="category" value={formData.category} label="Category" onChange={handleChange}>
                        {categories.map((cat) => <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Stock Quantity" name="stockQuantity" type="number" value={formData.stockQuantity} onChange={handleChange} margin="normal" size="small" />
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <FormControlLabel control={<Switch checked={formData.inStock} onChange={handleChange} name="inStock" color="primary" />} label="In Stock" />
                  <FormControlLabel control={<Switch checked={formData.isFeatured} onChange={handleChange} name="isFeatured" color="secondary" />} label="Featured" />
                </Box>
              </Grid>

              <Grid item xs={12} md={5}>
                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>Product Images</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {formData.images.map((img, i) => (
                    <Box key={i} sx={{ position: 'relative', width: 80, height: 80, borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <IconButton size="small" onClick={() => removeImage(i)} sx={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' } }}>
                        <Close sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Box>
                  ))}
                  <Button component="label" sx={{ width: 80, height: 80, border: '2px dashed #e2e8f0', borderRadius: '8px', display: 'flex', flexDirection: 'column', color: '#94a3b8' }}>
                    {uploading ? <CircularProgress size={20} /> : <PhotoCamera />}
                    <Typography variant="caption" sx={{ mt: 0.5 }}>Add</Typography>
                    <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
                  </Button>
                </Box>
              </Grid>
            </Grid>
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