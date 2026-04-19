import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Chip, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, Divider
} from '@mui/material';
import { Delete, Visibility, MarkEmailRead } from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { messageAPI } from '../services/api';
import dayjs from 'dayjs';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [open, setOpen] = useState(false);

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await messageAPI.deleteMessage(id);
        toast.success('Message deleted');
        fetchMessages();
      } catch (error) {
        toast.error('Delete failed');
      }
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
                    <IconButton size="small" onClick={() => handleDelete(msg._id)} color="error" sx={{ backgroundColor: 'rgba(211,47,47,0.08)' }}>
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
      </motion.div>
    </Container>
  );
};

export default ManageMessages;
