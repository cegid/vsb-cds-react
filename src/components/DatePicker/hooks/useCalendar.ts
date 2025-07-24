import { useState, useMemo } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fr, enUS, de, es, it, pt } from "date-fns/locale";

export type Locale = "fr" | "en" | "de" | "es" | "it" | "pt";

interface UseCalendarProps {
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
  locale?: Locale;
}

export const useCalendar = ({
  value,
  minDate,
  maxDate,
  locale = "fr",
}: UseCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value.getFullYear(), value.getMonth(), 1) : new Date()
  );

  const localeMap = { fr, en: enUS, de, es, it, pt };
  const adapter = useMemo(
    () => new AdapterDateFns({ locale: localeMap[locale] }),
    [locale]
  );

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (date: Date, selectedDate?: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const navigateMonth = (direction: 1 | -1) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + direction,
        1
      )
    );
  };

  const goToMonth = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
  };

  const goToYear = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
  };

  return {
    currentMonth,
    setCurrentMonth,
    adapter,
    getDaysInMonth,
    getFirstDayOfMonth,
    isDateDisabled,
    isDateSelected,
    isToday,
    navigateMonth,
    goToMonth,
    goToYear,
  };
};