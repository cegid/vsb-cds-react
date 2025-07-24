import React from "react";
import { PaletteNames, colorPalettes } from "../../../theme";
import Box from "../../Box";
import Typography from "../../Typography";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate?: Date;
  color?: PaletteNames;
  adapter: AdapterDateFns;
  onDateSelect: (date: Date) => void;
  isDateDisabled: (date: Date) => boolean;
  isDateSelected: (date: Date, selectedDate?: Date) => boolean;
  isToday: (date: Date) => boolean;
  getDaysInMonth: (date: Date) => number;
  getFirstDayOfMonth: (date: Date) => number;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  selectedDate,
  color = "primary",
  adapter,
  onDateSelect,
  isDateDisabled,
  isDateSelected,
  isToday,
  getDaysInMonth,
  getFirstDayOfMonth,
}) => {
  const { neutral } = colorPalettes;

  const renderPreviousMonthDays = (
    firstDay: number,
    days: React.ReactNode[]
  ) => {
    const prevMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    const daysInPrevMonth = getDaysInMonth(prevMonth);

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const date = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth(),
        day
      );
      const isDisabled = isDateDisabled(date);

      days.push(
        <Box
          key={`prev-${day}`}
          width={32}
          height={32}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="50%"
          backgroundColor="transparent"
          sx={{
            cursor: isDisabled ? "not-allowed" : "pointer",
            "&:hover": !isDisabled ? { backgroundColor: neutral[95] } : {},
          }}
          onClick={() => !isDisabled && onDateSelect(date)}
        >
          <Typography variant="bodySRegular" color="neutral/80">
            {day}
          </Typography>
        </Box>
      );
    }
  };

  const renderCurrentMonthDays = (
    daysInMonth: number,
    days: React.ReactNode[]
  ) => {
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isDisabled = isDateDisabled(date);
      const isSelected = isDateSelected(date, selectedDate);
      const isTodayDate = isToday(date);

      let dayColor;
      if (isDisabled) {
        dayColor = "neutral/50";
      } else if (isSelected) {
        dayColor = "white";
      } else {
        dayColor = "neutral/10";
      }

      days.push(
        <Box
          key={day}
          width={32}
          height={32}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="50%"
          backgroundColor={isSelected ? `${color}/60` : "transparent"}
          border={
            isTodayDate && !isSelected
              ? { color: "neutral/10", width: 1, style: "solid" }
              : undefined
          }
          color={dayColor}
          sx={{
            cursor: isDisabled ? "not-allowed" : "pointer",
            "&:hover":
              !isDisabled && !isSelected
                ? { backgroundColor: neutral[95] }
                : {},
          }}
          onClick={() => !isDisabled && onDateSelect(date)}
        >
          <Typography variant="bodySRegular">{day}</Typography>
        </Box>
      );
    }
  };

  const renderNextMonthDays = (
    firstDay: number,
    daysInMonth: number,
    days: React.ReactNode[]
  ) => {
    const currentDays = firstDay + daysInMonth;
    const remainingInLastRow = currentDays % 7;

    if (remainingInLastRow === 0) return;

    const nextMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    const daysToAdd = 7 - remainingInLastRow;

    for (let day = 1; day <= daysToAdd; day++) {
      const date = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        day
      );
      const isDisabled = isDateDisabled(date);

      days.push(
        <Box
          key={`next-${day}`}
          width={32}
          height={32}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="50%"
          backgroundColor="transparent"
          sx={{
            cursor: isDisabled ? "not-allowed" : "pointer",
            "&:hover": !isDisabled ? { backgroundColor: neutral[95] } : {},
          }}
          onClick={() => !isDisabled && onDateSelect(date)}
        >
          <Typography variant="bodySRegular" color="neutral/80">
            {day}
          </Typography>
        </Box>
      );
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: React.ReactNode[] = [];

    renderPreviousMonthDays(firstDay, days);
    renderCurrentMonthDays(daysInMonth, days);
    renderNextMonthDays(firstDay, daysInMonth, days);

    return days;
  };

  return (
    <>
      {/* Week days header */}
      <Box
        display="grid"
        sx={{
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 1,
        }}
      >
        {Array.from({ length: 7 }, (_, index) => {
          const date = new Date(2024, 0, 1 + index);
          const dayShort = adapter.format(date, "weekdayShort");
          return { date, dayShort };
        }).map(({ dayShort, date }) => (
          <Box
            key={`weekday-${date.getDay()}`}
            width={32}
            height={32}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="captionSemiBold" color="neutral/50">
              {dayShort}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Calendar grid */}
      <Box
        display="grid"
        sx={{
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 1,
        }}
      >
        {renderCalendar()}
      </Box>
    </>
  );
};

export default CalendarGrid;