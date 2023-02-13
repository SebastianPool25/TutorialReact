/*Comentarios Iverson Gabriel Mex Pech*/

/* Libreria de react que permite "recordarle" al cuadrado el estado en el que esta*/
import { useState } from 'react';

/*Se crea componente que sirve para imprimir los recuadros del tablero
Tiene un accesorio que sirve para detectar si el recuadro esta vacio o existe algo dentro de ella*/
function Square({ value, onSquareClick }) {
  return (
    /*Botón que detecta si se le hace click encima a un cuadro*/
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
/*Función que crea el tablero de juego*/
function Board({ xIsNext, squares, onPlay }) {
  /*Función que define el orden en el que apareceran las (X o O)*/
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    /*Condicion que controla que va a aparecer en el tablero*/
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  /*Función que define al ganador del juego en base si hay mas turnos por jugar*/
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  /*Se agrupan los recuadros en filas de 3, y dependiendo lo que este en la función valor determina si hay (X o O) o no hay nada*/
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

/*Función (Game )accesible desde los otros archivos que a su vez determina el valor que tendran los recuadros*/
export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  /*Guarda en una variable el estado del tablero*/
  const [currentMove, setCurrentMove] = useState(0);
  /*Variable que le da funcionalidad a los botones de avanzar y reiniciar el juego*/
  const xIsNext = currentMove % 2 === 0;
  /*Muestra en el tablero el movimiento actual*/
  const currentSquares = history[currentMove];

  /*Función que permite seguir el juego a partir de los movimientos anteriores*/
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  /*Función que permite asignar el siguiente movimiento*/
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  /*Función para mostrar los movimientos pasados*/
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

/*Funcion que determina al ganador a traves de una matriz*/
function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
