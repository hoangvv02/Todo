import React, { Component } from "react";
import { ThemeContext } from "../ThemeContext";
import "../styles/ChangeMode.css";

class ChangeMode extends Component {
  static contextType = ThemeContext;

  handleChangeMode = () => {
    const { toggleTheme } = this.context;
    toggleTheme();
  };

  render() {
    return (
      <button className="change-mode" onClick={this.handleChangeMode}>
        Change mode
      </button>
    );
  }
}

export default ChangeMode;
