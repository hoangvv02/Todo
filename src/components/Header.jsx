import React from "react";
import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Header = ({ addTodo, updateTodo, toggleAllTodo, inputRef }) => {
  const handleAddTodo = (event) => {
    event.preventDefault();
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

  return (
    <form className="header" onSubmit={handleAddTodo}>
      <span>
        <FontAwesomeIcon icon={faChevronDown} onClick={toggleAllTodo} />
      </span>
      <input type="text" ref={inputRef} placeholder="What needs to be done?" />
    </form>
  );
};

export default Header;
