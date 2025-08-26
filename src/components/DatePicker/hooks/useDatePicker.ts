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
  const [showWeekSelector, setShowWeekSelector] = useState(false);
  const [rangeSelection, setRangeSelection] = useState<"start" | "end">(
    "start"
  );
  const [tempWeekRange, setTempWeekRange] = useState<[Date?, Date?]>();
  const [tempMonthRange, setTempMonthRange] = useState<[number?, number?]>();
  const [tempYearRange, setTempYearRange] = useState<[number?, number?]>();

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

  const handleDateSelect = (date: Date, isWeekMode = false) => {
    if (isWeekMode) {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)); // Lundi
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Dimanche

      if (isDateRange) {
        setTempValue([startOfWeek, endOfWeek]);
        setRangeSelection("start");
      } else {
        setTempValue(startOfWeek);
      }
    } else if (isDateRange) {
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
    setTempWeekRange(undefined);
    setTempMonthRange(undefined);
    setTempYearRange(undefined);
    setIsOpen(false);
  };

  const handleWeekRangeSelect = (range: [Date?, Date?]) => {
    setTempWeekRange(range);
    if (isDateRange && range[0] && range[1]) {
      setTempValue([range[0], range[1]]);
    } else if (isDateRange && range[0]) {
      setTempValue([range[0], undefined]);
    } else {
      setTempValue(undefined);
    }
  };

  const handleMonthRangeSelect = (range: [number?, number?]) => {
    setTempMonthRange(range);
    if (isDateRange && range[0] !== undefined && range[1] !== undefined) {
      const startMonth = new Date(new Date().getFullYear(), range[0], 1);
      const endMonth = new Date(new Date().getFullYear(), range[1] + 1, 0);
      setTempValue([startMonth, endMonth]);
    } else if (isDateRange && range[0] !== undefined) {
      const startMonth = new Date(new Date().getFullYear(), range[0], 1);
      setTempValue([startMonth, undefined]);
    } else {
      setTempValue(undefined);
    }
  };

  const handleYearRangeSelect = (range: [number?, number?]) => {
    setTempYearRange(range);
    if (isDateRange && range[0] !== undefined && range[1] !== undefined) {
      const startYear = new Date(range[0], 0, 1);
      const endYear = new Date(range[1], 11, 31);
      setTempValue([startYear, endYear]);
    } else if (isDateRange && range[0] !== undefined) {
      const startYear = new Date(range[0], 0, 1);
      setTempValue([startYear, undefined]);
    } else {
      setTempValue(undefined);
    }
  };

  const handleValidate = () => {
    let finalValue = tempValue;

    // Si nous avons une sélection de plage temporaire, l'utiliser
    if (tempWeekRange && tempWeekRange[0] && tempWeekRange[1]) {
      finalValue = tempWeekRange;
    } else if (tempMonthRange && tempMonthRange[0] !== undefined && tempMonthRange[1] !== undefined) {
      const startMonth = new Date(new Date().getFullYear(), tempMonthRange[0], 1);
      const endMonth = new Date(new Date().getFullYear(), tempMonthRange[1] + 1, 0);
      finalValue = [startMonth, endMonth];
    } else if (tempYearRange && tempYearRange[0] !== undefined && tempYearRange[1] !== undefined) {
      const startYear = new Date(tempYearRange[0], 0, 1);
      const endYear = new Date(tempYearRange[1], 11, 31);
      finalValue = [startYear, endYear];
    }

    if (onChange && finalValue) {
      onChange(finalValue);
    }
    setDisplayValue(finalValue);
    setIsOpen(false);
    
    // Reset des sélections temporaires
    setTempWeekRange(undefined);
    setTempMonthRange(undefined);
    setTempYearRange(undefined);
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
    showWeekSelector,
    setShowWeekSelector,
    rangeSelection,
    setRangeSelection,
    localeLabels: localeLabels[locale],
    handleOpen,
    handleDateSelect,
    handleCancel,
    handleValidate,
    handleWeekRangeSelect,
    handleMonthRangeSelect,
    handleYearRangeSelect,
    tempWeekRange,
    setTempWeekRange,
    tempMonthRange,
    setTempMonthRange,
    tempYearRange,
    setTempYearRange,
  };
};
