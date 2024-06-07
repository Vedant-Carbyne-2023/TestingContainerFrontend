import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a custom theme instance
 const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(6, 137, 149, 0.756)', // set primary color
    },
    secondary: {
      main:  'rgba(6, 137, 149, 0.756)', // set secondary color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          "&:hover": {
            color: 'rgba(6, 137, 149, 0.756)',
            backgroundColor:'rgba(6, 137, 149, 0.09)',
        },
        textTransform:'none',
          fontFamily: '"Open Sans", serif',
          display:'flex',
          alignItems:'center',
          letterSpacing:0
        },
        "&.active": {
            backgroundColor:'rgba(6, 137, 149, 0.09)',
          },
        
      },
    },
    MuiTypography:{
        styleOverrides:{
            h4:{
                fontFamily:'"Playfair Display", serif'
            },
            h6:{
                fontFamily:'"Roboto Slab", serif'
            }
        }
    }
  },
});

export default theme
