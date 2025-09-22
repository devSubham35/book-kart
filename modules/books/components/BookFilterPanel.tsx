"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { IoChevronDown } from "react-icons/io5";

interface FilterOption {
  label: string;
  value: string;
}

interface BookFilterPanelProps {
  title: string;
  options: FilterOption[];
  selectedValues?: string[]; // array for multiple selections
  onSelect: (values: string[]) => void; // updated callback
}

const BookFilterPanel: React.FC<BookFilterPanelProps> = ({
  title,
  options,
  selectedValues = [],
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      onSelect(selectedValues.filter((v) => v !== value));
    } else {
      onSelect([...selectedValues, value]);
    }
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border rounded-xl shadow-sm bg-background mb-4"
    >
      <CollapsibleTrigger
        asChild
        className="w-full flex justify-between items-center px-4 py-3 font-semibold text-base cursor-pointer"
      >
        <button>
          {title}
          <IoChevronDown
            className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
            size={20}
          />
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="px-4 pb-4 flex flex-col">
        {options.map((opt) => {
          const isSelected = selectedValues.includes(opt.value);
          return (
            <div
              key={opt.value}
              onClick={() => toggleValue(opt.value)}
              className={`flex items-center gap-3 py-1 rounded-lg w-full text-base transition-colors cursor-pointer
                ${isSelected ? "text-primary font-semibold" : ""}`}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggleValue(opt.value)}
                className="pointer-events-none"
              />
              <span>{opt.label}</span>
            </div>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default BookFilterPanel;
