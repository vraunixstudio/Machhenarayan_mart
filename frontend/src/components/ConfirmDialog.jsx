import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { WarningAmber } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel, confirmText = 'Delete', cancelText = 'Cancel', loading = false, color = 'error' }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onCancel}
      PaperProps={{
        sx: { borderRadius: '20px', p: 1, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' },
        component: motion.div,
        initial: { opacity: 0, scale: 0.9, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 20 }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 700 }}>
        <Box sx={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          width: 40, height: 40, borderRadius: '12px', 
          backgroundColor: color === 'error' ? 'rgba(211,47,47,0.1)' : 'rgba(19,87,136,0.1)',
          color: color === 'error' ? '#d32f2f' : '#135788'
        }}>
          <WarningAmber />
        </Box>
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: '#64748b' }}>{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
        <Button onClick={onCancel} disabled={loading} sx={{ color: '#64748b', fontWeight: 600 }}>
          {cancelText}
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color={color} 
          disabled={loading}
          sx={{ borderRadius: '24px', px: 3, fontWeight: 700 }}
        >
          {loading ? 'Processing...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
