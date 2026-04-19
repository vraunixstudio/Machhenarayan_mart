import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box, Container, Typography, Grid, Skeleton, TextField, InputAdornment,
  FormControl, InputLabel, Select, MenuItem, Slider, Button, Chip, IconButton
} from '@mui/material';
import { Search, FilterList, Clear } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { productAPI, categoryAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    const fetchCategories = async () => {
      try { const res = await categoryAPI.getCategories(); setCategories(res.data.categories); } catch (e) { console.error(e); }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setSearchQuery(initialQuery);
    setCategory(initialCategory);
  }, [initialQuery, initialCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {
          q: initialQuery || undefined,
          category: initialCategory || undefined,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          sort
        };
        const res = await productAPI.getProducts(params);
        setProducts(res.data.products || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [initialQuery, initialCategory, priceRange, sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ 
      ...(searchQuery.trim() && { q: searchQuery }), 
      ...(category && { category }) 
    });
  };

  const handleClear = () => {
    setSearchQuery(''); setCategory(''); setPriceRange([0, 5000]); setSort('newest');
    setSearchParams({});
  };

  return (
    <Box sx={{ py: { xs: 5, md: 8 } }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Search bar */}
          <Box sx={{ mb: 5 }}>
            <form onSubmit={handleSearch}>
              <TextField fullWidth placeholder="Search for groceries, fruits, vegetables..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Search sx={{ color: '#94a3b8' }} /></InputAdornment>,
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchQuery('')}><Clear /></IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px', backgroundColor: '#f8fafc',
                    '&.Mui-focused': { boxShadow: '0 4px 16px rgba(19,87,136,0.1)' }
                  }
                }}
              />
            </form>
          </Box>

          {/* Filters & Sorting */}
          <Box sx={{ p: 3, mb: 4, borderRadius: '16px', border: '1px solid #f1f5f9', backgroundColor: '#fafbfc' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterList sx={{ color: '#135788', fontSize: 20 }} />
                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Filters & Sorting</Typography>
              </Box>
              {(category || priceRange[0] > 0 || priceRange[1] < 5000 || initialQuery) && (
                <Button size="small" startIcon={<Clear />} onClick={handleClear} sx={{ borderRadius: '20px' }}>Clear All</Button>
              )}
            </Box>
            <Grid container spacing={3} alignItems="flex-end">
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select value={category} label="Category" onChange={(e) => {
                    setCategory(e.target.value);
                    setSearchParams({ 
                      ...(initialQuery && { q: initialQuery }), 
                      ...(e.target.value && { category: e.target.value }) 
                    });
                  }}>
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((c) => <MenuItem key={c._id} value={c.slug}>{c.name}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort By</InputLabel>
                  <Select value={sort} label="Sort By" onChange={(e) => setSort(e.target.value)}>
                    <MenuItem value="newest">Newest Arrivals</MenuItem>
                    <MenuItem value="price-asc">Price: Low to High</MenuItem>
                    <MenuItem value="price-desc">Price: High to Low</MenuItem>
                    <MenuItem value="name">Product Name</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontSize: '0.75rem', mb: 1, color: '#64748b' }}>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</Typography>
                <Slider value={priceRange} onChange={(e, v) => setPriceRange(v)} min={0} max={5000} step={50}
                  sx={{ '& .MuiSlider-thumb': { width: 16, height: 16 }, color: '#135788' }} />
              </Grid>
            </Grid>
          </Box>

          {/* Results */}
          {loading ? (
            <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <Skeleton variant="rounded" height={280} sx={{ borderRadius: '16px' }} />
                </Grid>
              ))}
            </Grid>
          ) : products.length > 0 ? (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                  Showing <strong>{products.length}</strong> products
                  {initialQuery && <span> for "<strong>{initialQuery}</strong>"</span>}
                </Typography>
              </Box>
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                {products.map((p, i) => (
                  <Grid item xs={6} sm={4} md={3} key={p._id}>
                    <ProductCard product={p} index={i} showQuickAdd />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Box sx={{ display: 'inline-flex', p: 3, borderRadius: '50%', backgroundColor: '#f8fafc', mb: 2 }}>
                <Search sx={{ fontSize: 48, color: '#e2e8f0' }} />
              </Box>
              <Typography variant="h3" sx={{ mb: 1 }}>No products found</Typography>
              <Typography sx={{ color: '#64748b', mb: 4 }}>Try adjusting your filters or search keywords.</Typography>
              <Button variant="contained" onClick={handleClear} sx={{ borderRadius: '24px' }}>Clear All Filters</Button>
            </Box>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};

export default ShopPage;
