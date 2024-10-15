import React, { useState, useEffect } from "react";
import "../styles/pagination.css";

const Pagination = ({ todos, todosPerPage, currentPage, handlePageChange }) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    updatePageNumbers();
  }, [todos.length]);

  const updatePageNumbers = () => {
    const totalPages = Math.ceil(todos.length / todosPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    setPageNumbers(pageNumbers);
  };

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
