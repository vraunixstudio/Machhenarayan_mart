import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#135788',
      light: '#1a6ba5',
      dark: '#0e4268',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#cf7c1e',
      light: '#e8973e',
      dark: '#a86318',
      contrastText: '#FFFFFF'
    },
    error: { main: '#D32F2F' },
    success: { main: '#2E7D32' },
    warning: { main: '#ED6C02' },
    background: {
      default: '#0d1b2e',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1a1a2e',
      secondary: '#64748b'
    },
    divider: '#e2e8f0'
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
      letterSpacing: '-0.03em',
      lineHeight: 1.1
    },
    h2: {
      fontWeight: 700,
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      letterSpacing: '-0.02em',
      lineHeight: 1.2
    },
    h3: {
      fontWeight: 700,
      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
      letterSpacing: '-0.01em'
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.125rem'
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem'
    },
    h6: {
      fontWeight: 600,
      fontSize: '0.875rem'
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.8125rem',
      lineHeight: 1.5,
      color: '#64748b'
    },
    button: {
      fontWeight: 600,
      fontSize: '0.875rem',
      textTransform: 'none',
      letterSpacing: '0.01em'
    },
    caption: {
      fontSize: '0.75rem',
      color: '#94a3b8'
    }
  },
  shape: {
    borderRadius: 12
  },
  shadows: [
    'none',
    '0 1px 2px rgba(0,0,0,0.04)',
    '0 1px 4px rgba(0,0,0,0.06)',
    '0 2px 8px rgba(0,0,0,0.06)',
    '0 4px 12px rgba(0,0,0,0.06)',
    '0 6px 16px rgba(0,0,0,0.08)',
    '0 8px 24px rgba(0,0,0,0.08)',
    '0 12px 32px rgba(0,0,0,0.10)',
    '0 16px 40px rgba(0,0,0,0.10)',
    ...Array(16).fill('0 16px 40px rgba(0,0,0,0.10)')
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#cbd5e1',
            borderRadius: '3px'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: '10px 24px',
          fontWeight: 600,
          transition: 'all 0.25s ease',
          '&:active': { transform: 'scale(0.97)' }
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(19, 87, 136, 0.3)',
            transform: 'translateY(-1px)'
          }
        },
        containedSecondary: {
          '&:hover': {
            boxShadow: '0 4px 16px rgba(207, 124, 30, 0.3)'
          }
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': { borderWidth: '1.5px' }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          border: '1px solid #f1f5f9',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            transform: 'translateY(-2px)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 16 }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 24,
            backgroundColor: '#f8fafc',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#135788'
            }
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundColor: '#FFFFFF'
        }
      }
    }
  }
});

export default theme;