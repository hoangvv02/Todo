import React, { Component } from "react";
import Header from "./components/Header";
import ListTodo from "./components/ListTodo";
import Footer from "./components/Footer";
import ChangeMode from "./components/ChangeMode";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import "./App.css";
import Logo from "./components/Logo";
import { FILTER } from "./constant/constant";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
      selectedFilter: FILTER.ALL,
    };
  }
  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  addTodo = (event) => {
    event.preventDefault();
    const { newTodo, todos } = this.state;
    if (newTodo.trim()) {
      this.setState({
        todos: [...todos, { id: Date.now(), text: newTodo, done: false }],
        newTodo: "",
      });
    }
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

  render() {
    return (
      <ThemeProvider>
        <ThemedApp
          todos={this.state.todos}
          newTodo={this.state.newTodo}
          handleInputChange={this.handleInputChange}
          addTodo={this.addTodo}
          toggleTodo={this.toggleTodo}
          toggleAllTodo={this.toggleAllTodo}
          removeTodo={this.removeTodo}
          removeCompletedTodos={this.removeCompletedTodos}
          updateTodo={this.updateTodo}
          selectedFilter={this.state.selectedFilter}
          handleFilterChange={this.handleFilterChange}
          countIncompleteTodos={this.countIncompleteTodos()}
        />
      </ThemeProvider>
    );
  }
}

class ThemedApp extends Component {
  static contextType = ThemeContext;

  componentDidMount() {
    document.body.className = this.context.theme;
  }

  componentDidUpdate() {
    document.body.className = this.context.theme;
  }

  render() {
    const {
      todos,
      newTodo,
      handleInputChange,
      addTodo,
      toggleTodo,
      toggleAllTodo,
      selectedFilter,
      handleFilterChange,
      removeCompletedTodos,
      countIncompleteTodos,
      removeTodo,
      updateTodo,
    } = this.props;

    return (
      <div className="app-content">
        <ChangeMode />
        <Logo />
        <section className="section-container">
          <Header
            newTodo={newTodo}
            handleInputChange={handleInputChange}
            addTodo={addTodo}
            toggleAllTodo={toggleAllTodo}
          />
          <ListTodo
            todos={todos}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            selectedFilter={selectedFilter}
          />
          <Footer
            count={countIncompleteTodos}
            removeCompletedTodos={removeCompletedTodos}
            selectedFilter={selectedFilter}
            handleFilterChange={handleFilterChange}
          />
        </section>
      </div>
    );
  }
}

export default App;
