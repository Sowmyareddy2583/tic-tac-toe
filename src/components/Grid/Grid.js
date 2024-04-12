import { useState, useEffect } from "react";
import Card from "../Card/Card";
import "./Grid.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import isWinner from "../../helpers/checkWinner"

function Grid() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (winner) {
      toast.success(`Congratulations ${winner} won the game!`);
    }
  }, [winner]); // This effect only runs when `winner` changes.

  function play(index) {
    if (board[index] !== "" || winner) {
      return; // Prevent playing in a filled slot or after the game ends
    }
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[index] = turn ? "X" : "O";
      const win = isWinner({ board: newBoard, symbol: turn ? "X" : "O" });
      setWinner(win);
      setTurn(!turn);
      return newBoard;
    });
  }

  function reset() {
    setTurn(true);
    setBoard(Array(9).fill(""));
    setWinner(null);
  }

  return (
    <div className="grid-wrapper">
      <ToastContainer position="top-center" />
      {winner && (
        <>
          <h1 className="turn-hightlight">Winner is: {winner}</h1>
          <button className="reset" onClick={reset}>
            Reset
          </button>
        </>
      )}
      <h1 className="turn-hightlight">Current turn: {turn ? "X" : "O"}</h1>
      <div className="grid">
        {board.map((element, index) => {
          return (
            <Card
              key={index}
              onPlay={play}
              player={element}
              index={index}
              gameEnd={winner ? true : false}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Grid;
