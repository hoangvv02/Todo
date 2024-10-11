import React, { Component } from "react";
import "../styles/list.css";
import { FILTER } from "../constant/constant";
import TodoItem from "./TodoItem";
import StyleScroll from "../HOC/StyleScroll";
import ScrollLoadMoreData from "../HOC/ScrollLoadMoreData";

class ListTodo extends Component {
  render() {
    const { todos, selectedFilter, todosPerPage } = this.props;
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
      <div className="list-todo">
        {filteredTodos.slice(0, todosPerPage).map((todo) => (
          <TodoItem
            key={todo.id}
            toggleTodo={this.props.toggleTodo}
            todo={todo}
            updateTodo={this.props.updateTodo}
            removeTodo={this.props.removeTodo}
            updateInput={this.props.updateInput}
          />
        ))}
      </div>
    );
  }
}

export default ScrollLoadMoreData(ListTodo);
