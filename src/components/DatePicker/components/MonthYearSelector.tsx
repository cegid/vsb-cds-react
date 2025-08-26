import React from "react";
import Box from "../../Box";
import Button from "../../Button";
import Typography from "../../Typography";

interface DayJsAdapter {
  format: (date: Date, formatString: string) => string;
  formatByString: (date: Date, formatString: string) => string;
}

interface MonthYearSelectorProps {
  currentMonth: Date;
  adapter: DayJsAdapter;
  showMonthSelector: boolean;
  showYearSelector: boolean;
  onMonthSelect: (monthIndex: number) => void;
  onYearSelect: (year: number) => void;
  onShowYearSelector: () => void;
  onMonthRangeSelect?: (range: [number?, number?]) => void;
  onYearRangeSelect?: (range: [number?, number?]) => void;
  tempMonthRange?: [number?, number?];
  tempYearRange?: [number?, number?];
  selectedMonth?: number;
  selectedYear?: number;
  selectedMonthRange?: [number?, number?];
  selectedYearRange?: [number?, number?];
  isMonthDisabled?: (monthIndex: number, year?: number) => boolean;
  isYearDisabled?: (year: number) => boolean;
  getAvailableYears?: () => number[];
  canSelectYear?: () => boolean;
  canSelectMonth?: (year?: number) => boolean;
  allowRange?: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info' | 'neutral';
}

