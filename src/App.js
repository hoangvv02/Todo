import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import Header from "./components/Header";
import ListTodo from "./components/ListTodo";
import Footer from "./components/Footer";
import ChangeMode from "./components/ChangeMode";
import { ThemeContext } from "./ThemeContext";
import "./App.css";
import Logo from "./components/Logo";
import { FILTER } from "./constant/constant";
// import Pagination from "./components/Pagination";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(FILTER.ALL);
  const inputRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  const addTodo = async (todo) => {
    try {
      const response = await axios.post('http://localhost:5000/todos', todo); // URL của API
      setTodos([...todos, response.data]); // Thêm todo mới nhận từ server
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleInputChange = (event) => {
    inputRef.current.value = event.target.value;
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const toggleAllTodo = () => {
    const allCompletedTodos = todos.every((todo) => todo.done);
    if (allCompletedTodos) {
      setTodos(todos.map((todo) => ({ ...todo, done: false })));
    } else {
      setTodos(todos.map((todo) => ({ ...todo, done: true })));
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`); // Xóa todo trên server
      setTodos(todos.filter((todo) => todo.id !== id)); // Xóa todo khỏi state
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const removeCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.done));
  };

  const countIncompleteTodos = () => {
    return todos.filter((todo) => !todo.done).length;
  };

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const updateInput = (todo) => {
    inputRef.current.value = todo.text;
    inputRef.current.focus();
    inputRef.current.idEdit = todo.id;
  };

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // const lastTodoIndex = currentPage * todosPerPage;
  // const firstTodoIndex = lastTodoIndex - todosPerPage;
  // const currentTodos = todos.slice(firstTodoIndex, lastTodoIndex);

  return (
    <div className={`app-content ${theme}`}>
      <ChangeMode />
      <Logo />
      <section className="section-container">
        <Header
          todos={todos}
          inputRef={inputRef}
          handleInputChange={handleInputChange}
          addTodo={addTodo}
          toggleAllTodo={toggleAllTodo}
          updateTodo={updateTodo}
        />
        <ListTodo
          // todos={currentTodos}
          todos={todos}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
          selectedFilter={selectedFilter}
          updateInput={updateInput}
        />
        {/* <Pagination
          todos={todos}
          todosPerPage={todosPerPage}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        /> */}
        <Footer
          count={countIncompleteTodos}
          removeCompletedTodos={removeCompletedTodos}
          selectedFilter={selectedFilter}
          handleFilterChange={handleFilterChange}
        />
      </section>
    </div>
  );
};

export default App;
