import React, { useState } from "react";
import TicTacToeGame from "./ticTacToeGame";

const TicTacToeWrapperStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "5rem",
  padding: "2rem"
};

const TicTacToeWrapper = () => {
  const [winner, setWinner] = useState(null);

  const gameCallback = (value) => {
    let winnerName;
    switch (value) {
      case "X":
        winnerName = "Cross";
        break;
      case "O":
        winnerName = "Circle";
        break;
      case "D":
        winnerName = "Draw";
        break;
      default:
    }
    setWinner(winnerName);
  };

  const resetWinner = () => setWinner(null);

  return (
    <div style={TicTacToeWrapperStyles}>
      <h2>Tic-Tac-Toe</h2>
      {winner && (
        <h2 data-testid="winner" style={{ color: "red" }}>
          {winner === "Draw" ? winner : `${winner} Is Winner`}
        </h2>
      )}
      <TicTacToeGame gameCallback={gameCallback} resetWinner={resetWinner} />
    </div>
  );
};

export default TicTacToeWrapper;
