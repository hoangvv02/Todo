import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import "../styles/ChangeMode.css";

const ChangeMode = () => {
  const { toggleTheme } = useContext(ThemeContext);

  const handleChangeMode = () => {
    toggleTheme();
  };

  return (
    <button className="change-mode" onClick={handleChangeMode}>
      Change mode
    </button>
  );
};

export default ChangeMode;
