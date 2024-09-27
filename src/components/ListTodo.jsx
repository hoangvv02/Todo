import React, { Component } from "react";
import "../styles/list.css";
import { FILTER } from "../constant/constant";

class ListTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingId: null,
      editingText: "",
    };
  }
  changeTodo = (todo) => {
    this.setState({
      editingId: todo.id,
      editingText: todo.text,
    });
  };
  handleKeyDown = (event, id) => {
    if (event.key === "Enter" && this.state.editingText.trim()) {
      this.props.updateTodo(id, this.state.editingText);
      this.setState({
        editingId: null,
        editingText: "",
      });
    }
  };

  handleChange = (event) => {
    this.setState({ editingText: event.target.value });
  };

  handleBlur = () => {
    this.setState({
      editingId: null,
      editingText: "",
    });
  };

  render() {
    const { todos, toggleTodo, removeTodo, selectedFilter } = this.props;
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
        {filteredTodos.map((todo) => (
          <>
            {this.state.editingId === todo.id ? (
              <input
                className="input-change-todo"
                value={this.state.editingText}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyDown={(event) => this.handleKeyDown(event, todo.id)}
              />
            ) : (
              <div className={`item ${todo.done ? "done" : "active"}`}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <label
                  className="item-name"
                  onDoubleClick={() => this.changeTodo(todo)}
                >
                  {todo.text}
                </label>
                <div className="icon-close" onClick={() => removeTodo(todo.id)}>
                  x
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    );
  }
}

export default ListTodo;
