import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Chip, Rating, Avatar
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { reviewAPI } from '../services/api';
import dayjs from 'dayjs';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchReviews(); }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await reviewAPI.getAllReviews();
      setReviews(res.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewAPI.deleteReview(id);
        toast.success('Review deleted');
        fetchReviews();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3">Manage Reviews</Typography>
          <Typography sx={{ color: '#64748b' }}>Monitor and moderate customer feedback</Typography>
        </Box>

        <TableContainer sx={{ borderRadius: '16px', border: '1px solid #f1f5f9', backgroundColor: '#fff', boxShadow: 'none' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Rating</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Comment</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review._id} sx={{ '&:hover': { backgroundColor: '#fdfdfd' }, transition: 'all 0.2s' }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem', backgroundColor: '#135788' }}>
                        {review.user?.name?.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{review.user?.name}</Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>{review.user?.email}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>{review.product?.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Rating value={review.rating} readOnly size="small" />
                  </TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#334155' }}>{review.comment}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#64748b' }}>
                      {dayjs(review.createdAt).format('MMM D, YYYY')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleDelete(review._id)} color="error" sx={{ backgroundColor: 'rgba(211,47,47,0.08)' }}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {reviews.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <Typography sx={{ color: '#94a3b8' }}>No reviews found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </Container>
  );
};

export default ManageReviews;
