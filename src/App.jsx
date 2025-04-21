import { useState, useMemo } from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  IconButton,
  Box,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import TodoList from "./components/TodoList";
import ApiTodos from "./components/ApiTodos";

const App = () => {
  const [mode, setMode] = useState("light");
  const [tabValue, setTabValue] = useState(0);

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
          MuiTab: {
            styleOverrides: {
              root: {
                textTransform: "none",
                fontWeight: "bold",
                minWidth: "auto",
                padding: "8px 16px",
                fontSize: "0.875rem",
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          background:
            mode === "light"
              ? "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)"
              : "linear-gradient(135deg, #0a1929 0%, #001e3c 100%)",
          p: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <IconButton
          onClick={toggleColorMode}
          color="inherit"
          sx={{
            position: "fixed",
            top: { xs: 8, sm: 16 },
            right: { xs: 8, sm: 16 },
            zIndex: 1000,
            backgroundColor: "background.paper",
            boxShadow: 2,
            "&:hover": {
              backgroundColor:
                mode === "light"
                  ? "rgba(25, 118, 210, 0.04)"
                  : "rgba(144, 202, 249, 0.08)",
              transform: "scale(1.1)",
              transition: "transform 0.2s ease-in-out",
            },
          }}
        >
          {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>

        <Box
          sx={{
            maxWidth: { xs: "100%", sm: 600, md: 800 },
            mx: "auto",
            width: "100%",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              mb: { xs: 2, sm: 3 },
              borderRadius: 2,
              background:
                mode === "light"
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(30, 30, 30, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              sx={{
                "& .MuiTabs-indicator": {
                  height: 2,
                },
                minHeight: { xs: "40px", sm: "48px" },
                "& .MuiTab-root": {
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  padding: { xs: "6px 12px", sm: "8px 16px" },
                },
              }}
            >
              <Tab label="My Todos" />
              <Tab label="Sample Todos" />
            </Tabs>
          </Paper>

          {tabValue === 0 ? <TodoList /> : <ApiTodos />}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
