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
      setMessage("You've won!");
    } else if (updated.length === 5) {
      setMessage("You've lost!");
    }

    setGuess("");
  };

  const getColor = (letter, index) => {
    if (SECRET[index] === letter) return "green";
    if (SECRET.includes(letter)) return "yellow";
    return "red";
  };

  return (
    <div style={{ padding: 20 }}>
      {Array.from({ length: 5 }).map((_, row) => (
        <div key={row} style={{ display: "flex", marginBottom: 5 }}>
          {Array.from({ length: 5 }).map((_, col) => {
            const letter = guesses[row]?.[col] || "";

            return (
              <div
                key={col}
                style={{
                  width: 50,
                  height: 50,
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 5,
                  backgroundColor: letter ? getColor(letter, col) : "white",
                }}
              >
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
