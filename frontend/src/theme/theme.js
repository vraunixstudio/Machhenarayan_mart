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
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828'
    },
    success: {
      main: '#388E3C',
      light: '#66BB6A',
      dark: '#2E7D32'
    },
    warning: {
      main: '#F57C00',
      light: '#FFB74D',
      dark: '#EF6C00'
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#212121',
      secondary: '#757575'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem'
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '2rem'
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem'
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem'
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      fontSize: '1.1rem'
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      fontSize: '1rem'
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5
    },
    button: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 16
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.02)',
    '0 4px 8px rgba(0,0,0,0.04)',
    '0 8px 16px rgba(0,0,0,0.06)',
    '0 12px 24px rgba(0,0,0,0.08)',
    '0 16px 32px rgba(0,0,0,0.10)',
    '0 20px 40px rgba(0,0,0,0.12)',
    '0 24px 48px rgba(0,0,0,0.14)',
    '0 28px 56px rgba(0,0,0,0.16)',
    '0 32px 64px rgba(0,0,0,0.18)',
    '0 36px 72px rgba(0,0,0,0.20)',
    '0 40px 80px rgba(0,0,0,0.22)',
    '0 44px 88px rgba(0,0,0,0.24)',
    '0 48px 96px rgba(0,0,0,0.26)',
    '0 52px 104px rgba(0,0,0,0.28)',
    '0 56px 112px rgba(0,0,0,0.30)',
    '0 60px 120px rgba(0,0,0,0.32)',
    '0 64px 128px rgba(0,0,0,0.34)',
    '0 68px 136px rgba(0,0,0,0.36)',
    '0 72px 144px rgba(0,0,0,0.38)',
    '0 76px 152px rgba(0,0,0,0.40)',
    '0 80px 160px rgba(0,0,0,0.42)',
    '0 84px 168px rgba(0,0,0,0.44)',
    '0 88px 176px rgba(0,0,0,0.46)',
    '0 92px 184px rgba(0,0,0,0.48)'
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 28px',
          fontSize: '0.95rem',
          fontWeight: 600,
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(19, 87, 136, 0.25)',
            transform: 'translateY(-2px)'
          }
        },
        contained: {
          boxShadow: '0 2px 8px rgba(19, 87, 136, 0.2)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(19, 87, 136, 0.35)',
            transform: 'translateY(-3px)'
          }
        },
        containedSecondary: {
          '&:hover': {
            boxShadow: '0 6px 20px rgba(207, 124, 30, 0.35)',
            transform: 'translateY(-3px)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 12px 32px rgba(0,0,0,0.10)',
            transform: 'translateY(-4px)'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.2s ease',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#135788'
              }
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(19, 87, 136, 0.15)'
            }
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 500,
          transition: 'all 0.2s ease'
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: alpha('#135788', 0.08),
            transform: 'scale(1.05)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16
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
          borderRadius: 0
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }
      }
    }
  }
});

export default theme;