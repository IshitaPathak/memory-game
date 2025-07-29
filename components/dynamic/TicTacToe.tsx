import React from "react";
function TicTacToe() {
  const [board, setBoard] = React.useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true);
  const [winner, setWinner] = React.useState(null);

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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  React.useEffect(() => {
    setWinner(calculateWinner(board));
  }, [board]);

  const handleClick = (i) => {
    if (winner || board[i]) {
      return;
    }

    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const renderSquare = (i) => {
    return (
      <button
        className="w-20 h-20 text-5xl font-bold bg-zinc-900 text-white border-zinc-800 border rounded hover:bg-zinc-700 focus:outline-none"
        onClick={() => handleClick(i)}
      >
        {board[i]}
      </button>
    );
  };

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-black">
      <div className="text-white text-xl mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button
        className="mt-6 px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-700 focus:outline-none"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
}
export default TicTacToe;