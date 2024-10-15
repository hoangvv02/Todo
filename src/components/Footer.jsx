import React from "react";
import "../styles/footer.css";
import { FILTER } from "../constant/constant";

const Footer = ({
  count,
  removeCompletedTodos,
  selectedFilter,
  handleFilterChange,
}) => {
  return (
    <div className="footer">
      <span>{count} items left!</span>
      <ul className="filter">
        <li
          className={selectedFilter === FILTER.ALL ? "selected" : ""}
          onClick={() => handleFilterChange(FILTER.ALL)}
        >
          All
        </li>
        <li
          className={selectedFilter === FILTER.ACTIVE ? "selected" : ""}
          onClick={() => handleFilterChange(FILTER.ACTIVE)}
        >
          Active
        </li>
        <li
          className={selectedFilter === FILTER.COMPLETED ? "selected" : ""}
          onClick={() => handleFilterChange(FILTER.COMPLETED)}
        >
          Completed
        </li>
      </ul>
      <span className="clear" onClick={() => removeCompletedTodos()}>
        Clear completed
      </span>
    </div>
  );
};

export default Footer;
