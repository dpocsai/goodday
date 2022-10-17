import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Rubik",
  },
  palette: {
    primary: {
      main: "#2C3639",
      contrastText: "#DCD7C9",
    },
    secondary: {
      main: "#A27B5C",
      contrastText: "#2C3639",
    },
    background: {
      paper: "#DCD7C9",
      default: "#2C3639",
    },
    error: {
      main: "#C84B31",
    },
    warning: {
      main: "#EBA83A",
    },
    success: {
      main: "#519259",
    },
  },
});

export default theme;
