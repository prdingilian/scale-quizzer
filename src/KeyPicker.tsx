import React from "react";

type KeyPickerProps = {
  selected: boolean;
  current: string;
  setCurrent: Function;
};

function KeyPicker({ selected, current, setCurrent }: KeyPickerProps) {
  let className = "item";
  if (selected) {
    className += " selected";
  }
  return (
    <div className={className} onClick={() => setCurrent(current)}>
      {current.replace(/\d+/g, "").replace(/([A-Z]+)/g, " $1")}
    </div>
  );
}

export default KeyPicker;
