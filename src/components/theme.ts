'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      light: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      default: '#27272A',
      paper: '#404040',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#000000',
    },

  },
  typography: {
    fontFamily: 'Sora, sans-serif',
  },
});

export default theme;