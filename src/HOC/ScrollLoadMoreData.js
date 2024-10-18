import React, { Component, createRef } from "react";

const ScrollLoadMoreData = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        todosPerPage: 5,
      };
      this.listRef = createRef();
    }

    componentDidMount() {
      this.listRef.current.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
      this.listRef.current.removeEventListener("scroll", this.handleScroll);
    }

    loadMoreTodos = () => {
      this.setState((prevState) => ({
        todosPerPage: prevState.todosPerPage + 5,
      }));
    };

    handleScroll = () => {
      if (
        this.listRef.current.scrollTop + this.listRef.current.clientHeight >=
        this.listRef.current.scrollHeight
      ) {
        this.loadMoreTodos();
      }
    };

    render() {
      const { todosPerPage } = this.state;
      return (
        <div ref={this.listRef} style={{ maxHeight: 330, overflowY: "auto" }}>
          <WrappedComponent {...this.props} todosPerPage={todosPerPage} />
        </div>
      );
    }
  };
};

export default ScrollLoadMoreData;
