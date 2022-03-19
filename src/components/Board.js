import React from "react";
import { useState } from "react";
import './styles/Board.css';
import Square from "./Square";

function Board() {

    var status = 'Next player: X'; // displays text
    const [board, setBoard] = useState(Array(9).fill(null));
    const [next, setNext] = useState(true);

    function handleClick(square) { // return nothing if won or on existing piece, else place piece
      const current = board.slice();
      if (hasWon(current) || current[square]) {
        return;
      }
        current[square] = next ? "X":"O";
        setBoard(current);
        next = setNext(!next);
    }

    function hasWon(board) { // returns player matching winning tiles
      const winningBoard = 
        [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
      ]
      for (let i = 0; i < winningBoard.length; i++) {
        const [a, b, c] = winningBoard[i];
        if (board[a] && (board[a] === board[b]) && (board[a] === board[c])) {
          return board[a];
        }
      }
      return null;  
    }

    const winner = hasWon(board);

    if (winner) { // displays text
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (next ? "X":"O");
    }

    function renderSquare(i) {
      return (
      <Square 
      value = {board[i]} 
      onClick = {() => handleClick(i)}/>
      );
    }
    

    return (  
        <div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <div className="status">{status}</div>
        </div>
    )
}

export default Board;