const MonthYearSelector: React.FC<MonthYearSelectorProps> = ({
  currentMonth,
  adapter,
  showMonthSelector,
  showYearSelector,
  onMonthSelect,
  onYearSelect,
  onShowYearSelector,
  onMonthRangeSelect,
  onYearRangeSelect,
  tempMonthRange,
  tempYearRange,
  selectedMonth,
  selectedYear,
  selectedMonthRange,
  selectedYearRange,
  isMonthDisabled = () => false,
  isYearDisabled = () => false,
  getAvailableYears,
  canSelectYear = () => true,
  canSelectMonth = () => true,
  allowRange = false,
  color = "neutral",
}) => {
  const getMonthSelectionState = (monthIndex: number) => {
    if (tempMonthRange && allowRange) {
      const [start, end] = tempMonthRange;
      
      if (start !== undefined && end !== undefined) {
        const isStart = monthIndex === start;
        const isEnd = monthIndex === end;
        const isInRange = monthIndex >= start && monthIndex <= end;
        
        return {
          isSelected: isStart || isEnd,
          isStart,
          isEnd,
          isInRange: isInRange && !isStart && !isEnd
        };
      } else if (start !== undefined) {
        return {
          isSelected: false,
          isStart: monthIndex === start,
          isEnd: false,
          isInRange: false
        };
      }
    }

    // Si pas de tempRange mais qu'on a une selectedMonthRange existante
    if (selectedMonthRange && allowRange) {
      const [start, end] = selectedMonthRange;
      if (start !== undefined && end !== undefined) {
        const isStart = monthIndex === start;
        const isEnd = monthIndex === end;
        const isInRange = monthIndex >= start && monthIndex <= end;
        
        return {
          isSelected: isStart || isEnd,
          isStart,
          isEnd,
          isInRange: isInRange && !isStart && !isEnd
        };
      }
    }
    
    return {
      isSelected: !allowRange && selectedMonth === monthIndex,
      isStart: false,
      isEnd: false,
      isInRange: false
    };
  };

  const handleMonthClick = (monthIndex: number) => {
    if (allowRange && onMonthRangeSelect) {
      if (!tempMonthRange || tempMonthRange[0] === undefined) {
        onMonthRangeSelect([monthIndex, undefined]);
      } else if (tempMonthRange[1] === undefined) {
        if (monthIndex === tempMonthRange[0]) {
          onMonthRangeSelect([undefined, undefined]);
        } else if (monthIndex < tempMonthRange[0]) {
          onMonthRangeSelect([monthIndex, tempMonthRange[0]]);
        } else {
          onMonthRangeSelect([tempMonthRange[0], monthIndex]);
        }
      } else {
        onMonthRangeSelect([monthIndex, undefined]);
      }
    } else {
      onMonthSelect(monthIndex);
    }
  };

  const renderMonthSelector = () => {
    const months = Array.from({ length: 12 }, (_, index) => {
      return new Date(currentMonth.getFullYear(), index, 1);
    });

    return (
      <>
        <Typography
          variant="bodyMSemiBold"
          sx={{
            cursor: canSelectYear() ? "pointer" : "default",
            textAlign: "center",
            mb: 2,
          }}
          onClick={() => canSelectYear() && onShowYearSelector()}
        >
          {currentMonth.getFullYear()}
        </Typography>
        <Box
          display="grid"
          sx={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          {months.map((month, index) => {
            const disabled = isMonthDisabled(index, currentMonth.getFullYear());
            const selectionState = getMonthSelectionState(index);

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
                return color;
              } else if (selectionState.isInRange) {
                return "neutral";
              }
              return "neutral";
            };

            return (
              <Button
                key={`month-${month.getMonth()}`}
                variant={getButtonVariant()}
                color={getButtonColor()}
                size="large"
                disabled={disabled}
                onClick={() => !disabled && handleMonthClick(index)}
              >
                {adapter.format(month, "monthLong")}
              </Button>
            );
          })}
        </Box>
      </>
    );
  };

  const getYearSelectionState = (year: number) => {
    if (tempYearRange && allowRange) {
      const [start, end] = tempYearRange;
      
      if (start !== undefined && end !== undefined) {
        const isStart = year === start;
        const isEnd = year === end;
        const isInRange = year >= start && year <= end;
        
        return {
          isSelected: isStart || isEnd,
          isStart,
          isEnd,
          isInRange: isInRange && !isStart && !isEnd
        };
      } else if (start !== undefined) {
        return {
          isSelected: false,
          isStart: year === start,
          isEnd: false,
          isInRange: false
        };
      }
    }

    // Si pas de tempRange mais qu'on a une selectedYearRange existante
    if (selectedYearRange && allowRange) {
      const [start, end] = selectedYearRange;
      if (start !== undefined && end !== undefined) {
        const isStart = year === start;
        const isEnd = year === end;
        const isInRange = year >= start && year <= end;
        
        return {
          isSelected: isStart || isEnd,
          isStart,
          isEnd,
          isInRange: isInRange && !isStart && !isEnd
        };
      }
    }
    
    return {
      isSelected: !allowRange && selectedYear === year,
      isStart: false,
      isEnd: false,
      isInRange: false
    };
  };

  const handleYearClick = (year: number) => {
    if (allowRange && onYearRangeSelect) {
      if (!tempYearRange || tempYearRange[0] === undefined) {
        onYearRangeSelect([year, undefined]);
      } else if (tempYearRange[1] === undefined) {
        if (year === tempYearRange[0]) {
          onYearRangeSelect([undefined, undefined]);
        } else if (year < tempYearRange[0]) {
          onYearRangeSelect([year, tempYearRange[0]]);
        } else {
          onYearRangeSelect([tempYearRange[0], year]);
        }
      } else {
        onYearRangeSelect([year, undefined]);
      }
    } else {
      onYearSelect(year);
    }
  };

  const renderYearSelector = () => {
    const years = getAvailableYears ? getAvailableYears() : (() => {
      const currentYear = new Date().getFullYear();
      return Array.from(
        { length: currentYear - 1925 + 1 },
        (_, i) => currentYear - i
      );
    })();

    return (
      <Box
        sx={{
          maxHeight: "200px",
          overflowY: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
        }}
      >
        {years.map((year) => {
          const disabled = isYearDisabled(year);
          const selectionState = getYearSelectionState(year);

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
              return color;
            } else if (selectionState.isInRange) {
              return "neutral";
            }
            return "neutral";
          };

          return (
            <Button
              key={year}
              variant={getButtonVariant()}
              color={getButtonColor()}
              size="large"
              disabled={disabled}
              onClick={() => !disabled && handleYearClick(year)}
            >
              {year}
            </Button>
          );
        })}
      </Box>
    );
  };

  if (showMonthSelector) {
    return renderMonthSelector();
  }

  if (showYearSelector) {
    return renderYearSelector();
  }

  return null;
};

export default MonthYearSelector;