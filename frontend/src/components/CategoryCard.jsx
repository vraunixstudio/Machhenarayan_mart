import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Skeleton
} from '@mui/material';
import { motion } from 'framer-motion';

const CategoryCard = ({ category, index = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <Card
        component={Link}
        to={`/category/${category.slug}`}
        sx={{
          textDecoration: 'none',
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
            '& .category-overlay': {
              opacity: 1
            },
            '& .category-image': {
              transform: 'scale(1.08)'
            }
          }
        }}
      >
        {/* Image Container */}
        <Box
          sx={{
            position: 'relative',
            paddingTop: '100%',
            overflow: 'hidden',
            backgroundColor: '#F0F4F8'
          }}
        >
          {!imageLoaded && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E2E8F0'
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: '#CBD5E0',
                  animation: 'pulse 1.5s infinite'
                }}
              />
            </Box>
          )}

          <CardMedia
            component="img"
            image={category.image || 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&q=80'}
            alt={category.name}
            className="category-image"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: imageLoaded ? 1 : 0,
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease'
            }}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradient Overlay */}
          <Box
            className="category-overlay"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '70%',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
              opacity: 0.8,
              transition: 'opacity 0.3s ease'
            }}
          />
        </Box>

        {/* Content */}
        <CardContent
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            color: 'white',
            zIndex: 1
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.1rem',
              lineHeight: 1.2,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {category.name}
          </Typography>

          {category.description && (
            <Typography
              variant="body2"
              sx={{
                opacity: 0.9,
                fontSize: '0.85rem',
                mt: 0.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {category.description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CategoryCard;
