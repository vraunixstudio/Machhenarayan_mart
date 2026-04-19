import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Category from '@mui/icons-material/Category';
import { motion } from 'framer-motion';

const CategoryCard = ({ category, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.25, 1, 0.5, 1] }}
    >
      <Box
        component={Link}
        to={`/category/${category.slug}`}
        sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5,
          textDecoration: 'none', p: 2.5,
          borderRadius: '16px', backgroundColor: '#f8fafc',
          border: '1px solid #f1f5f9',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#135788', color: '#fff',
            boxShadow: '0 8px 24px rgba(19, 87, 136, 0.2)',
            transform: 'translateY(-2px)',
            '& .cat-icon': { color: '#fff', backgroundColor: 'rgba(255,255,255,0.15)' },
            '& .cat-label': { color: '#fff' }
          },
          '&:active': { transform: 'scale(0.97)' }
        }}
      >
        <Box
          className="cat-icon"
          sx={{
            width: 56, height: 56, borderRadius: '14px',
            backgroundColor: 'rgba(19, 87, 136, 0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#135788', transition: 'all 0.3s ease',
            overflow: 'hidden'
          }}
        >
          {category.image ? (
            <Box component="img" src={category.image}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} />
          ) : (
            <Category sx={{ fontSize: 26 }} />
          )}
        </Box>
        <Typography
          className="cat-label"
          sx={{
            fontSize: '0.8125rem', fontWeight: 600, color: '#1a1a2e',
            textAlign: 'center', lineHeight: 1.2, transition: 'color 0.3s ease'
          }}
        >
          {category.name}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default CategoryCard;
