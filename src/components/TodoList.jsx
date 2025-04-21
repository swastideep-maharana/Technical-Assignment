import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Typography,
  CircularProgress,
  InputAdornment,
  useTheme,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import WarningModal from "./WarningModal";

const TodoList = () => {
  const theme = useTheme();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Load todos from localStorage
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    // Save todos to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      setShowWarning(true);
      return;
    }
    setIsLoading(true);
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
    setTimeout(() => setIsLoading(false), 500); // Simulate loading
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          background:
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.9)"
              : "rgba(30, 30, 30, 0.9)",
          backdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: "column",
          minHeight: "70vh",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: "text.primary",
            textAlign: "center",
            mb: 4,
            fontWeight: "bold",
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(45deg, #1976d2, #2196f3)"
                : "linear-gradient(45deg, #90caf9, #64b5f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Todo List
        </Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a new task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    onClick={handleAddTodo}
                    disabled={isLoading}
                    edge="end"
                  >
                    {isLoading ? <CircularProgress size={24} /> : <AddIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ flex: 1, minHeight: "300px", overflow: "auto", mb: 2 }}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <List {...provided.droppableProps} ref={provided.innerRef}>
                  {filteredTodos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            bgcolor: "background.paper",
                            mb: 1,
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
                          }}
                        >
                          <Checkbox
                            checked={todo.completed}
                            onChange={() => handleToggleComplete(todo.id)}
                            sx={{
                              color: "primary.main",
                              "&.Mui-checked": {
                                color: "primary.main",
                              },
                            }}
                          />
                          <ListItemText
                            primary={todo.text}
                            sx={{
                              textDecoration: todo.completed
                                ? "line-through"
                                : "none",
                              color: todo.completed
                                ? "text.secondary"
                                : "text.primary",
                            }}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              onClick={() => handleDeleteTodo(todo.id)}
                              sx={{
                                color: "error.main",
                                "&:hover": {
                                  backgroundColor: "error.light",
                                  transform: "scale(1.1)",
                                },
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        </Box>

        <Box sx={{ mt: "auto" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search tasks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "action.active" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Paper>

      <WarningModal open={showWarning} onClose={() => setShowWarning(false)} />
    </Box>
  );
};

export default TodoList;
