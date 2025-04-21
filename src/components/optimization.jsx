import React, { useState, useCallback, memo } from "react";

const TodoItem = memo(({ todo, onDelete }) => (
  <div className="todo-item">
    <p>{todo.title}</p>
    <button onClick={onDelete}>Delete</button>
  </div>
));

function TodoList({ todos }) {
  const [items, setItems] = useState(todos);

  const handleDelete = useCallback((id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  return (
    <div className="todo-list">
      {items.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={() => handleDelete(todo.id)}
        />
      ))}
    </div>
  );
}

export default memo(TodoList);
