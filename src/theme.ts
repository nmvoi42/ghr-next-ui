'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#e0a030",
      light: "#ffbf4f",
    },
    secondary: {
      main: "#80a0cf",
      light: "#9fbfed",
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