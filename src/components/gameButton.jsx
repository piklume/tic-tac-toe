import React from "react";

const GameButton = ({ id, value, onClick }) => {
  return (
    <button
      data-testid={"button-" + id}
      id={id}
      disabled={value !== "/"}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default GameButton;
