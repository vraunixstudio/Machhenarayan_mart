import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Chip, Skeleton, Divider } from '@mui/material';
import { LocalShipping } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { orderAPI } from '../services/api';
import dayjs from 'dayjs';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderAPI.getMyOrders();
        setOrders(res.data.orders);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Processing': return 'info';
      case 'Shipped': return 'primary';
      case 'Delivered': return 'success';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ py: 6 }}>
        <Container maxWidth="md">
          <Skeleton width={200} height={50} sx={{ mb: 4 }} />
          {[1, 2, 3].map(i => <Skeleton key={i} variant="rounded" height={150} sx={{ mb: 2, borderRadius: '16px' }} />)}
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 5, md: 8 }, minHeight: '70vh' }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h2" sx={{ mb: 4 }}>My Orders</Typography>

          {orders.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Box sx={{ display: 'inline-flex', p: 3, borderRadius: '50%', backgroundColor: 'rgba(19,87,136,0.08)', mb: 3 }}>
                <LocalShipping sx={{ fontSize: 48, color: '#135788' }} />
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>No orders yet</Typography>
              <Typography sx={{ color: '#64748b' }}>When you place orders, they will appear here.</Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {orders.map((order) => (
                <Grid item xs={12} key={order._id}>
                  <Box sx={{
                    p: 3, borderRadius: '16px', border: '1px solid #f1f5f9',
                    backgroundColor: '#fff', '&:hover': { borderColor: '#e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                      <Box>
                        <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Order #{order._id.substring(order._id.length - 8).toUpperCase()}</Typography>
                        <Typography sx={{ color: '#64748b', fontSize: '0.875rem' }}>Placed on {dayjs(order.createdAt).format('MMMM D, YYYY')}</Typography>
                      </Box>
                      <Chip label={order.status} color={getStatusColor(order.status)} size="small" sx={{ fontWeight: 600, borderRadius: '8px' }} />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
                      {order.items.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ width: 48, height: 48, borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f8fafc', flexShrink: 0 }}>
                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.name}</Typography>
                            <Typography sx={{ color: '#64748b', fontSize: '0.75rem' }}>Qty: {item.quantity} × ₹{item.price}</Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography sx={{ color: '#64748b', fontSize: '0.875rem' }}>Payment: {order.paymentMethod}</Typography>
                      <Typography sx={{ fontWeight: 800, color: '#135788', fontSize: '1.125rem' }}>Total: ₹{order.totalAmount}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};

export default OrderHistory;