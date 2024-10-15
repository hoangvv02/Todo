import React, { useState } from "react";
import "../styles/list.css";

const TodoItem = ({
  todo,
  toggleTodo,
  removeTodo,
  updateInput,
  updateTodo,
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const changeTodo = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter" && editingText.trim()) {
      updateTodo(id, editingText);
      setEditingId(null);
      setEditingText("");
    }
  };

  const handleChange = (event) => {
    setEditingText(event.target.value);
  };

  const handleBlur = () => {
    setEditingId(null);
    setEditingText("");
  };

  return (
    <>
      {editingId === todo.id ? (
        <input
          className="input-change-todo"
          value={editingText}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={(event) => handleKeyDown(event, todo.id)}
        />
      ) : (
        <div className={`item ${todo.done ? "done" : "active"}`}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleTodo(todo.id)}
          />
          <label className="item-name" onDoubleClick={() => changeTodo(todo)}>
            {todo.text}
          </label>
          <button className="button-edit" onClick={() => updateInput(todo)}>
            Sửa
          </button>
          <div className="icon-close" onClick={() => removeTodo(todo.id)}>
            x
          </div>
        </div>
      )}
    </>
  );
};

export default TodoItem;
