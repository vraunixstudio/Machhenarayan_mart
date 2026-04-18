import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
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
    borderRadius: 12
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.05)',
    '0 2px 8px rgba(0,0,0,0.08)',
    '0 4px 12px rgba(0,0,0,0.1)',
    '0 6px 16px rgba(0,0,0,0.12)',
    '0 8px 20px rgba(0,0,0,0.14)',
    '0 10px 24px rgba(0,0,0,0.16)',
    '0 12px 28px rgba(0,0,0,0.18)',
    '0 14px 32px rgba(0,0,0,0.20)',
    '0 16px 36px rgba(0,0,0,0.22)',
    '0 18px 40px rgba(0,0,0,0.24)',
    '0 20px 44px rgba(0,0,0,0.26)',
    '0 22px 48px rgba(0,0,0,0.28)',
    '0 24px 52px rgba(0,0,0,0.30)',
    '0 26px 56px rgba(0,0,0,0.32)',
    '0 28px 60px rgba(0,0,0,0.34)',
    '0 30px 64px rgba(0,0,0,0.36)',
    '0 32px 68px rgba(0,0,0,0.38)',
    '0 34px 72px rgba(0,0,0,0.40)',
    '0 36px 76px rgba(0,0,0,0.42)',
    '0 38px 80px rgba(0,0,0,0.44)',
    '0 40px 84px rgba(0,0,0,0.46)',
    '0 42px 88px rgba(0,0,0,0.48)',
    '0 44px 92px rgba(0,0,0,0.50)',
    '0 46px 96px rgba(0,0,0,0.52)'
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          transition: 'all 0.2s ease-in-out'
        },
        contained: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            transform: 'translateY(-1px)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            transform: 'translateY(-2px)'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    }
  }
});

export default theme;