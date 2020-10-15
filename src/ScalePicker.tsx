import React from "react";
import { getAvailableNotes, getAvailableScales } from "./jazzscript/jazzscript";
import KeyPicker from "./KeyPicker";

type ScalePickerProps = {
  keyCenter: string;
  setKeyCenter: Function;
  scale: string;
  setScale: Function;
};

const notes = getAvailableNotes().slice(0, 12);
const scales = getAvailableScales();

function ScalePicker({
  keyCenter,
  setKeyCenter,
  scale,
  setScale,
}: ScalePickerProps) {
  return (
    <div className="flexbox space-around">
      <div className="items">
        {notes.map((currentNote) => (
          <KeyPicker
            key={currentNote}
            selected={keyCenter === currentNote}
            current={currentNote}
            setCurrent={setKeyCenter}
          />
        ))}
      </div>
      <div className="items">
        {scales.map((currentScale) => (
          <KeyPicker
            key={currentScale}
            selected={currentScale === scale}
            current={currentScale}
            setCurrent={setScale}
          />
        ))}
      </div>
    </div>
  );
}

export default ScalePicker;
