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
  onWeekRangeSelect?: (range: [Date?, Date?]) => void;
  tempRange?: [Date?, Date?];
  isDateDisabled?: (date: Date) => boolean;
  minDate?: Date;
  maxDate?: Date;
  allowRange?: boolean;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({
  currentYear,
  selectedDate,
  color = "primary",
  adapter,
  onWeekSelect,
  onWeekRangeSelect,
  tempRange,
  isDateDisabled,
  minDate,
  maxDate,
  allowRange = false,
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

  const getWeekSelectionState = (weekStart: Date, weekEnd: Date) => {
    if (tempRange && allowRange) {
      const [tempStart, tempEnd] = tempRange;
      
      if (tempStart && tempEnd) {
        const isStart = weekStart.getTime() === tempStart.getTime();
        const isEnd = weekEnd.getTime() === tempEnd.getTime();
        const isInRange = weekStart >= tempStart && weekStart <= tempEnd;
        
        return {
          isSelected: isStart || isEnd,
          isStart,
          isEnd,
          isInRange: isInRange && !isStart && !isEnd
        };
      } else if (tempStart) {
        return {
          isSelected: false,
          isStart: weekStart.getTime() === tempStart.getTime(),
          isEnd: false,
          isInRange: false
        };
      }
    }

    if (!selectedDate) return { isSelected: false, isStart: false, isEnd: false, isInRange: false };

    if (Array.isArray(selectedDate)) {
      const [start, end] = selectedDate;
      if (!start || !end) return { isSelected: false, isStart: false, isEnd: false, isInRange: false };
      
      if (allowRange) {
        const isStart = weekStart.getTime() === start.getTime();
        const isEnd = weekEnd.getTime() === end.getTime();
        const isInRange = weekStart >= start && weekStart <= end;
        
        return {
          isSelected: isStart || isEnd,
          isStart,
          isEnd,
          isInRange: isInRange && !isStart && !isEnd
        };
      } else {
        return {
          isSelected: start.getTime() === weekStart.getTime() && end.getTime() === weekEnd.getTime(),
          isStart: false,
          isEnd: false,
          isInRange: false
        };
      }
    }

    return { isSelected: false, isStart: false, isEnd: false, isInRange: false };
  };

  const handleWeekClick = (weekStart: Date, weekEnd: Date) => {
    if (allowRange && onWeekRangeSelect) {
      if (!tempRange || !tempRange[0]) {
        onWeekRangeSelect([weekStart, undefined]);
      } else if (!tempRange[1]) {
        if (weekStart.getTime() === tempRange[0].getTime()) {
          onWeekRangeSelect([undefined, undefined]);
        } else if (weekStart < tempRange[0]) {
          // Calculer la fin de la première semaine sélectionnée
          const firstWeekEnd = new Date(tempRange[0]);
          firstWeekEnd.setDate(tempRange[0].getDate() + 6);
          onWeekRangeSelect([weekStart, firstWeekEnd]);
        } else {
          // Utiliser la fin de la deuxième semaine sélectionnée
          onWeekRangeSelect([tempRange[0], weekEnd]);
        }
      } else {
        onWeekRangeSelect([weekStart, undefined]);
      }
    } else {
      onWeekSelect(weekStart);
    }
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={2}
        px={2}
      >
        <Typography
          variant="bodyMSemiBold"
          sx={{
            textAlign: "center",
          }}
        >
          {currentYear}
        </Typography>
      </Box>
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
          const selectionState = getWeekSelectionState(start, end);
          const isDisabled = isWeekDisabled(start, end);

          const getButtonVariant = () => {
            if (selectionState.isStart || selectionState.isEnd) {
              return "tonal";
            } else if (selectionState.isInRange) {
              return "tonal";
            }
            return "outlined";
          };

          const getButtonColor = () => {
            if (selectionState.isStart || selectionState.isEnd) {
              return color as 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info' | 'neutral';
            } else if (selectionState.isInRange) {
              return "neutral";
            }
            return "neutral";
          };

          return (
            <Button
              key={start.getTime()}
              variant={getButtonVariant()}
              color={getButtonColor()}
              size="large"
              disabled={isDisabled}
              onClick={() => !isDisabled && handleWeekClick(start, end)}
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
