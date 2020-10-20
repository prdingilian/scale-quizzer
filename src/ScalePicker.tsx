import React from "react";
import { getAvailableNotes, getAvailableScales } from "./jazzscript/jazzscript";
import ItemPicker from "./ItemPicker";

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
          <ItemPicker
            key={currentNote}
            selected={keyCenter === currentNote}
            itemName={currentNote}
            setNewSelected={setKeyCenter}
          />
        ))}
      </div>
      <div className="items">
        {scales.map((currentScale) => (
          <ItemPicker
            key={currentScale}
            selected={currentScale === scale}
            itemName={currentScale}
            setNewSelected={setScale}
          />
        ))}
      </div>
    </div>
  );
}

export default ScalePicker;
