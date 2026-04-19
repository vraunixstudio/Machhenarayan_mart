import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Skeleton
} from '@mui/material';
import { motion } from 'framer-motion';
import { categoryAPI } from '../services/api';
import CategoryCard from '../components/CategoryCard';

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
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #0F5C8A 0%, #1E88E5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2
                }}
              >
                Shop by Category
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.2rem',
                  color: 'text.secondary',
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Browse through our wide selection of fresh groceries and essentials
              </Typography>
            </Box>
          </motion.div>

          {/* Grid */}
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <Grid item xs={6} sm={4} md={3} key={i}>
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        pt: '100%',
                        borderRadius: 3
                      }}
                    />
                  </Grid>
                ))
              : categories.map((category, index) => (
                  <Grid item xs={6} sm={4} md={3} key={category._id}>
                    <motion.div variants={itemVariants}>
                      <CategoryCard category={category} index={index} />
                    </motion.div>
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
