import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Select, MenuItem, Chip, Skeleton, Divider, IconButton } from '@mui/material';
import { Refresh, LocalShipping, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { orderAPI } from '../services/api';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderAPI.getAllOrders();
      setOrders(res.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderAPI.updateOrderStatus(orderId, newStatus);
      toast.success('Order status updated');
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (e) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order record?')) {
      try {
        await orderAPI.deleteOrder(id);
        toast.success('Order removed');
        setOrders(prev => prev.filter(o => o._id !== id));
      } catch (err) {
        toast.error('Failed to delete order');
      }
    }
  };

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

  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h3">Manage Orders</Typography>
            <IconButton onClick={fetchOrders} sx={{ backgroundColor: '#f8fafc', '&:hover': { backgroundColor: '#e2e8f0' } }}>
              <Refresh />
            </IconButton>
          </Box>

          {loading ? (
            <Grid container spacing={3}>
              {[1, 2, 3, 4].map(i => (
                <Grid item xs={12} key={i}>
                  <Skeleton variant="rounded" height={160} sx={{ borderRadius: '16px' }} />
                </Grid>
              ))}
            </Grid>
          ) : orders.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Box sx={{ display: 'inline-flex', p: 3, borderRadius: '50%', backgroundColor: 'rgba(19,87,136,0.08)', mb: 3 }}>
                <LocalShipping sx={{ fontSize: 48, color: '#135788' }} />
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>No orders found</Typography>
              <Typography sx={{ color: '#64748b' }}>Operations will appear here once customers place orders.</Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {orders.map((order) => (
                <Grid item xs={12} md={6} key={order._id}>
                  <Box sx={{
                    p: 3, borderRadius: '16px', border: '1px solid #f1f5f9',
                    backgroundColor: '#fff', '&:hover': { borderColor: '#e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography sx={{ fontWeight: 700, mb: 0.5, color: '#135788' }}>
                          Order #{order._id.substring(order._id.length - 8).toUpperCase()}
                        </Typography>
                        <Typography sx={{ color: '#64748b', fontSize: '0.8125rem' }}>
                          {dayjs(order.createdAt).format('MMM D, YYYY h:mm A')}
                        </Typography>
                      </Box>
                      <Select
                        size="small"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        sx={{
                          borderRadius: '12px', minWidth: 120, fontSize: '0.875rem', fontWeight: 600,
                          '& .MuiSelect-select': { py: 0.75 }
                        }}
                      >
                        {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                          <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                      </Select>
                      <IconButton size="small" color="error" onClick={() => handleDelete(order._id)} sx={{ ml: 1, backgroundColor: 'rgba(211,47,47,0.05)' }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Customer</Typography>
                        <Typography sx={{ fontWeight: 600 }}>{order.user?.name || 'Guest'}</Typography>
                        <Typography sx={{ fontSize: '0.8125rem', color: '#64748b' }}>{order.user?.email || ''}</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Delivery</Typography>
                        <Typography sx={{ fontWeight: 600 }}>{order.shippingAddress.city}</Typography>
                        <Typography sx={{ fontSize: '0.8125rem', color: '#64748b' }}>{order.shippingAddress.phone}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ backgroundColor: '#f8fafc', p: 2, borderRadius: '12px' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Items ({order.items.reduce((a,b)=>a+b.quantity, 0)})</Typography>
                        <Typography sx={{ fontWeight: 800, color: '#135788' }}>₹{order.totalAmount}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 0.5 }}>
                        {order.items.map((item, idx) => (
                          <Box key={idx} sx={{ width: 40, height: 40, borderRadius: '8px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#fff' }}>
                            <img src={item.image} alt={item.name} title={`${item.name} x${item.quantity}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </Box>
                        ))}
                      </Box>
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

export default ManageOrders;
