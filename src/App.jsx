import React, { Component, createRef } from "react";
import Header from "./components/Header";
import ListTodo from "./components/ListTodo";
import Footer from "./components/Footer";
import ChangeMode from "./components/ChangeMode";
import { ThemeContext } from "./ThemeContext";
import "./App.css";
import Logo from "./components/Logo";
import { FILTER } from "./constant/constant";
// import Pagination from "./components/Pagination";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      selectedFilter: FILTER.ALL,
      currentPage: 1,
      todosPerPage: 5,
    };
    this.inputRef = createRef();
  }

  addTodo = (todo) => {
    this.setState({
      todos: [...this.state.todos, todo],
      newTodo: "",
    });
  };

  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  toggleTodo = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      ),
    });
  };

  toggleAllTodo = () => {
    const allCompletedTodos = this.state.todos.every((todo) => todo.done);
    if (allCompletedTodos) {
      this.setState({
        todos: this.state.todos.map((todo) => ({ ...todo, done: false })),
      });
    } else {
      this.setState({
        todos: this.state.todos.map((todo) => ({ ...todo, done: true })),
      });
    }
  };

  removeTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  removeCompletedTodos = () => {
    this.setState({
      todos: this.state.todos.filter((todo) => !todo.done),
    });
  };

  countIncompleteTodos = () => {
    return this.state.todos.filter((todo) => !todo.done).length;
  };

  updateTodo = (id, newText) => {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      ),
    });
  };

  handleFilterChange = (filter) => {
    this.setState({ selectedFilter: filter });
  };

  updateInput = (todo) => {
    this.inputRef.current.value = todo.text;
    this.inputRef.current.focus();
    this.inputRef.current.idEdit = todo.id;
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { todos, selectedFilter, todosPerPage, currentPage } = this.state;

    const { theme } = this.context;

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
            inputRef={this.inputRef}
            handleInputChange={this.handleInputChange}
            addTodo={this.addTodo}
            toggleAllTodo={this.toggleAllTodo}
            updateTodo={this.updateTodo}
          />
          <ListTodo
            // todos={currentTodos}
            todos={todos}
            toggleTodo={this.toggleTodo}
            removeTodo={this.removeTodo}
            updateTodo={this.updateTodo}
            selectedFilter={selectedFilter}
            updateInput={this.updateInput}
          />
          {/* <Pagination
            todos={todos}
            todosPerPage={todosPerPage}
            currentPage={currentPage}
            handlePageChange={this.handlePageChange}
          /> */}
          <Footer
            count={this.countIncompleteTodos}
            removeCompletedTodos={this.removeCompletedTodos}
            selectedFilter={selectedFilter}
            handleFilterChange={this.handleFilterChange}
          />
        </section>
      </div>
    );
  }
}

App.contextType = ThemeContext;

export default App;
