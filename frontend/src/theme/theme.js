import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#135788',
      light: '#2a7a9e',
      dark: '#0d3d5f',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#cf7c1e',
      light: '#d9954a',
      dark: '#a66115',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#D32F2F'
    },
    success: {
      main: '#388E3C'
    },
    warning: {
      main: '#cf7c1e'
    },
    background: {
      default: '#FAFBFC',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#5a5a5a'
    },
    divider: '#e8e8e8'
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
      fontSize: '1.75rem',
      letterSpacing: '-0.02em'
    },
    h2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '-0.01em'
    },
    h3: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem'
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.1rem'
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      fontSize: '1rem'
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      fontSize: '0.85rem'
    },
    body1: {
      fontSize: '0.9rem',
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.8rem',
      lineHeight: 1.4
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      fontSize: '0.8rem',
      letterSpacing: '0.01em'
    },
    caption: {
      fontSize: '0.7rem',
      color: '#888'
    }
  },
  shape: {
    borderRadius: 16
  },
  shadows: [
    'none',
    '0 1px 2px rgba(0,0,0,0.04)',
    '0 2px 4px rgba(0,0,0,0.06)',
    '0 4px 8px rgba(0,0,0,0.08)',
    '0 6px 12px rgba(0,0,0,0.10)',
    '0 8px 16px rgba(0,0,0,0.12)',
    '0 10px 20px rgba(0,0,0,0.14)',
    '0 12px 24px rgba(0,0,0,0.16)',
    '0 14px 28px rgba(0,0,0,0.18)',
    '0 16px 32px rgba(0,0,0,0.20)',
    '0 18px 36px rgba(0,0,0,0.22)',
    '0 20px 40px rgba(0,0,0,0.24)'
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ddd',
            borderRadius: '3px'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '8px 16px',
          fontSize: '0.85rem',
          fontWeight: 600,
          transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          textTransform: 'none',
          '&:active': {
            transform: 'scale(0.95)'
          }
        },
        contained: {
          boxShadow: 'none',
          backgroundColor: '#135788',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(19, 87, 136, 0.2)',
            transform: 'translateY(-1px)'
          }
        },
        containedSecondary: {
          backgroundColor: '#cf7c1e',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(207, 124, 30, 0.2)',
            transform: 'translateY(-1px)'
          }
        },
        outlined: {
          borderWidth: '1px',
          '&:hover': {
            borderWidth: '1px',
            transform: 'translateY(-1px)'
          }
        },
        sizeSmall: {
          padding: '4px 12px',
          fontSize: '0.75rem'
        },
        sizeLarge: {
          padding: '10px 20px',
          fontSize: '0.85rem'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: 'none',
          border: '1px solid rgba(0,0,0,0.05)',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            transform: 'translateY(-2px)'
          },
          '&:active': {
            transform: 'scale(0.98)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        },
        elevation1: {
          boxShadow: 'none',
          border: '1px solid rgba(0,0,0,0.05)'
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.05)'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(245, 245, 247, 0.8)',
            transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            '&:hover': {
              backgroundColor: 'rgba(235, 235, 237, 0.9)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#cf7c1e'
              }
            },
            '&.Mui-focused': {
              backgroundColor: '#fff',
              boxShadow: 'none'
            }
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: '0.8rem'
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          '&:hover': {
            backgroundColor: alpha('#135788', 0.08)
          },
          '&:active': {
            transform: 'scale(0.92)'
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          color: '#1a1a1a'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: alpha('#135788', 0.08)
          },
          '&.Mui-selected': {
            backgroundColor: alpha('#135788', 0.12),
            '&:hover': {
              backgroundColor: alpha('#135788', 0.15)
            }
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.9rem',
          minWidth: 'auto',
          transition: 'all 0.2s ease'
        }
      }
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 600,
          fontSize: '0.7rem'
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1a1a1a',
          fontSize: '0.8rem',
          borderRadius: 6
        }
      }
    }
  }
});

export default theme;