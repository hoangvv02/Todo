import React, { Component } from "react";
import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

class Header extends Component {
  render() {
    const { newTodo, handleInputChange, addTodo, toggleAllTodo } = this.props;
    return (
      <form className="header" onSubmit={addTodo}>
        <span>
          <FontAwesomeIcon icon={faChevronDown} onClick={toggleAllTodo} />
        </span>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

export default Header;
