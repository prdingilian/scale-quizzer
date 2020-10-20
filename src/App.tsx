import React, { useEffect, useState } from "react";
import "./App.css";
import "./ScalePicker";
import {
  playScale,
  getAvailableFrequencies,
  playSequence,
  getScaleTones
} from "./jazzscript/jazzscript";
import ScalePicker from "./ScalePicker";
import Keyboard from "./Keyboard";

export type QuizNote = {
  frequency: number;
  correct: boolean | undefined;
  current: boolean;
};

const frequencies = getAvailableFrequencies();

function flashScreenColor(className: string) {
  document.body.classList.add(className);
  setTimeout(() => {
    document.body.classList.remove(className);
  }, 2000);
}

function App() {
  const [keyCenter, setKeyCenter] = useState("C4");
  const [scale, setScale] = useState("Major");
  const [selectedKey, setSelectedKey] = useState(-1);
  const [quizState, setQuizState] = useState<Array<QuizNote>>([]);
  const [quizzing, setQuizzing] = useState(false);

  useEffect(() => {
    setQuizzing(false);
    setQuizState([]);
  }, [keyCenter, scale]);

  function playSingleNote(frequency: number) {
    const playNote = playSequence([frequency], 0.3);
    playNote();
    if (quizzing) {
      const currentIndex = quizState.findIndex((note) => note.current === true);
      if (frequency !== quizState[currentIndex].frequency) {
        // wrong key, failed
        setQuizzing(false);
        setQuizState([]);
        flashScreenColor('quizFailed');
      } else {
        // right key, advance the quiz to next note
        const newState = [...quizState];
        newState[currentIndex].current = false;
        newState[currentIndex].correct = true;
        if (newState[currentIndex + 1]) {
          newState[currentIndex + 1].current = true;
          setQuizState(newState);
        } else {
          // we don't have a next note, end of the quiz, passed
          setQuizzing(false);
          setQuizState([]);
         flashScreenColor('quizPassed');
        }
      }
    }
  }

  function playCurrentScale() {
    const currentScale = getScaleTones(keyCenter, scale);
    const playCurrentScale = playScale(keyCenter, scale);
    let noteCount: number = 0;
    const interval = setInterval(() => {
      if (noteCount === 8) {
        clearInterval(interval);
        setSelectedKey(-1);
      } else {
        if (noteCount === 0) {
          playCurrentScale();
        }
        const noteIndex = frequencies.findIndex(
          (i) => i === currentScale[noteCount]
        );
        setSelectedKey(noteIndex);
        noteCount++;
      }
    }, 312);
  }

  function quizCurrentScale() {
    const currentScale = getScaleTones(keyCenter, scale);
    const quizArr: Array<QuizNote> = [];
    currentScale.forEach((frequency) =>
      quizArr.push({
        frequency: frequency,
        correct: undefined,
        current: false,
      })
    );
    quizArr[0].current = true;
    setQuizState(quizArr);
    setQuizzing(true);
  }

  return (
    <div className="App">
      <h1>practice your scales</h1>
      <ScalePicker
        keyCenter={keyCenter}
        setKeyCenter={setKeyCenter}
        scale={scale}
        setScale={setScale}
      />
      <Keyboard
        selectedKey={selectedKey}
        quizzing={quizzing}
        playSingleNote={playSingleNote}
        quizState={quizState}
      />
      <div className="flexbox center">
        <button
          className="quizBtn"
          disabled={quizzing}
          onClick={() => quizCurrentScale()}
        >
          quiz
        </button>
        <button className="playBtn" onClick={() => playCurrentScale()}>
          play
        </button>
      </div>
    </div>
  );
}

export default App;
