import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import { categoryAPI } from '../services/api';
import CategoryCard from '../components/CategoryCard';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getCategories();
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Box sx={{ py: { xs: 5, md: 8 } }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h1" sx={{ mb: 1.5 }}>
              Shop by <Box component="span" sx={{ color: '#cf7c1e' }}>Category</Box>
            </Typography>
            <Typography sx={{ color: '#64748b', fontSize: '1rem', maxWidth: 500, mx: 'auto' }}>
              Browse through our wide selection of fresh groceries and essentials
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 2, md: 3 }}>
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <Grid item xs={6} sm={4} md={3} key={i}>
                    <Skeleton variant="rounded" height={140} sx={{ borderRadius: '16px' }} />
                  </Grid>
                ))
              : categories.map((category, index) => (
                  <Grid item xs={6} sm={4} md={3} key={category._id}>
                    <CategoryCard category={category} index={index} />
                  </Grid>
                ))
            }
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Categories;
