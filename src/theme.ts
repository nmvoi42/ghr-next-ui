'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#e0a030",
    },
    secondary: {
      main: "#b090ff",
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      }
    },
  },
});

export default theme;