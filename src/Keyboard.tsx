import React from "react";
import { getAvailableFrequencies } from "./jazzscript/jazzscript";
import { QuizNote } from "./App";

type KeyboardProps = {
  selectedKey: number;
  quizzing: boolean;
  playSingleNote: Function;
  quizState: Array<QuizNote>;
};

function isBlackKey(index: number) {
  if (index > 11) {
    index -= 12;
  }
  return (index <= 4 && index % 2 !== 0) || (index > 4 && index % 2 === 0);
}

function Keyboard({
  selectedKey,
  quizzing,
  playSingleNote,
  quizState
}: KeyboardProps) {
  const keys = getAvailableFrequencies();

  function getKeyClass(index: number): string {
    let className = "";

    if (isBlackKey(index)) {
      className += "blackKey";
    } else {
      className += "whiteKey";
    }
    if (selectedKey === index) {
      className += " selectedKey";
    }
    if (quizzing) {
      const currentIndex = quizState.findIndex((note) => note.current === true);
      const currentFrequency = quizState[currentIndex].frequency;
      const quizScaleFrequencies = quizState.map(quizStep => quizStep.frequency);
      if (
        keys[index] < currentFrequency &&
        quizScaleFrequencies.includes(keys[index])
      ) {
        className += " successKey";
      }
    }
    return className;
  }

  return (
    <div className="keyboard">
      {keys.map((frequency, i) => (
        <div
          key={i}
          onClick={() => playSingleNote(frequency)}
          className={getKeyClass(i)}
        ></div>
      ))}
    </div>
  );
}

export default Keyboard;
