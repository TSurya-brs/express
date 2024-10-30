import React, { useState } from "react";
import "./Game.css";

const choices = ["Rock", "Paper", "Scissors"];

const Game = () => {
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");

  const handleUserChoice = (choice) => {
    const computerRandomChoice =
      choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setComputerChoice(computerRandomChoice);
    determineWinner(choice, computerRandomChoice);
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResult("It's a draw!");
    } else if (
      (user === "Rock" && computer === "Scissors") ||
      (user === "Paper" && computer === "Rock") ||
      (user === "Scissors" && computer === "Paper")
    ) {
      setResult("You win!");
    } else {
      setResult("You lose!");
    }
  };

  return (
    <div className="game-container">
      <h1>Rock-Paper-Scissors</h1>
      <div className="choices">
        {choices.map((choice) => (
          <button key={choice} onClick={() => handleUserChoice(choice)}>
            {choice}
          </button>
        ))}
      </div>
      {userChoice && computerChoice && (
        <div className="results">
          <h3>Your Choice: {userChoice}</h3>
          <h3>Computer's Choice: {computerChoice}</h3>
          <h2 style={{ color: "red" }}>{result}</h2>
        </div>
      )}
    </div>
  );
};

export default Game;
