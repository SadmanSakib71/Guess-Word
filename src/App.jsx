import { useState } from "react";
import "./App.css";

const SECRET = "SPEND";

function App() {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState("");

  const submitGuess = () => {
    if (guess.length !== 5 || message) return;

    const upper = guess.toUpperCase();

    const updated = [...guesses, upper];
    setGuesses(updated);

    if (upper === SECRET) {
      setMessage("You've won the match!");
    } else if (updated.length === 5) {
      setMessage("You've lost the match!");
    }

    setGuess("");
  };

  const getCellClass = (letter, index) => {
    if (!letter) return "letter-cell";
    if (SECRET[index] === letter) return "letter-cell letter-cell--correct";
    if (SECRET.includes(letter)) return "letter-cell letter-cell--present";
    return "letter-cell letter-cell--absent";
  };

  return (
    <div className="game">
      {Array.from({ length: 5 }).map((_, row) => (
        <div key={row} className="board-row">
          {Array.from({ length: 5 }).map((_, col) => {
            const letter = guesses[row]?.[col] || "";

            return (
              <div key={col} className={getCellClass(letter, col)}>
                {letter}
              </div>
            );
          })}
        </div>
      ))}

      {!message && (
        <>
          <input
            value={guess}
            maxLength={5}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button onClick={submitGuess}>Guess</button>
        </>
      )}

      <h2>{message}</h2>
    </div>
  );
}

export default App;
