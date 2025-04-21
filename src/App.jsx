import { useState, useMemo } from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  IconButton,
  Box,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import TodoList from "./components/TodoList";

const App = () => {
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#1976d2" : "#90caf9",
          },
          secondary: {
            main: mode === "light" ? "#f50057" : "#ff4081",
          },
          background: {
            default: mode === "light" ? "#e3f2fd" : "#0a1929",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
          text: {
            primary: mode === "light" ? "#1a237e" : "#ffffff",
            secondary: mode === "light" ? "#455a64" : "#b0bec5",
          },
        },
        components: {
          MuiListItem: {
            styleOverrides: {
              root: {
                "&:hover": {
                  backgroundColor:
                    mode === "light"
                      ? "rgba(25, 118, 210, 0.04)"
                      : "rgba(144, 202, 249, 0.08)",
                },
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  backgroundColor: mode === "light" ? "#ffffff" : "#1e1e1e",
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={toggleColorMode}
          color="inherit"
          sx={{
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 1000,
            backgroundColor: "background.paper",
            boxShadow: 1,
            "&:hover": {
              backgroundColor:
                mode === "light"
                  ? "rgba(0, 0, 0, 0.04)"
                  : "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        <TodoList />
      </Box>
    </ThemeProvider>
  );
};

export default App;
