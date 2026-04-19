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
      fontSize: '2rem',
      letterSpacing: '-0.02em'
    },
    h2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.75rem',
      letterSpacing: '-0.01em'
    },
    h3: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.35rem'
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.15rem'
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      fontSize: '1rem'
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      fontSize: '0.9rem'
    },
    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.85rem',
      lineHeight: 1.5
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '0.85rem',
      letterSpacing: '0.02em'
    },
    caption: {
      fontSize: '0.75rem',
      color: '#888'
    }
  },
  shape: {
    borderRadius: 8
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
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: '0.85rem',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          textTransform: 'none'
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(19, 87, 136, 0.25)',
            transform: 'translateY(-1px)'
          }
        },
        containedSecondary: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(207, 124, 30, 0.25)',
            transform: 'translateY(-1px)'
          }
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            transform: 'translateY(-1px)'
          }
        },
        sizeSmall: {
          padding: '6px 14px',
          fontSize: '0.8rem'
        },
        sizeLarge: {
          padding: '12px 24px',
          fontSize: '0.9rem'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0,0,0,0.10)',
            transform: 'translateY(-2px)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        },
        elevation2: {
          boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#fff',
            transition: 'all 0.2s ease',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#135788'
              }
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(19, 87, 136, 0.1)'
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
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: alpha('#135788', 0.08)
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          backgroundColor: '#fff',
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