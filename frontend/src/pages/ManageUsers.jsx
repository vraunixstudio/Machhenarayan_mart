import { useState, useEffect } from 'react';
// MUI Default Imports
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

// Icons
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Delete from '@mui/icons-material/Delete';

import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { userAPI } from '../services/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getUsers();
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async (id) => {
    try {
      await userAPI.promoteUser(id);
      toast.success('User role updated');
      fetchUsers();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      try {
        await userAPI.deleteUser(id);
        toast.success('User removed');
        fetchUsers();
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3">Manage Users</Typography>
        </Box>

        <TableContainer sx={{ borderRadius: '16px', border: '1px solid #f1f5f9', backgroundColor: '#fff', boxShadow: 'none' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && users.map((user) => (
                <TableRow key={user._id} sx={{ '&:hover': { backgroundColor: '#fdfdfd' }, transition: 'all 0.2s' }}>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{user.name}</TableCell>
                  <TableCell sx={{ color: '#64748b' }}>{user.email}</TableCell>
                  <TableCell>
                    <Chip label={user.role} color={user.role === 'admin' ? 'primary' : 'default'} size="small" sx={{ borderRadius: '8px', fontWeight: 600, textTransform: 'capitalize' }} />
                  </TableCell>
                  <TableCell>
                    <Chip label={user.isActive ? 'Active' : 'Inactive'} color={user.isActive ? 'success' : 'error'} size="small" sx={{ borderRadius: '8px', fontWeight: 600 }} />
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="outlined" startIcon={user.role === 'admin' ? <ArrowDownward /> : <ArrowUpward />} onClick={() => handlePromote(user._id)} sx={{ borderRadius: '24px', mr: 1 }}>
                      {user.role === 'admin' ? 'Demote' : 'Promote'}
                    </Button>
                    <IconButton size="small" color="error" onClick={() => handleDelete(user._id)} sx={{ backgroundColor: 'rgba(211,47,47,0.08)' }}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </Container>
  );
};

export default ManageUsers;