import React, { useState } from "react";
import "./Game.css";

const Square = ({ value, onClick, isWinningSquare }) => (
  <button
    className={`square ${isWinningSquare ? "winning" : ""}`}
    onClick={onClick}
  >
    {value}
  </button>
);

const Board = ({ squares, onClick, winningSquares }) => (
  <div className="board">
    {squares.map((square, index) => (
      <Square
        key={index}
        value={square}
        onClick={() => onClick(index)}
        isWinningSquare={winningSquares.includes(index)}
      />
    ))}
  </div>
);

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    const newSquares = squares.slice();
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], winningSquares: [a, b, c] };
      }
    }
    return null;
  };

  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  const winningSquares = result ? result.winningSquares : [];
  const status = winner
    ? `Winner: ${winner}`
    : squares.every((square) => square)
    ? "It's a Draw!"
    : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <div className="game">
      <h1 className="heading">Tic-Tac-Toe</h1>
      <div className="status">{status}</div>
      <Board
        squares={squares}
        onClick={handleClick}
        winningSquares={winningSquares}
      />
    </div>
  );
};

export default Game;
