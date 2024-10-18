import React from "react";
import "../HOC/styling.css";

const StyleScroll = (WrappedComponent) => {
  const style = {
    overflowY: "auto",
  };

  return (props) => {
    return (
      <div style={style} className="list-todo">
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default StyleScroll;
