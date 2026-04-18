import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Skeleton
} from '@mui/material';
import { Category } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { categoryAPI } from '../services/api';

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Shop by Category
      </Typography>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <Card>
                    <Skeleton variant="rectangular" height={150} />
                    <CardContent>
                      <Skeleton width="60%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : categories.map((category) => (
                <Grid item xs={6} sm={4} md={3} key={category._id}>
                  <motion.div variants={itemVariants}>
                    <Card
                      component={Link}
                      to={`/category/${category.slug}`}
                      sx={{
                        textDecoration: 'none',
                        height: '100%'
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="150"
                        image={category.image || 'https://via.placeholder.com/300'}
                        alt={category.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                          {category.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {category.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Categories;