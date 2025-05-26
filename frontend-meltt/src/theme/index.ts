import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Mulish",
  },
  palette: {
    primary: {
      main: "#2D1C63",
    },
    secondary: {
      main: "#DB1F8D",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        caption: {
          fontWeight: 300,
        },
        root: {
          fontFamily: "Mulish",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "Mulish",
        },
      },
    },
  },
});
