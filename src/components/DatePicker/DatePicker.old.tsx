import React, { useEffect } from "react";
import { PaletteNames, colorPalettes } from "../../theme";
import { RADIUS } from "../../theme/radius";
import typography from "../../theme/typography";
import Box from "../Box";
import Icon from "../Icon";
import IconButton from "../IconButton";
import Typography from "../Typography";
import Stack from "../Stack";
import Button from "../Button";
import SegmentedControl from "../SegmentedControl";
import Column from "../Column";
import { useCalendar, Locale } from "./hooks/useCalendar";
import { useDatePicker } from "./hooks/useDatePicker";
import CalendarGrid from "./components/CalendarGrid";
import MonthYearSelector from "./components/MonthYearSelector";
import TimeSelector from "./components/TimeSelector";

/**
 * Props for the DatePicker component.
 * @interface DatePickerProps
 */
export interface DatePickerProps {
  /** The selected date value */
  value?: Date;
  /** Callback fired when the date changes */
  onChange?: (date: Date | null) => void;
  /** Whether the date picker is disabled */
  disabled?: boolean;
  /** Placeholder text when no date is selected */
  placeholder?: string;
  /** The minimum selectable date */
  minDate?: Date;
  /** The maximum selectable date */
  maxDate?: Date;
  /** Label for the date picker */
  label?: string;
  /** Locale for date formatting and labels (defaults to 'fr') */
  locale?: Locale;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      color = "primary",
      disabled = false,
      placeholder = "Select date",
      minDate,
      maxDate,
      label,
      locale = "fr",
    } = props;

    const { primary, neutral } = colorPalettes;

    // Custom hooks for state management
    const calendar = useCalendar({ value, minDate, maxDate, locale });
    const datePicker = useDatePicker({ value, onChange, placeholder, locale });

    // Update states when value prop changes
    useEffect(() => {
      datePicker.setTempValue(value);
      datePicker.setDisplayValue(value);
      if (value) {
        calendar.setCurrentMonth(new Date(value.getFullYear(), value.getMonth(), 1));
      }
    }, [value]);

    const formatDateForDisplay = (date: Date | undefined) => {
      if (!date) return placeholder;

      const dateStr = calendar.adapter.format(date, "shortDate");

      if (datePicker.hours !== undefined && datePicker.minutes !== undefined) {
        const timeStr = `${datePicker.hours.toString().padStart(2, "0")}:${datePicker.minutes.toString().padStart(2, "0")}`;
        return `${dateStr} ${timeStr}`;
      }

      return dateStr;
    };

    const getButtonStyles = () => ({
      width: "100%",
      padding: "8px 40px 8px 16px",
      minHeight: "40px",
      borderRadius: RADIUS.S,
      border: `1px solid ${neutral[90]}`,
      backgroundColor: disabled ? neutral[99] : "transparent",
      color: value ? neutral[10] : neutral[50],
      ...typography.bodyMRegular,
      outline: datePicker.isFocused && !disabled ? `2px solid ${primary[70]}` : "none",
      outlineOffset: datePicker.isFocused && !disabled ? "1px" : "0",
      boxSizing: "border-box" as const,
      cursor: disabled ? "not-allowed" : "pointer",
      textAlign: "left" as const,
      display: "flex",
      alignItems: "center",
    });

    const handleButtonClick = () => {
      if (!disabled) {
        if (!datePicker.isOpen && value) {
          calendar.setCurrentMonth(new Date(value.getFullYear(), value.getMonth(), 1));
        }
        datePicker.handleOpen();
      }
    };

    // Handler functions using the hook methods
    const handleMonthSelect = (monthIndex: number) => {
      calendar.goToMonth(monthIndex);
      datePicker.setShowMonthSelector(false);
      datePicker.setShowYearSelector(false);
    };

    const handleYearSelect = (year: number) => {
      calendar.goToYear(year);
      datePicker.setShowYearSelector(false);
      datePicker.setShowMonthSelector(true);
    };

    const handleTimeChange = (
      type: 'hours' | 'minutes',
      value: number | undefined,
      input: string
    ) => {
      if (type === 'hours') {
        datePicker.setHours(value);
        datePicker.setHoursInput(input);
      } else {
        datePicker.setMinutes(value);
        datePicker.setMinutesInput(input);
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
              cursor: "pointer",
              textAlign: "center",
              mb: 2,
            }}
            onClick={() => {
              setShowYearSelector(true);
              setShowMonthSelector(false);
            }}
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
                onClick={() => handleMonthSelect(index)}
              >
                {adapter.format(month, "month")}
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
              onClick={() => handleYearSelect(year)}
            >
              {year}
            </Button>
          ))}
        </Box>
      );
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
            onClick={() => !isDisabled && handleDateSelect(date)}
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
        const isSelected = isDateSelected(date);
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
            backgroundColor={isSelected ? `primary/60` : "transparent"}
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
            onClick={() => !isDisabled && handleDateSelect(date)}
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
            onClick={() => !isDisabled && handleDateSelect(date)}
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
      <Box ref={ref} width="100%">
        {label && (
          <Typography
            variant="bodySSemiBold"
            color="neutral/50"
            mb={4}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            {label}
          </Typography>
        )}
        <Box position="relative">
          <button
            type="button"
            onClick={handleButtonClick}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            style={getButtonStyles()}
          >
            {label && (
              <Typography
                variant="bodySSemiBold"
                color="neutral/50"
                sx={{
                  display: { xs: "block", sm: "none" },
                  position: "absolute",
                  top: "10px",
                  left: "16px",
                  fontSize: "12px",
                  zIndex: 1,
                  backgroundColor: "transparent",
                  transform: displayValue
                    ? "translateY(0) scale(0.85)"
                    : "translateY(0)",
                  transformOrigin: "top left",
                  transition: "transform 0.2s ease",
                }}
              >
                {label}
              </Typography>
            )}
            <Box
              component="span"
              sx={{
                paddingTop: { xs: label ? "18px" : "0", sm: "0" },
                display: "block",
                width: "100%",
              }}
            >
              {formatDateForDisplay(displayValue)}
            </Box>
          </button>
          <Box
            position="absolute"
            right="12px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              top: { xs: label ? "calc(50% + 9px)" : "50%", sm: "50%" },
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          >
            <Icon
              variant="stroke"
              size={20}
              color={disabled ? "neutral/50" : "neutral/30"}
            >
              calendar-03
            </Icon>
          </Box>

          {isOpen && !disabled && (
            <Column
              position="absolute"
              top="100%"
              left={0}
              right={0}
              zIndex={1000}
              mt={4}
              p={4}
              gap={4}
              backgroundColor="white"
              border={{ color: "neutral/90", width: 1, style: "solid" }}
              borderRadius="6px"
              sx={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box mb={2}>
                <SegmentedControl
                  fullwidth
                  actions={[
                    {
                      label: "Date",
                      icon: (
                        <Icon size={16} color="neutral/10">
                          calendar-03
                        </Icon>
                      ),
                      onClick: () => setSelectedTab(0),
                    },
                    {
                      label: "Heure",
                      icon: (
                        <Icon size={16} color="neutral/10">
                          time-quarter-02
                        </Icon>
                      ),
                      onClick: () => setSelectedTab(1),
                    },
                  ]}
                  defaultSelected={selectedTab}
                />
              </Box>

              {selectedTab === 0 && (
                <>
                  {(() => {
                    if (showMonthSelector) {
                      return renderMonthSelector();
                    }
                    if (showYearSelector) {
                      return renderYearSelector();
                    }
                    return (
                      <>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <IconButton
                            size="small"
                            color="neutral"
                            variant="iconOnly"
                            onClick={() => navigateMonth(-1)}
                          >
                            <Icon variant="stroke" size={16}>
                              arrow-left-01
                            </Icon>
                          </IconButton>
                          <Typography
                            variant="bodyMSemiBold"
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              setShowMonthSelector(true);
                              setShowYearSelector(false);
                            }}
                          >
                            {adapter.formatByString(currentMonth, 'MMMM yyyy')}
                          </Typography>
                          <IconButton
                            size="small"
                            color="neutral"
                            variant="iconOnly"
                            onClick={() => navigateMonth(1)}
                          >
                            <Icon variant="stroke" size={16}>
                              arrow-right-01
                            </Icon>
                          </IconButton>
                        </Stack>
                        <Box
                          display="grid"
                          sx={{
                            gridTemplateColumns: "repeat(7, 1fr)",
                            gap: 1,
                          }}
                        >
                          {Array.from({ length: 7 }, (_, index) => {
                            const date = new Date(2024, 0, 1 + index);
                            const dayShort = adapter.format(
                              date,
                              "weekdayShort"
                            );
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
                              <Typography
                                variant="captionSemiBold"
                                color="neutral/50"
                              >
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
                  })()}
                </>
              )}

              {selectedTab === 1 && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                  py={4}
                >
                  <TextField
                    label="Heure"
                    placeholder="HH"
                    type="number"
                    value={hoursInput}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "") {
                        setHoursInput("");
                        setHours(undefined);
                      } else {
                        const numValue = parseInt(value);
                        if (
                          !isNaN(numValue) &&
                          numValue >= 0 &&
                          numValue <= 23
                        ) {
                          setHoursInput(value);
                          setHours(numValue);
                        }
                      }
                    }}
                    inputProps={{ min: 0, max: 23 }}
                  />
                  <Typography variant="bodyMRegular" color="neutral/50">
                    :
                  </Typography>
                  <TextField
                    label="Minute"
                    placeholder="MM"
                    type="number"
                    value={minutesInput}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "") {
                        setMinutesInput("");
                        setMinutes(undefined);
                      } else {
                        const numValue = parseInt(value);
                        if (
                          !isNaN(numValue) &&
                          numValue >= 0 &&
                          numValue <= 59
                        ) {
                          setMinutesInput(value);
                          setMinutes(numValue);
                        }
                      }
                    }}
                    inputProps={{ min: 0, max: 59 }}
                  />
                </Box>
              )}

              <Stack direction="row" justifyContent="flex-end" gap={1}>
                <Button
                  variant="text"
                  color="neutral"
                  size="large"
                  onClick={handleCancel}
                >
                  {localeLabels[locale].cancel}
                </Button>
                <Button variant="tonal" size="large" onClick={handleValidate}>
                  {localeLabels[locale].ok}
                </Button>
              </Stack>
            </Column>
          )}
        </Box>
      </Box>
    );
  }
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
