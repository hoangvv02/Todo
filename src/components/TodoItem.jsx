import React, { Component } from "react";
import "../styles/list.css";

class TodoItem extends Component {
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
    const { todo, toggleTodo, removeTodo, updateInput } = this.props;

    return (
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
  }
}

export default TodoItem;
