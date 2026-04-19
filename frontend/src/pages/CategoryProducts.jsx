import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box, Container, Typography, Grid, FormControl, InputLabel, Select,
  MenuItem, Pagination, Skeleton, Button
} from '@mui/material';
import { motion } from 'framer-motion';
import { categoryAPI, productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const CategoryProducts = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('latest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoryRes, productRes] = await Promise.all([
          categoryAPI.getCategoryBySlug(slug),
          productAPI.getProducts({ category: slug, sort, page, limit: 12 })
        ]);
        setCategory(categoryRes.data.category);
        setProducts(productRes.data.products);
        setTotalPages(productRes.data.pages);
        setTotal(productRes.data.total);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, sort, page]);

  const handleSortChange = (e) => { setSort(e.target.value); setPage(1); };
  const handlePageChange = (e, v) => { setPage(v); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <Box sx={{ py: { xs: 5, md: 8 } }}>
      <Container maxWidth="lg">
        {loading ? (
          <>
            <Skeleton width={300} height={48} sx={{ mb: 4 }} />
            <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <Skeleton variant="rounded" height={280} sx={{ borderRadius: '16px' }} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : category ? (
          <>
            {/* Category Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Box sx={{
                p: { xs: 4, md: 5 }, mb: 5, borderRadius: '20px',
                backgroundColor: '#135788', color: '#fff', position: 'relative', overflow: 'hidden'
              }}>
                <Box sx={{
                  position: 'absolute', top: -40, right: -40, width: 160, height: 160,
                  borderRadius: '50%', backgroundColor: 'rgba(207,124,30,0.15)'
                }} />
                <Typography variant="h1" sx={{ color: '#fff', mb: 1, position: 'relative', zIndex: 1 }}>
                  {category.name}
                </Typography>
                {category.description && (
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, position: 'relative', zIndex: 1 }}>
                    {category.description}
                  </Typography>
                )}
                <Typography sx={{ mt: 2, color: '#cf7c1e', fontWeight: 600, fontSize: '0.875rem', position: 'relative', zIndex: 1 }}>
                  {total} products available
                </Typography>
              </Box>
            </motion.div>

            {/* Toolbar */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
              <Typography variant="h4">All Products <Box component="span" sx={{ color: '#94a3b8', fontWeight: 400 }}>({total})</Box></Typography>
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Sort By</InputLabel>
                <Select value={sort} label="Sort By" onChange={handleSortChange}>
                  <MenuItem value="latest">Latest</MenuItem>
                  <MenuItem value="price-asc">Price: Low to High</MenuItem>
                  <MenuItem value="price-desc">Price: High to Low</MenuItem>
                  <MenuItem value="name">Name A-Z</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Products */}
            <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
              {products.length > 0 ? (
                products.map((product, i) => (
                  <Grid item xs={6} sm={4} md={3} key={product._id}>
                    <ProductCard product={product} index={i} showQuickAdd />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h4" sx={{ color: '#64748b', mb: 2 }}>No products found</Typography>
                    <Button variant="outlined" component={Link} to="/categories" sx={{ borderRadius: '24px' }}>
                      Browse Categories
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>

            {totalPages > 1 && (
              <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" size="large"
                  sx={{ '& .MuiPaginationItem-root': { borderRadius: '10px', fontWeight: 600 } }} />
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h4" sx={{ color: '#64748b' }}>Category not found</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CategoryProducts;
