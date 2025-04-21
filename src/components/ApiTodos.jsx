import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Checkbox,
  Button,
  CircularProgress,
  Alert,
  Paper,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ApiTodos = () => {
  const theme = useTheme();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCompleted, setShowCompleted] = useState(true);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = showCompleted
    ? todos
    : todos.filter((todo) => !todo.completed);

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        background:
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(30, 30, 30, 0.9)",
        backdropFilter: "blur(10px)",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        gap: { xs: 3, sm: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(45deg, #1976d2, #2196f3)"
                : "linear-gradient(45deg, #90caf9, #64b5f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
          }}
        >
          Sample Todos from API
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              color="primary"
            />
          }
          label="Show Completed"
          sx={{
            ml: { xs: 0, sm: "auto" },
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={fetchTodos}>
              Retry
            </Button>
          }
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      ) : (
        <List sx={{ p: 0, display: "flex", flexDirection: "column", gap: 2 }}>
          {filteredTodos.map((todo) => (
            <ListItem
              key={todo.id}
              sx={{
                bgcolor: "background.paper",
                borderRadius: 1,
                boxShadow: 1,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 2,
                  bgcolor:
                    theme.palette.mode === "light"
                      ? "rgba(25, 118, 210, 0.04)"
                      : "rgba(144, 202, 249, 0.08)",
                },
                p: { xs: 1.5, sm: 2 },
              }}
            >
              <Checkbox
                checked={todo.completed}
                disabled
                sx={{
                  color: "primary.main",
                  "&.Mui-checked": {
                    color: "primary.main",
                  },
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "text.secondary" : "text.primary",
                  flex: 1,
                  wordBreak: "break-word",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                {todo.title}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default ApiTodos;
