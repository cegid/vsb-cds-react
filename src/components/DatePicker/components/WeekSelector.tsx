import React from "react";
import Box from "../../Box";
import Button from "../../Button";
import Typography from "../../Typography";
import { PaletteNames } from "../../../theme";

interface WeekSelectorProps {
  currentYear: number;
  selectedDate?: Date | [Date?, Date?];
  color?: PaletteNames;
  adapter: {
    format: (date: Date, formatString: string) => string;
  };
  onWeekSelect: (startDate: Date) => void;
  isDateDisabled?: (date: Date) => boolean;
  minDate?: Date;
  maxDate?: Date;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({
  currentYear,
  selectedDate,
  color = "primary",
  adapter,
  onWeekSelect,
  isDateDisabled,
  minDate,
  maxDate,
}) => {
  const getWeeksOfYear = () => {
    const weeks: { start: Date; end: Date }[] = [];
    let startDate = minDate || new Date(currentYear, 0, 1);
    let endDate = maxDate || new Date(currentYear, 11, 31);

    if (
      startDate.getFullYear() > currentYear ||
      endDate.getFullYear() < currentYear
    ) {
      return weeks;
    }

    if (startDate.getFullYear() < currentYear) {
      startDate = new Date(currentYear, 0, 1);
    }
    if (endDate.getFullYear() > currentYear) {
      endDate = new Date(currentYear, 11, 31);
    }

    const firstWeekStart = new Date(startDate);
    const dayOfWeek = firstWeekStart.getDay();

    if (firstWeekStart < startDate) {
      firstWeekStart.setDate(firstWeekStart.getDate() + 7);
    }

    let currentWeekStart = new Date(firstWeekStart);

    while (currentWeekStart <= endDate) {
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(currentWeekStart.getDate() + 6);

      if (weekEnd >= startDate && currentWeekStart <= endDate) {
        weeks.push({
          start: new Date(currentWeekStart),
          end: new Date(weekEnd),
        });
      }

      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }

    return weeks;
  };

  const isWeekSelected = (weekStart: Date, weekEnd: Date) => {
    if (!selectedDate) return false;

    if (Array.isArray(selectedDate)) {
      const [start, end] = selectedDate;
      if (!start || !end) return false;
      return (
        start.getTime() === weekStart.getTime() &&
        end.getTime() === weekEnd.getTime()
      );
    }

    return false;
  };

  const isWeekDisabled = (weekStart: Date, weekEnd: Date) => {
    if (!isDateDisabled) return false;

    let currentDate = new Date(weekStart);
    while (currentDate <= weekEnd) {
      if (!isDateDisabled(currentDate)) {
        return false;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return true;
  };

  const weeks = getWeeksOfYear();

  return (
    <Box height={250} overflow="auto">
      <Typography
        variant="bodyMSemiBold"
        sx={{
          textAlign: "center",
          mb: 2,
          px: 2,
        }}
      >
        {currentYear}
      </Typography>
      <Box
        display="grid"
        sx={{
          gridTemplateColumns: "1fr",
          gap: 2,
          px: 2,
          py: 1,
        }}
      >
        {weeks.map(({ start, end }) => {
          const isSelected = isWeekSelected(start, end);
          const isDisabled = isWeekDisabled(start, end);



          return (
            <Button
              key={start.getTime()}
              variant="outlined"
              color={isSelected ? (color as 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info' | 'neutral') : "neutral"}
              size="large"
              disabled={isDisabled}
              onClick={() => !isDisabled && onWeekSelect(start)}
              fullWidth
            >
              {`${adapter.format(start, "shortDate")} - ${adapter.format(
                end,
                "shortDate"
              )}`}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default WeekSelector;
