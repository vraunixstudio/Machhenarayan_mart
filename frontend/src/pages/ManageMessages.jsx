import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import Delete from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';
import MarkEmailRead from '@mui/icons-material/MarkEmailRead';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { messageAPI } from '../services/api';
import dayjs from 'dayjs';
import ConfirmDialog from '../components/ConfirmDialog';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [open, setOpen] = useState(false);

  // Confirm Dialog State
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await messageAPI.getMessages();
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = async (msg) => {
    setSelectedMessage(msg);
    setOpen(true);
    if (!msg.isRead) {
      try {
        await messageAPI.markAsRead(msg._id);
        setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: true } : m));
      } catch (err) {
        console.error('Error marking as read:', err);
      }
    }
  };

  const handleClose = () => { setOpen(false); setSelectedMessage(null); };

  const handleDeleteRequest = (id) => {
    setItemToDelete(id);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await messageAPI.deleteMessage(itemToDelete);
      toast.success('Message deleted');
      setConfirmOpen(false);
      setItemToDelete(null);
      fetchMessages();
    } catch (error) {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3">Customer Inquiries</Typography>
          <Typography sx={{ color: '#64748b' }}>Manage messages from the contact form</Typography>
        </Box>

        <TableContainer sx={{ borderRadius: '16px', border: '1px solid #f1f5f9', backgroundColor: '#fff', boxShadow: 'none' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>From</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map((msg) => (
                <TableRow key={msg._id} sx={{ 
                  '&:hover': { backgroundColor: '#fdfdfd' }, 
                  transition: 'all 0.2s',
                  backgroundColor: msg.isRead ? 'transparent' : 'rgba(19,87,136,0.02)'
                }}>
                  <TableCell>
                    <Chip 
                      label={msg.isRead ? 'Read' : 'New'} 
                      size="small" 
                      color={msg.isRead ? 'default' : 'primary'} 
                      sx={{ fontWeight: 600, fontSize: '0.7rem', height: 20 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: msg.isRead ? 500 : 700, fontSize: '0.875rem' }}>{msg.name}</Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>{msg.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: msg.isRead ? 500 : 700, fontSize: '0.875rem' }}>{msg.subject}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#64748b' }}>
                      {dayjs(msg.createdAt).format('MMM D, h:mm A')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpen(msg)} sx={{ mr: 1, backgroundColor: '#f8fafc' }}>
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteRequest(msg._id)} color="error" sx={{ backgroundColor: 'rgba(211,47,47,0.08)' }}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {messages.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <Typography sx={{ color: '#94a3b8' }}>Inbox is empty</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px' } }}>
          {selectedMessage && (
            <>
              <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Message Details</Typography>
                <IconButton onClick={handleClose}><MarkEmailRead /></IconButton>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" color="textSecondary">From</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{selectedMessage.name} ({selectedMessage.email})</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" color="textSecondary">Subject</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{selectedMessage.subject}</Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ p: 2, backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <Typography sx={{ whiteSpace: 'pre-wrap', color: '#334155' }}>{selectedMessage.message}</Typography>
                </Box>
                <Typography variant="caption" display="block" sx={{ mt: 2, textAlign: 'right', color: '#64748b' }}>
                  Received {dayjs(selectedMessage.createdAt).format('MMMM D, YYYY [at] h:mm A')}
                </Typography>
              </DialogContent>
              <DialogActions sx={{ p: 3 }}>
                <Button onClick={handleClose} sx={{ borderRadius: '24px' }}>Close</Button>
                <Button href={`mailto:${selectedMessage.email}`} variant="contained" sx={{ borderRadius: '24px' }}>Reply via Email</Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        <ConfirmDialog 
          open={confirmOpen}
          title="Delete Inquiry"
          message="Are you sure you want to delete this customer inquiry? This cannot be undone."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmOpen(false)}
          loading={deleting}
        />
      </motion.div>
    </Container>
  );
};

export default ManageMessages;
