import React, { Component } from "react";
import "../styles/pagination.css";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumbers: [],
    };
  }
  componentDidMount() {
    this.updatePageNumbers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.todos.length !== this.props.todos.length) {
      this.updatePageNumbers();
    }
  }

  updatePageNumbers() {
    const totalPages = Math.ceil(
      this.props.todos.length / this.props.todosPerPage
    );
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    this.setState({ pageNumbers });
  }

  render() {
    const { currentPage, handlePageChange } = this.props;

    return (
      <div className="pagination">
        {this.state.pageNumbers.map((number) => (
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
  }
}

export default Pagination;
