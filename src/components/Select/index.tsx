import { memo, useCallback, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@heroicons/react/24/outline";

import { toCapitalize } from "../../utils/textHelpers";

export interface Choice {
  title: string;
  value: string;
  emoji: string;
}
interface OptionProps {
  title: Choice["title"];
  value: Choice["value"];
  emoji: Choice["emoji"];
  isSelected: boolean;
  onSelect: (value: string) => void;
}

const Option = memo(function Option({
  title,
  value,
  emoji,
  isSelected,
  onSelect,
}: OptionProps) {
  return (
    <li
      tabIndex={0}
      onClick={() => onSelect(value)}
      className={`select-option ${isSelected ? "select-option--selected" : ""}`}
    >
      <span>
        {isSelected ? `Yeeeah, ${title}!` : toCapitalize(title)}
        {emoji}
      </span>
      {isSelected && <CheckIcon />}
    </li>
  );
});

interface SelectProps {
  fieldName: string;
  choices: Choice[];
}

export default function Select({ fieldName, choices }: SelectProps) {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? "open" : "close";

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = useCallback((value: string) => {
    setSelected(value);
    setIsOpen(false);
  }, []);

  return (
    <div className="select-container">
      <label>
        <select name={fieldName} title={fieldName} value={selected} hidden />
      </label>
      <button
        type="button"
        tabIndex={1}
        className={`select-ctrl select-ctrl--${state}`}
        onClick={handleDropdown}
      >
        <span>
          {selected ? toCapitalize(selected) : "Please select an option..."}
        </span>
        <ChevronDownIcon />
      </button>
      <ul
        title={fieldName}
        tabIndex={-1}
        className={`select-dropdown select-dropdown--${state}`}
      >
        {choices.map((choice) => (
          <Option
            key={choice.value}
            isSelected={choice.value === selected}
            onSelect={handleSelect}
            {...choice}
          />
        ))}
      </ul>
    </div>
  );
}
