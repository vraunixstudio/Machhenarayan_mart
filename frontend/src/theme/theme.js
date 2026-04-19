import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0F5C8A',
      light: '#1E88E5',
      dark: '#083A63',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#E65100',
      light: '#F57C00',
      dark: '#BF360C',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828'
    },
    success: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20'
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1A202C',
      secondary: '#718096'
    }
  },
  typography: {
    fontFamily: '"Inter", "Poppins", "Roboto", sans-serif',
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      fontSize: '3rem',
      letterSpacing: '-0.02em'
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '2.5rem',
      letterSpacing: '-0.01em'
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '2rem'
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem'
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem'
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      fontSize: '1.1rem'
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontFamily: '"Inter", sans-serif'
    },
    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.5,
      fontFamily: '"Inter", sans-serif'
    },
    button: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em'
    },
    subtitle1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500
    },
    subtitle2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      fontSize: '0.875rem'
    }
  },
  shape: {
    borderRadius: 12
  },
  shadows: [
    'none',
    '0 1px 2px rgba(0,0,0,0.03), 0 1px 6px rgba(0,0,0,0.03), 0 2px 16px rgba(0,0,0,0.03)',
    '0 4px 16px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.02)',
    '0 6px 24px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.04)',
    '0 10px 32px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.06)',
    '0 16px 48px rgba(0,0,0,0.10), 0 24px 56px rgba(0,0,0,0.08)',
    '0 24px 64px rgba(0,0,0,0.12), 0 32px 72px rgba(0,0,0,0.10)'
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '14px 28px',
          fontSize: '0.95rem',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(15, 92, 138, 0.25)'
          },
          '&:active': {
            transform: 'translateY(0)'
          }
        },
        contained: {
          boxShadow: '0 4px 12px rgba(15, 92, 138, 0.2)',
          '&:hover': {
            boxShadow: '0 10px 28px rgba(15, 92, 138, 0.35)',
            transform: 'translateY(-2px)'
          }
        },
        containedSecondary: {
          boxShadow: '0 4px 12px rgba(230, 81, 0, 0.25)',
          '&:hover': {
            boxShadow: '0 10px 28px rgba(230, 81, 0, 0.4)',
            transform: 'translateY(-2px)'
          }
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            transform: 'translateY(-1px)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
            transform: 'translateY(-6px)'
          }
        }
      }
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            transition: 'all 0.25s ease',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(15, 92, 138, 0.4)'
              }
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 4px rgba(15, 92, 138, 0.12)'
            }
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.02)'
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: alpha('#0F5C8A', 0.08),
            transform: 'scale(1.1)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none'
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        },
        elevation2: {
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
        },
        elevation3: {
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
          boxShadow: '4px 0 24px rgba(0,0,0,0.1)'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)'
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }
      }
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    }
  }
});

export default theme;