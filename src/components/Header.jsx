import React, { Component } from "react";
import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

class Header extends Component {
  addTodo = (event) => {
    event.preventDefault();
    const { addTodo, updateTodo, inputRef } = this.props;
    const newTodo = inputRef.current.value.trim();

    if (newTodo && !inputRef.current.idEdit) {
      addTodo({
        id: Date.now(),
        text: newTodo,
        done: false,
      });
    } else if (newTodo && inputRef.current.idEdit) {
      updateTodo(inputRef.current.idEdit, newTodo);
    }
    inputRef.current.value = "";
    inputRef.current.idEdit = null;
  };

  render() {
    const { toggleAllTodo, inputRef } = this.props;
    return (
      <form className="header" onSubmit={this.addTodo}>
        <span>
          <FontAwesomeIcon icon={faChevronDown} onClick={toggleAllTodo} />
        </span>
        <input
          type="text"
          ref={inputRef}
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

export default Header;
