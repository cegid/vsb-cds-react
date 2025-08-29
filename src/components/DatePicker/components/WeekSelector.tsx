import React from "react";
import Box from "../../Box";
import Button from "../../Button";
import Typography from "../../Typography";
import IconButton, { CustomColor } from "../../IconButton";
import Icon from "../../Icon";
import Stack from "../../Stack";
import { PaletteNames } from "../../../theme";

interface WeekSelectorProps {
  currentMonth: Date;
  selectedDate?: Date | [Date?, Date?];
  color?: PaletteNames;
  adapter: {
    format: (date: Date, formatString: string) => string;
    formatByString: (date: Date, formatString: string) => string;
  };
  onWeekSelect: (startDate: Date) => void;
  onWeekRangeSelect?: (range: [{start: Date, end: Date}?, {start: Date, end: Date}?]) => void;
  tempRange?: [{start: Date, end: Date}?, {start: Date, end: Date}?];
  isDateDisabled?: (date: Date) => boolean;
  minDate?: Date;
  maxDate?: Date;
  allowRange?: boolean;
  onMonthNavigate?: (direction: 1 | -1) => void;
  canNavigateToPreviousMonth?: () => boolean;
  canNavigateToNextMonth?: () => boolean;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({
  currentMonth,
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
  onMonthNavigate,
  canNavigateToPreviousMonth = () => true,
  canNavigateToNextMonth = () => true,
}) => {
  const getWeeksOfMonth = () => {
    const weeks: { start: Date; end: Date }[] = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Premier jour du mois
    const firstDayOfMonth = new Date(year, month, 1);
    // Dernier jour du mois
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Trouver le début de la première semaine qui contient des jours du mois
    const firstWeekStart = new Date(firstDayOfMonth);
    const dayOfWeek = firstWeekStart.getDay();
    // Ajuster pour commencer lundi (1 = lundi, 0 = dimanche)
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    firstWeekStart.setDate(firstDayOfMonth.getDate() - daysToSubtract);
    
    let currentWeekStart = new Date(firstWeekStart);
    
    // Générer les semaines jusqu'à ce qu'on dépasse le mois
    while (currentWeekStart <= lastDayOfMonth || currentWeekStart.getMonth() === month) {
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(currentWeekStart.getDate() + 6);
      
      // Inclure la semaine si elle touche le mois courant
      if (weekEnd >= firstDayOfMonth && currentWeekStart <= lastDayOfMonth) {
        // Vérifier les contraintes minDate/maxDate
        let effectiveStart = new Date(currentWeekStart);
        let effectiveEnd = new Date(weekEnd);
        
        if (minDate && effectiveStart < minDate) {
          effectiveStart = new Date(minDate);
        }
        if (maxDate && effectiveEnd > maxDate) {
          effectiveEnd = new Date(maxDate);
        }
        
        if (effectiveStart <= effectiveEnd) {
          weeks.push({
            start: new Date(currentWeekStart),
            end: new Date(weekEnd),
          });
        }
      }
      
      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      
      // Arrêter si on a dépassé le mois et qu'on n'a plus de jours du mois
      if (currentWeekStart.getMonth() > month || 
          (currentWeekStart.getMonth() < month && currentWeekStart.getFullYear() > year)) {
        break;
      }
    }
    
    return weeks;
  };

  const getWeekSelectionState = (weekStart: Date, weekEnd: Date) => {
    if (tempRange && allowRange) {
      const [tempStart, tempEnd] = tempRange;
      
      if (tempStart && tempEnd) {
        const isStart = weekStart.getTime() === tempStart.start.getTime() && weekEnd.getTime() === tempStart.end.getTime();
        const isEnd = weekStart.getTime() === tempEnd.start.getTime() && weekEnd.getTime() === tempEnd.end.getTime();
        const isInRange = weekStart >= tempStart.start && weekStart <= tempEnd.start;
        
        return {
          isSelected: isStart || isEnd,
          isStart,
          isEnd,
          isInRange: isInRange && !isStart && !isEnd
        };
      } else if (tempStart) {
        return {
          isSelected: false,
          isStart: weekStart.getTime() === tempStart.start.getTime() && weekEnd.getTime() === tempStart.end.getTime(),
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
    const currentWeek = { start: weekStart, end: weekEnd };
    
    if (allowRange && onWeekRangeSelect) {
      if (!tempRange || !tempRange[0]) {
        onWeekRangeSelect([currentWeek, undefined]);
      } else if (!tempRange[1]) {
        const firstWeekStartTime = tempRange[0].start.getTime();
        const currentWeekStartTime = weekStart.getTime();
        
        if (currentWeekStartTime === firstWeekStartTime) {
          onWeekRangeSelect([undefined, undefined]);
        } else if (currentWeekStartTime < firstWeekStartTime) {
          onWeekRangeSelect([currentWeek, tempRange[0]]);
        } else {
          onWeekRangeSelect([tempRange[0], currentWeek]);
        }
      } else {
        onWeekRangeSelect([currentWeek, undefined]);
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

  const weeks = getWeeksOfMonth();

  return (
    <Box maxHeight={250} overflow="auto">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <IconButton
          size="small"
          color={color as CustomColor}
          square
          variant="outlined"
          disabled={!canNavigateToPreviousMonth()}
          onClick={() => onMonthNavigate?.(-1)}
        >
          <Icon variant="stroke" size={16}>
            arrow-left-01
          </Icon>
        </IconButton>
        <Typography
          variant="bodyMSemiBold"
          sx={{
            textAlign: "center",
          }}
        >
          {adapter.formatByString(currentMonth, "MMMM YYYY")}
        </Typography>
        <IconButton
          size="small"
          color={color as CustomColor}
          square
          variant="outlined"
          disabled={!canNavigateToNextMonth()}
          onClick={() => onMonthNavigate?.(1)}
        >
          <Icon variant="stroke" size={16}>
            arrow-right-01
          </Icon>
        </IconButton>
      </Stack>
      <Box
        display="grid"
        sx={{
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          px: 2,
          py: 1,
        }}
      >
        {weeks.map(({ start, end }, index) => {
          const selectionState = getWeekSelectionState(start, end);
          const isDisabled = isWeekDisabled(start, end);
          const isLastWeekAlone = index === weeks.length - 1 && weeks.length % 2 === 1;

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

          const formatDateWithoutYear = (date: Date) => {
            return adapter.formatByString(date, "DD/MM");
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
              sx={isLastWeekAlone ? { gridColumn: "1 / -1" } : {}}
            >
              {`Du ${formatDateWithoutYear(start)} au ${formatDateWithoutYear(end)}`}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default WeekSelector;
