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
  const [tempWeekRange, setTempWeekRange] = useState<[{start: Date, end: Date}?, {start: Date, end: Date}?]>();
  const [tempMonthRange, setTempMonthRange] = useState<[{month: number, year: number}?, {month: number, year: number}?]>();
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

      // Restore temporary states for month/year selections in non-range mode
      if (!isDateRange && Array.isArray(value) && value[0] && value[1]) {
        const [startDate, endDate] = value;

        // Check if it's a month selection (from 1st to last day of the same month)
        const isMonthSelection =
          startDate.getDate() === 1 &&
          endDate.getDate() === new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate() &&
          startDate.getMonth() === endDate.getMonth() &&
          startDate.getFullYear() === endDate.getFullYear();

        // Check if it's a year selection (from January 1st to December 31st of the same year)
        const isYearSelection =
          startDate.getMonth() === 0 && startDate.getDate() === 1 &&
          endDate.getMonth() === 11 && endDate.getDate() === 31 &&
          startDate.getFullYear() === endDate.getFullYear();

        // Check if it's a week selection (7 consecutive days starting on Monday)
        const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const isWeekSelection =
          daysDiff === 6 &&
          startDate.getDay() === 1; // Monday

        if (isYearSelection) {
          setTempYearRange([startDate.getFullYear(), undefined]);
        } else if (isMonthSelection) {
          setTempMonthRange([{ month: startDate.getMonth(), year: startDate.getFullYear() }, undefined]);
        } else if (isWeekSelection) {
          setTempWeekRange([{ start: startDate, end: endDate }, undefined]);
        }
      }
    }
    setIsOpen(!isOpen);
  };

  const handleDateSelect = (date: Date, isWeekMode = false) => {
    if (isWeekMode) {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)); // Monday
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

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
      const dateWithCurrentTime = new Date(date);
      const now = new Date();
      dateWithCurrentTime.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
      setTempValue(dateWithCurrentTime);
    }
  };

  const handleCancel = () => {
    setTempValue(initialValue);
    setTempWeekRange(undefined);
    setTempMonthRange(undefined);
    setTempYearRange(undefined);
    setIsOpen(false);
  };

  const handleWeekRangeSelect = (range: [{start: Date, end: Date}?, {start: Date, end: Date}?]) => {
    setTempWeekRange(range);
    if (isDateRange && range[0] && range[1]) {
      setTempValue([range[0].start, range[1].end]);
    } else if (isDateRange && range[0]) {
      setTempValue([range[0].start, undefined]);
    } else {
      setTempValue(undefined);
    }
  };

  const handleMonthRangeSelect = (range: [{month: number, year: number}?, {month: number, year: number}?]) => {
    setTempMonthRange(range);
    if (isDateRange && range[0] && range[1]) {
      const startMonth = new Date(range[0].year, range[0].month, 1);
      const endMonth = new Date(range[1].year, range[1].month + 1, 0);
      setTempValue([startMonth, endMonth]);
    } else if (isDateRange && range[0]) {
      const startMonth = new Date(range[0].year, range[0].month, 1);
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

    // If we have a temporary range selection, use it
    if (tempWeekRange && tempWeekRange[0] && tempWeekRange[1]) {
      finalValue = [tempWeekRange[0].start, tempWeekRange[1].end];
    } else if (tempWeekRange && tempWeekRange[0] && !tempWeekRange[1]) {
      // Single week selection: create a range from start to end of the week
      finalValue = [tempWeekRange[0].start, tempWeekRange[0].end];
    } else if (tempMonthRange && tempMonthRange[0] && tempMonthRange[1]) {
      const startMonth = new Date(tempMonthRange[0].year, tempMonthRange[0].month, 1);
      const endMonth = new Date(tempMonthRange[1].year, tempMonthRange[1].month + 1, 0);
      finalValue = [startMonth, endMonth];
    } else if (tempMonthRange && tempMonthRange[0] && !tempMonthRange[1]) {
      // Single month selection: create a range from 1st to last day of the month
      const startMonth = new Date(tempMonthRange[0].year, tempMonthRange[0].month, 1);
      const endMonth = new Date(tempMonthRange[0].year, tempMonthRange[0].month + 1, 0);
      finalValue = [startMonth, endMonth];
    } else if (tempYearRange && tempYearRange[0] !== undefined && tempYearRange[1] !== undefined) {
      const startYear = new Date(tempYearRange[0], 0, 1);
      const endYear = new Date(tempYearRange[1], 11, 31);
      finalValue = [startYear, endYear];
    } else if (tempYearRange && tempYearRange[0] !== undefined && tempYearRange[1] === undefined) {
      // Single year selection: create a range from January 1st to December 31st
      const startYear = new Date(tempYearRange[0], 0, 1);
      const endYear = new Date(tempYearRange[0], 11, 31);
      finalValue = [startYear, endYear];
    }

    if (onChange && finalValue) {
      onChange(finalValue);
    }
    setDisplayValue(finalValue);
    setIsOpen(false);

    // Reset temporary selections
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
