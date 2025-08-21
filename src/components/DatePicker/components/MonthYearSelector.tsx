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
  isMonthDisabled?: (monthIndex: number, year?: number) => boolean;
  isYearDisabled?: (year: number) => boolean;
  getAvailableYears?: () => number[];
  canSelectYear?: () => boolean;
  canSelectMonth?: (year?: number) => boolean;
}

const MonthYearSelector: React.FC<MonthYearSelectorProps> = ({
  currentMonth,
  adapter,
  showMonthSelector,
  showYearSelector,
  onMonthSelect,
  onYearSelect,
  onShowYearSelector,
  isMonthDisabled = () => false,
  isYearDisabled = () => false,
  getAvailableYears,
  canSelectYear = () => true,
  canSelectMonth = () => true,
}) => {
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
            return (
              <Button
                key={`month-${month.getMonth()}`}
                variant="outlined"
                color="neutral"
                size="large"
                disabled={disabled}
                onClick={() => !disabled && onMonthSelect(index)}
              >
                {adapter.format(month, "monthLong")}
              </Button>
            );
          })}
        </Box>
      </>
    );
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
          return (
            <Button
              key={year}
              variant="outlined"
              color="neutral"
              size="large"
              disabled={disabled}
              onClick={() => !disabled && onYearSelect(year)}
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