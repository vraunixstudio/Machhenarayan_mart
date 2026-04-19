import { useState, useEffect } from 'react';
// MUI Default Imports
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

// Icons
import Refresh from '@mui/icons-material/Refresh';
import LocalShipping from '@mui/icons-material/LocalShipping';
import Delete from '@mui/icons-material/Delete';

import { motion } from 'framer-motion';
import { orderAPI } from '../services/api';
import toast from 'react-hot-toast';
import ConfirmDialog from '../components/ConfirmDialog';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Confirm Dialog State
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderAPI.getAllOrders();
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error('Failed to fetch orders', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderAPI.updateOrderStatus(orderId, newStatus);
      toast.success('Order status updated');
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (e) {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteRequest = (id) => {
    setItemToDelete(id);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await orderAPI.deleteOrder(itemToDelete);
      toast.success('Order removed');
      setOrders(prev => prev.filter(o => o._id !== itemToDelete));
      setConfirmOpen(false);
      setItemToDelete(null);
    } catch (err) {
      toast.error('Failed to delete order');
    } finally {
      setDeleting(false);
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
              {[1, 2, 3].map(i => (
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
            </Box>
          ) : (
            <Grid container spacing={3}>
              {orders.map((order) => (
                <Grid item xs={12} md={6} key={order._id}>
                  <Box sx={{ p: 3, borderRadius: '16px', border: '1px solid #f1f5f9', backgroundColor: '#fff' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography sx={{ fontWeight: 700, mb: 0.5, color: '#135788' }}>
                          Order #{order._id.substring(order._id.length - 8).toUpperCase()}
                        </Typography>
                        <Chip label={order.status} size="small" color={getStatusColor(order.status)} sx={{ fontWeight: 600 }} />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Select size="small" value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} sx={{ borderRadius: '12px', minWidth: 120 }}>
                          {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (<MenuItem key={s} value={s}>{s}</MenuItem>))}
                        </Select>
                        <IconButton size="small" color="error" onClick={() => handleDeleteRequest(order._id)}><Delete fontSize="small" /></IconButton>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontSize: '0.875rem' }}>Customer: <b>{order.user?.name || 'Guest'}</b></Typography>
                      <Typography sx={{ fontWeight: 800, color: '#135788' }}>₹{order.totalAmount}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          <ConfirmDialog 
            open={confirmOpen}
            title="Remove Order Record"
            message="Are you sure you want to remove this order from the system? This action is permanent."
            onConfirm={handleDeleteConfirm}
            onCancel={() => setConfirmOpen(false)}
            loading={deleting}
          />
        </motion.div>
      </Container>
    </Box>
  );
};

export default ManageOrders;
