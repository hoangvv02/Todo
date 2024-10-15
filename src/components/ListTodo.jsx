import React from "react";
import "../styles/list.css";
import { FILTER } from "../constant/constant";
import TodoItem from "./TodoItem";
import useScrollLoadMore from "../custom hook/useScroll";
// import StyleScroll from "../HOC/StyleScroll";
// import ScrollLoadMoreData from "../HOC/ScrollLoadMoreData";

const ListTodo = ({
  todos,
  selectedFilter,
  // todosPerPage,
  toggleTodo,
  updateTodo,
  removeTodo,
  updateInput,
}) => {
  const { listRef, todosPerPage } = useScrollLoadMore(5, 5);
  const filteredTodos = todos.filter((todo) => {
    if (selectedFilter === FILTER.ACTIVE) {
      return !todo.done;
    } else if (selectedFilter === FILTER.COMPLETED) {
      return todo.done;
    } else {
      return true;
    }
  });
  return (
    <div
      ref={listRef}
      style={{ maxHeight: 320, overflowY: "auto" }}
      className="list-todo"
    >
      {filteredTodos.slice(0, todosPerPage).map((todo) => (
        <TodoItem
          key={todo.id}
          toggleTodo={toggleTodo}
          todo={todo}
          updateTodo={updateTodo}
          removeTodo={removeTodo}
          updateInput={updateInput}
        />
      ))}
    </div>
  );
};

export default ListTodo;
