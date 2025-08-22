import React from "react";
import { CustomColorString, PaletteNames, colorPalettes } from "../../../theme";
import Box from "../../Box";
import Typography from "../../Typography";

export interface DayJsAdapter {
  format: (date: Date, formatString: string) => string;
  formatByString: (date: Date, formatString: string) => string;
}

/**
 * Props for the CalendarGrid component.
 * @interface CalendarGridProps
 */
export interface CalendarGridProps {
  /** The current month being displayed */
  currentMonth: Date;
  /** The selected date value or date range [startDate, endDate] */
  selectedDate?: Date | [Date?, Date?];
  /** The color variant from available palette names */
  color?: PaletteNames;
  /** Date adapter for formatting and manipulation */
  adapter: DayJsAdapter;
  /** Callback fired when a date is selected */
  onDateSelect: (date: Date) => void;
  /** Function to determine if a date should be disabled */
  isDateDisabled: (date: Date) => boolean;
  /** Function to determine if a date is selected */
  isDateSelected: (date: Date, selectedDate?: Date | [Date?, Date?]) => boolean;
  /** Function to determine if a date is today */
  isToday: (date: Date) => boolean;
  /** Function to get the number of days in a month */
  getDaysInMonth: (date: Date) => number;
  /** Function to get the first day of the month (0 = Monday) */
  getFirstDayOfMonth: (date: Date) => number;
  /** Whether the calendar is in date range selection mode */
  isDateRange?: boolean;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
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
  isDateRange = false,
}) => {
  const { neutral } = colorPalettes;
  const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null);

  const isInHoverRange = (date: Date) => {
    if (!isDateRange || !hoveredDate || !Array.isArray(selectedDate))
      return false;

    const [startDate] = selectedDate;
    if (!startDate) return false;

    const minDate = startDate < hoveredDate ? startDate : hoveredDate;
    const maxDate = startDate < hoveredDate ? hoveredDate : startDate;

    return date >= minDate && date <= maxDate;
  };

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
      const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day);
      const isDisabled = isDateDisabled(date);

      if (isDisabled) {
        days.push(<Box key={`prev-${day}`} width={32} height={32} />);
        continue;
      }

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
            cursor: "pointer",
            "&:hover": { backgroundColor: neutral[95] },
          }}
          onClick={() => onDateSelect(date)}
          onMouseEnter={() => setHoveredDate(date)}
          onMouseLeave={() => setHoveredDate(null)}
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

      if (isDisabled) {
        days.push(<Box key={day} width={32} height={32} />);
        continue;
      }

      const isSelected = isDateSelected(date, selectedDate);
      const isTodayDate = isToday(date);
      const isInHoverRangeArea = isInHoverRange(date);

      let isInRange = false;
      let isRangeStart = false;
      let isRangeEnd = false;

      if (isDateRange && Array.isArray(selectedDate)) {
        const [startDate, endDate] = selectedDate;
        if (startDate && endDate) {
          isInRange = date >= startDate && date <= endDate;
          isRangeStart = startDate.getTime() === date.getTime();
          isRangeEnd = endDate.getTime() === date.getTime();
        } else if (startDate) {
          isRangeStart = startDate.getTime() === date.getTime();
        }
      }

      let dayColor;
      let backgroundColor;
      let borderRadius;

      if (isDateRange && isRangeStart && isRangeEnd) {
        dayColor = "white";
        backgroundColor = `${color}/60`;
        borderRadius = "50%";
      } else if (isDateRange && isRangeStart) {
        dayColor = "white";
        backgroundColor = `${color}/60`;
        borderRadius = "16px 0 0 16px";
      } else if (isDateRange && isRangeEnd) {
        dayColor = "white";
        backgroundColor = `${color}/60`;
        borderRadius = "0 16px 16px 0";
      } else if (isDateRange && isInRange) {
        dayColor = neutral[10];
        backgroundColor = neutral[95];
        borderRadius = "50%";
      } else if (isDateRange && isInHoverRangeArea && !isInRange) {
        dayColor = neutral[10];
        backgroundColor = neutral[95];
        borderRadius = "50%";
      } else if (!isDateRange && isSelected) {
        dayColor = "white";
        backgroundColor = `${color}/60`;
        borderRadius = "50%";
      } else {
        dayColor = neutral[10];
        backgroundColor = "transparent";
        borderRadius = "50%";
      }

      days.push(
        <Box
          key={day}
          width={32}
          height={32}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={borderRadius}
          backgroundColor={backgroundColor as CustomColorString}
          border={
            isTodayDate && !isSelected && !isInRange
              ? { color: "neutral/10", width: 1, style: "solid" }
              : undefined
          }
          color={dayColor}
          sx={{
            cursor: "pointer",
            "&:hover":
              !isSelected && !isInRange && !isInHoverRangeArea
                ? { backgroundColor: neutral[95] }
                : {},
          }}
          onClick={() => onDateSelect(date)}
          onMouseEnter={() => setHoveredDate(date)}
          onMouseLeave={() => setHoveredDate(null)}
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
      const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day);
      const isDisabled = isDateDisabled(date);

      if (isDisabled) {
        days.push(<Box key={`next-${day}`} width={32} height={32} />);
        continue;
      }

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
            cursor: "pointer",
            "&:hover": { backgroundColor: neutral[95] },
          }}
          onClick={() => onDateSelect(date)}
          onMouseEnter={() => setHoveredDate(date)}
          onMouseLeave={() => setHoveredDate(null)}
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
