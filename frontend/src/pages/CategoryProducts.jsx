import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination
} from '@mui/material';
import { motion } from 'framer-motion';
import { categoryAPI, productAPI } from '../services/api';

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
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {loading ? (
        <>
          <Skeleton width={200} height={40} sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Grid item xs={6} sm={4} md={3} key={i}>
                <Card>
                  <Skeleton variant="rectangular" height={180} />
                  <CardContent>
                    <Skeleton width="80%" />
                    <Skeleton width="60%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : category ? (
        <>
          <Box
            sx={{
              mb: 3,
              p: 3,
              borderRadius: 2,
              bgcolor: 'primary.main',
              color: 'white'
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {category.name}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              {category.description}
            </Typography>
          </Box>

          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sort}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value="latest">Latest</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                <MenuItem value="name">Name</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Grid container spacing={3}>
              {products.length > 0 ? (
                products.map((product) => (
                  <Grid item xs={6} sm={4} md={3} key={product._id}>
                    <motion.div variants={itemVariants}>
                      <Card
                        component={Link}
                        to={`/product/${product.slug}`}
                        sx={{
                          textDecoration: 'none',
                          height: '100%'
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="180"
                          image={product.images?.[0] || 'https://via.placeholder.com/300'}
                          alt={product.name}
                          sx={{ objectFit: 'cover' }}
                        />
                        <CardContent>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {product.description}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <Typography
                              variant="h6"
                              color="primary.main"
                              sx={{ fontWeight: 600 }}
                            >
                              ₹{product.price}
                            </Typography>
                            {product.originalPrice && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  textDecoration: 'line-through'
                                }}
                              >
                                ₹{product.originalPrice}
                              </Typography>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                      No products found in this category.
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </motion.div>

          {totalPages > 1 && (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Category not found.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default CategoryProducts;