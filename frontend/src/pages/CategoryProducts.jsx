import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Chip,
  Skeleton
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryAPI, productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

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

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="xl">
        {loading ? (
          <>
            <Skeleton width={300} height={60} sx={{ mb: 4 }} />
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      pt: '120%',
                      borderRadius: 3
                    }}
                  />
                  <Skeleton width="80%" sx={{ mt: 2 }} />
                  <Skeleton width="60%" />
                </Grid>
              ))}
            </Grid>
          </>
        ) : category ? (
          <>
            {/* Category Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  mb: { xs: 5, md: 7 },
                  borderRadius: 4,
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #0F5C8A 0%, #1E88E5 100%)',
                  color: 'white'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '40%',
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    transform: 'translateX(50%)'
                  }}
                />
                <Box sx={{ p: { xs: 4, sm: 5, md: 6 }, position: 'relative', zIndex: 1 }}>
                  <Chip
                    label={category.name}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600,
                      mb: 2,
                      backdropFilter: 'blur(8px)',
                      fontSize: '0.9rem'
                    }}
                  />
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem' },
                      fontWeight: 800,
                      mb: 2,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1
                    }}
                  >
                    {category.name}
                  </Typography>
                  {category.description && (
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: '1.1rem', md: '1.2rem' },
                        opacity: 0.95,
                        maxWidth: 600,
                        lineHeight: 1.6
                      }}
                    >
                      {category.description}
                    </Typography>
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      opacity: 0.8,
                      fontSize: '0.95rem'
                    }}
                  >
                    {total} products available
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 4,
                  flexWrap: 'wrap',
                  gap: 2
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  All Products
                  <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400, ml: 1 }}>
                    ({total} items)
                  </Box>
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel id="sort-label">Sort By</InputLabel>
                    <Select
                      labelId="sort-label"
                      value={sort}
                      label="Sort By"
                      onChange={handleSortChange}
                      sx={{
                        '& .MuiSelect-select': {
                          py: 1.5
                        }
                      }}
                    >
                      <MenuItem value="latest">Latest Added</MenuItem>
                      <MenuItem value="price-asc">Price: Low to High</MenuItem>
                      <MenuItem value="price-desc">Price: High to Low</MenuItem>
                      <MenuItem value="name">Name A-Z</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <Grid item xs={6} sm={4} md={3} key={product._id}>
                      <ProductCard product={product} index={index} showQuickAdd={true} />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        py: { xs: 8, md: 12 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ color: 'text.secondary', mb: 2, fontWeight: 500 }}
                      >
                        No products found in this category
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', mb: 4 }}
                      >
                        Check back soon for new arrivals
                      </Typography>
                      <Button
                        variant="outlined"
                        component={Link}
                        to="/categories"
                        sx={{ borderWidth: 2 }}
                      >
                        Browse All Categories
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Box
                  sx={{
                    mt: { xs: 6, md: 8 },
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        borderRadius: 2,
                        fontWeight: 600
                      }
                    }}
                  />
                </Box>
              </motion.div>
            )}
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: { xs: 8, md: 12 } }}>
            <Typography variant="h5" color="text.secondary">
              Category not found.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CategoryProducts;
