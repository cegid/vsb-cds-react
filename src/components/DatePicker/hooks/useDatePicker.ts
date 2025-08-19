import { useState } from "react";
import { Locale } from "./useCalendar";

interface UseDatePickerProps {
  value?: Date | [Date?, Date?];
  onChange?: (date: Date | null | [Date?, Date?]) => void;
  isDateRange?: boolean;
  locale?: Locale;
}

export const useDatePicker = ({
  value,
  onChange,
  isDateRange = false,
  locale = "fr",
}: UseDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [tempValue, setTempValue] = useState<Date | [Date?, Date?] | undefined>(
    value
  );
  const [initialValue, setInitialValue] = useState<
    Date | [Date?, Date?] | undefined
  >(value);
  const [displayValue, setDisplayValue] = useState<
    Date | [Date?, Date?] | undefined
  >(value);
  const [selectedTab, setSelectedTab] = useState(0);
  const [hours, setHours] = useState<number | undefined>();
  const [minutes, setMinutes] = useState<number | undefined>();
  const [hoursInput, setHoursInput] = useState("");
  const [minutesInput, setMinutesInput] = useState("");
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [rangeSelection, setRangeSelection] = useState<"start" | "end">(
    "start"
  );

  const localeLabels = {
    fr: { cancel: "Annuler", ok: "Valider" },
    en: { cancel: "Cancel", ok: "OK" },
    de: { cancel: "Abbrechen", ok: "OK" },
    es: { cancel: "Cancelar", ok: "Aceptar" },
    it: { cancel: "Annulla", ok: "OK" },
    pt: { cancel: "Cancelar", ok: "OK" },
  };

  const handleOpen = () => {
    if (!isOpen) {
      setInitialValue(value);
      setTempValue(value);
    }
    setIsOpen(!isOpen);
  };

  const handleDateSelect = (date: Date) => {
    if (isDateRange) {
      const currentRange = Array.isArray(tempValue)
        ? tempValue
        : [undefined, undefined];

      if (rangeSelection === "start") {
        const newRange: [Date?, Date?] = [date, currentRange[1]];
        if (newRange[1] && date > newRange[1]) {
          newRange[1] = undefined;
        }
        setTempValue(newRange);
        setRangeSelection("end");
      } else {
        const startDate = currentRange[0];
        if (startDate && date < startDate) {
          setTempValue([date, startDate]);
        } else {
          setTempValue([startDate, date]);
        }
        setRangeSelection("start");
      }
    } else {
      setTempValue(date);
    }
  };

  const handleCancel = () => {
    setTempValue(initialValue);
    setIsOpen(false);
  };

  const handleValidate = () => {
    if (onChange && tempValue) {
      onChange(tempValue);
    }
    setDisplayValue(tempValue);
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    isFocused,
    setIsFocused,
    tempValue,
    setTempValue,
    displayValue,
    setDisplayValue,
    selectedTab,
    setSelectedTab,
    hours,
    setHours,
    minutes,
    setMinutes,
    hoursInput,
    setHoursInput,
    minutesInput,
    setMinutesInput,
    showMonthSelector,
    setShowMonthSelector,
    showYearSelector,
    setShowYearSelector,
    rangeSelection,
    setRangeSelection,
    localeLabels: localeLabels[locale],
    handleOpen,
    handleDateSelect,
    handleCancel,
    handleValidate,
  };
};
