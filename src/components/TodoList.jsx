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
  Button,
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
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          background:
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.9)"
              : "rgba(30, 30, 30, 0.9)",
          backdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: "column",
          gap: { xs: 3, sm: 4 },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: "text.primary",
            textAlign: "center",
            mb: 2,
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

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 1 },
            alignItems: { xs: "stretch", sm: "center" },
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddTodo}
            sx={{
              minWidth: { xs: "100%", sm: "auto" },
              whiteSpace: "nowrap",
            }}
          >
            Add Todo
          </Button>
        </Box>

        <Box sx={{ flex: 1, minHeight: "300px", overflow: "auto" }}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <List
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{
                    p: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {filteredTodos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            bgcolor: "background.paper",
                            borderRadius: 1,
                            boxShadow: snapshot.isDragging ? 3 : 1,
                            transition: "all 0.2s ease-in-out",
                            p: { xs: 1.5, sm: 2 },
                            "&:hover": {
                              transform: snapshot.isDragging
                                ? "scale(1.02)"
                                : "translateY(-2px)",
                              boxShadow: 2,
                              bgcolor:
                                theme.palette.mode === "light"
                                  ? "rgba(25, 118, 210, 0.04)"
                                  : "rgba(144, 202, 249, 0.08)",
                            },
                            opacity: snapshot.isDragging ? 0.8 : 1,
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
                          <Typography
                            variant="body1"
                            sx={{
                              textDecoration: todo.completed
                                ? "line-through"
                                : "none",
                              color: todo.completed
                                ? "text.secondary"
                                : "text.primary",
                              flex: 1,
                              wordBreak: "break-word",
                              pr: { xs: 0, sm: 2 },
                            }}
                          >
                            {todo.text}
                          </Typography>
                          <IconButton
                            onClick={() => handleDeleteTodo(todo.id)}
                            sx={{
                              color: "error.main",
                              "&:hover": {
                                backgroundColor: "error.light",
                                color: "error.contrastText",
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
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

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 1 },
            alignItems: { xs: "stretch", sm: "center" },
            mt: "auto",
            pt: 2,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
              },
            }}
          />
          <Button
            variant="outlined"
            onClick={() => setSearchTerm("")}
            sx={{
              minWidth: { xs: "100%", sm: "auto" },
              whiteSpace: "nowrap",
            }}
          >
            Clear Search
          </Button>
        </Box>
      </Paper>

      <WarningModal open={showWarning} onClose={() => setShowWarning(false)} />
    </Box>
  );
};

export default TodoList;
