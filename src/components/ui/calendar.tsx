import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface CalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ selected, onSelect }) => {
  return (
    <div className="rounded-lg border border-gray-300 bg-white shadow p-4">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        styles={{
          day: { margin: "0.2rem" },
          caption_label: { color: "#4e1b91", fontWeight: "bold" },
        }}
      />
    </div>
  );
};
