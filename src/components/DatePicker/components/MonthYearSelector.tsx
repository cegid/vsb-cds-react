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
}

const MonthYearSelector: React.FC<MonthYearSelectorProps> = ({
  currentMonth,
  adapter,
  showMonthSelector,
  showYearSelector,
  onMonthSelect,
  onYearSelect,
  onShowYearSelector,
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
            cursor: "pointer",
            textAlign: "center",
            mb: 2,
          }}
          onClick={onShowYearSelector}
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
          {months.map((month, index) => (
            <Button
              key={`month-${month.getMonth()}`}
              variant="outlined"
              color="neutral"
              size="large"
              onClick={() => onMonthSelect(index)}
            >
              {adapter.format(month, "monthLong")}
            </Button>
          ))}
        </Box>
      </>
    );
  };

  const renderYearSelector = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: currentYear - 1925 + 1 },
      (_, i) => currentYear - i
    );

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
        {years.map((year) => (
          <Button
            key={year}
            variant="outlined"
            color="neutral"
            size="large"
            onClick={() => onYearSelect(year)}
          >
            {year}
          </Button>
        ))}
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