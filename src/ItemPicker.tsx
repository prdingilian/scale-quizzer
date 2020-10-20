import React from "react";

type ItemPickerProps = {
  selected: boolean;
  itemName: string;
  setNewSelected: Function;
};

function ItemPicker({ selected, itemName, setNewSelected }: ItemPickerProps) {
  let className = "item";
  if (selected) {
    className += " selected";
  }
  return (
    <div className={className} onClick={() => setNewSelected(itemName)}>
      {itemName.replace(/\d+/g, "").replace(/([A-Z]+)/g, " $1")}
    </div>
  );
}

export default ItemPicker;
