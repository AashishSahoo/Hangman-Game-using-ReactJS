import React, { useState, useEffect } from "react";
import "./App.css";
import Word from "./components/Word";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Header from "./components/header";
import { showNotification as show } from "./Helper/helper";
import Notification from "./components/Notification";
import Popup from "./components/Popup";
// Rainbow

const words = [
  "application",
  "Lighthouse",
  "Library",
  "Guitar",
  "Watermelon",
  "Chocolate",
  "Adventure",
  "Butterfly",
  "Umbrella",
  "Cupcake",
  "Keyboard",
  "Universe",
  "Detective",
  "Sandwich",
  "Mountain",
  "history",
  "interface",
  "wizard",
  "programming",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetter] = useState([]);
  const [wrongLetters, setwrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handlekeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetter((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setwrongLetters((wrongLetters) => [...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handlekeydown);
    return () => window.removeEventListener("keydown", handlekeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // empty arrays
    setCorrectLetter([]);
    setwrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
