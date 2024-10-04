import React, { Component } from "react";
import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

class Header extends Component {
  addTodo = (event) => {
    event.preventDefault();
    const { isEditInput, addTodo, updateTodo, idEdit, inputRef } = this.props;
    const newTodo = inputRef.current.value.trim();

    if (newTodo && !isEditInput) {
      addTodo({
        id: Date.now(),
        text: newTodo,
        done: false,
      });
    } else if (newTodo && isEditInput) {
      updateTodo(idEdit, newTodo);
    }
    inputRef.current.value = "";
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
