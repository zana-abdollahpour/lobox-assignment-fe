import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@heroicons/react/24/outline";

interface OptionProps {
  text: string;
  value: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

function Option({ text, value, isSelected, onSelect }: OptionProps) {
  return (
    <li
      tabIndex={1}
      onClick={() => onSelect(value)}
      className={`select-option ${isSelected ? "select-option--selected" : ""}`}
    >
      <span>{text}</span>
      {isSelected && <CheckIcon />}
    </li>
  );
}

interface SelectProps {
  name: string;
}

export default function Select({ name }: SelectProps) {
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? "open" : "close";

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <div className="select-container">
      <label>
        <select
          className="select-menu"
          name={name}
          title={name}
          value={selected}
          hidden
        />
      </label>
      <button
        type="button"
        tabIndex={1}
        className={`select-ctrl select-ctrl--${state}`}
        onClick={handleDropdown}
      >
        <span>{name}</span>
        <ChevronDownIcon />
      </button>
      <ul className={`select-dropdown select-dropdown--${state}`}>
        <Option
          value={"-1"}
          text={"selected"}
          isSelected={true}
          onSelect={handleSelect}
        />
        {Array.from({ length: 10 }, (_, i) => i).map((opt) => (
          <Option
            value={String(opt)}
            text={String(opt)}
            isSelected={false}
            onSelect={handleSelect}
          />
        ))}
      </ul>
    </div>
  );
}
