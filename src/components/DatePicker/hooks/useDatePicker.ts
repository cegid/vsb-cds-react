import { useState } from "react";
import { Locale } from "./useCalendar";

interface UseDatePickerProps {
  value?: Date;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  locale?: Locale;
}

export const useDatePicker = ({
  value,
  onChange,
  placeholder = "Select date",
  locale = "fr",
}: UseDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [tempValue, setTempValue] = useState<Date | undefined>(value);
  const [initialValue, setInitialValue] = useState<Date | undefined>(value);
  const [displayValue, setDisplayValue] = useState<Date | undefined>(value);
  const [selectedTab, setSelectedTab] = useState(0);
  const [hours, setHours] = useState<number | undefined>();
  const [minutes, setMinutes] = useState<number | undefined>();
  const [hoursInput, setHoursInput] = useState("");
  const [minutesInput, setMinutesInput] = useState("");
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);

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
    setTempValue(date);
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
    localeLabels: localeLabels[locale],
    handleOpen,
    handleDateSelect,
    handleCancel,
    handleValidate,
  };
};