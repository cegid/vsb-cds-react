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
  /** The color variant from available palette names */
  color?: PaletteNames;
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
            onFocus={() => datePicker.setIsFocused(true)}
            onBlur={() => datePicker.setIsFocused(false)}
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
                  transform: datePicker.displayValue
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
              {formatDateForDisplay(datePicker.displayValue)}
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

          {datePicker.isOpen && !disabled && (
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
                      onClick: () => datePicker.setSelectedTab(0),
                    },
                    {
                      label: "Heure",
                      icon: (
                        <Icon size={16} color="neutral/10">
                          time-quarter-02
                        </Icon>
                      ),
                      onClick: () => datePicker.setSelectedTab(1),
                    },
                  ]}
                  defaultSelected={datePicker.selectedTab}
                />
              </Box>

              {datePicker.selectedTab === 0 && (
                <>
                  <MonthYearSelector
                    currentMonth={calendar.currentMonth}
                    adapter={calendar.adapter}
                    showMonthSelector={datePicker.showMonthSelector}
                    showYearSelector={datePicker.showYearSelector}
                    onMonthSelect={handleMonthSelect}
                    onYearSelect={handleYearSelect}
                    onShowYearSelector={() => {
                      datePicker.setShowYearSelector(true);
                      datePicker.setShowMonthSelector(false);
                    }}
                  />
                  
                  {!datePicker.showMonthSelector && !datePicker.showYearSelector && (
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
                          onClick={() => calendar.navigateMonth(-1)}
                        >
                          <Icon variant="stroke" size={16}>
                            arrow-left-01
                          </Icon>
                        </IconButton>
                        <Typography
                          variant="bodyMSemiBold"
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            datePicker.setShowMonthSelector(true);
                            datePicker.setShowYearSelector(false);
                          }}
                        >
                          {calendar.adapter.formatByString(calendar.currentMonth, 'MMMM yyyy')}
                        </Typography>
                        <IconButton
                          size="small"
                          color="neutral"
                          variant="iconOnly"
                          onClick={() => calendar.navigateMonth(1)}
                        >
                          <Icon variant="stroke" size={16}>
                            arrow-right-01
                          </Icon>
                        </IconButton>
                      </Stack>

                      <CalendarGrid
                        currentMonth={calendar.currentMonth}
                        selectedDate={datePicker.tempValue}
                        color={color}
                        adapter={calendar.adapter}
                        onDateSelect={datePicker.handleDateSelect}
                        isDateDisabled={calendar.isDateDisabled}
                        isDateSelected={calendar.isDateSelected}
                        isToday={calendar.isToday}
                        getDaysInMonth={calendar.getDaysInMonth}
                        getFirstDayOfMonth={calendar.getFirstDayOfMonth}
                      />
                    </>
                  )}
                </>
              )}

              {datePicker.selectedTab === 1 && (
                <TimeSelector
                  hours={datePicker.hours}
                  minutes={datePicker.minutes}
                  hoursInput={datePicker.hoursInput}
                  minutesInput={datePicker.minutesInput}
                  onHoursChange={(hours, input) => handleTimeChange('hours', hours, input)}
                  onMinutesChange={(minutes, input) => handleTimeChange('minutes', minutes, input)}
                />
              )}

              <Stack direction="row" justifyContent="flex-end" gap={1}>
                <Button
                  variant="text"
                  color="neutral"
                  size="large"
                  onClick={datePicker.handleCancel}
                >
                  {datePicker.localeLabels.cancel}
                </Button>
                <Button variant="tonal" size="large" onClick={datePicker.handleValidate}>
                  {datePicker.localeLabels.ok}
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