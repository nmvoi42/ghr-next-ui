'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#ffc030",
    },
    secondary: {
      main: "#af90ff",
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