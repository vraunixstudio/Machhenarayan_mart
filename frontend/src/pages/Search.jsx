import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Skeleton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Chip,
  Paper
} from '@mui/material';
import {
  Search,
  FilterList,
  Clear
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { productAPI, categoryAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getCategories();
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!initialQuery) {
      setHasSearched(false);
      return;
    }

    const searchProducts = async () => {
      try {
        setLoading(true);
        const params = {
          q: initialQuery,
          category: initialCategory || undefined,
          minPrice: priceRange[0],
          maxPrice: priceRange[1]
        };
        const response = await productAPI.searchProducts(params);
        setProducts(response.data.products);
        setHasSearched(true);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    };

    searchProducts();
  }, [initialQuery, initialCategory, priceRange]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({
        q: searchQuery,
        ...(category && { category })
      });
      setSearchQuery(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setCategory('');
    setPriceRange([0, 5000]);
    setSearchParams({});
    setProducts([]);
    setHasSearched(false);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    if (initialQuery) {
      setSearchParams({
        q: initialQuery,
        ...(value && { category: value })
      });
    }
  };

  const activeFiltersCount = (category ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0);

  return (
    <Box sx={{ py: { xs: 3, md: 6 } }}>
      <Container maxWidth="xl">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Box sx={{ mb: 5 }}>
            <form onSubmit={handleSearch}>
              <TextField
                fullWidth
                size="large"
                placeholder="Search for fresh groceries, fruits, vegetables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setSearchQuery('')}
                        size="small"
                      >
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    backgroundColor: 'white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    '&:hover': {
                      boxShadow: '0 6px 24px rgba(0,0,0,0.1)'
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 8px 32px rgba(15, 92, 138, 0.15)'
                    }
                  }
                }}
              />
            </form>
          </Box>
        </motion.div>

        {/* Filters */}
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 3,
                backgroundColor: 'grey.50',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <FilterList sx={{ color: 'primary.main' }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Filters
                </Typography>
                {activeFiltersCount > 0 && (
                  <Chip
                    label={`${activeFiltersCount} active`}
                    size="small"
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                )}
              </Box>

              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      value={category}
                      label="Category"
                      onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                      <MenuItem value="">All Categories</MenuItem>
                      {categories.map((cat) => (
                        <MenuItem key={cat._id} value={cat.slug}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                      Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                    </Typography>
                    <Slider
                      value={priceRange}
                      onChange={(e, newValue) => {
                        setPriceRange(newValue);
                        if (initialQuery) {
                          setSearchParams({
                            q: initialQuery,
                            ...(category && { category }),
                            minPrice: newValue[0],
                            maxPrice: newValue[1]
                          });
                        }
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={5000}
                      step={50}
                      sx={{
                        '& .MuiSlider-thumb': {
                          width: 20,
                          height: 20
                        }
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                    {(category || priceRange[0] > 0 || priceRange[1] < 5000) && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Clear />}
                        onClick={handleClear}
                        sx={{ borderRadius: 2 }}
                      >
                        Clear All
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        )}

        {/* Results */}
        {hasSearched && (
          <>
            {loading ? (
              <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <Grid item xs={6} sm={4} md={3} key={i}>
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        pt: '100%',
                        borderRadius: 3
                      }}
                    />
                    <Skeleton width="80%" sx={{ mt: 2 }} />
                    <Skeleton width="60%" />
                  </Grid>
                ))}
              </Grid>
            ) : products.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Results Count */}
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    Found <strong>{products.length}</strong> product{products.length !== 1 ? 's' : ''} for "{initialQuery}"
                  </Typography>
                </Box>

                {/* Grid */}
                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                  {products.map((product, index) => (
                    <Grid item xs={6} sm={4} md={3} key={product._id}>
                      <ProductCard product={product} index={index} showQuickAdd />
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
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
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: 'text.primary'
                    }}
                  >
                    No products found
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      mb: 4,
                      maxWidth: 500
                    }}
                  >
                    We couldn't find any products matching your search. Try adjusting your filters or search terms.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleClear}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontWeight: 600
                    }}
                  >
                    Clear Filters
                  </Button>
                </Box>
              </motion.div>
            )}
          </>
        )}

        {/* Initial State */}
        {!hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                textAlign: 'center',
                py: { xs: 10, md: 16 },
                px: 4
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(15, 92, 138, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 4
                }}
              >
                <Search sx={{ fontSize: 48, color: 'primary.main' }} />
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '1.8rem', md: '2.5rem' }
                }}
              >
                Search Our Products
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontSize: '1.1rem'
                }}
              >
                Find fresh fruits, vegetables, dairy products, and more. Enter keywords to search through our catalog.
              </Typography>
            </Box>
          </motion.div>
        )}
      </Container>
    </Box>
  );
};

export default SearchPage;
