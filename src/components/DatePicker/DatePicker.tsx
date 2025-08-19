import React, { useEffect, useState, useRef, useCallback } from "react";
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
  /** The selected date value or date range [startDate, endDate] */
  value?: Date | [Date?, Date?];
  /** Callback fired when the date changes */
  onChange?: (date: Date | null | [Date?, Date?]) => void;
  /** Whether to enable date range selection */
  isDateRange?: boolean;
  /** Whether to show time selection (hours and minutes) */
  showTime?: boolean;
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
  /** Timezone for date handling (defaults to browser timezone). Use 'UTC' for UTC mode. */
  timezone?: string;
  /** Force UTC mode - all dates will be treated as UTC */
  utc?: boolean;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      isDateRange = false,
      showTime = false,
      color = "primary",
      disabled = false,
      placeholder = "Select date",
      minDate,
      maxDate,
      label,
      locale = "fr",
      timezone,
      utc = false,
    } = props;

    const { primary, neutral } = colorPalettes;
    const datePickerRef = useRef<HTMLDivElement>(null);
    const [openUpward, setOpenUpward] = useState(false);

    const calendar = useCalendar({
      value: Array.isArray(value) ? value[0] : value,
      minDate,
      maxDate,
      locale,
      timezone,
      utc,
    });
    const datePicker = useDatePicker({
      value,
      onChange,
      isDateRange,
      locale,
    });

    useEffect(() => {
      datePicker.setTempValue(value);
      datePicker.setDisplayValue(value);
      const dateToUse = Array.isArray(value) ? value[0] : value;
      if (dateToUse) {
        calendar.setCurrentMonth(
          new Date(dateToUse.getFullYear(), dateToUse.getMonth(), 1)
        );
      }
    }, [value]);

    const formatDateForDisplay = (
      dateValue: Date | [Date?, Date?] | undefined
    ) => {
      if (!dateValue) return placeholder;

      if (isDateRange && Array.isArray(dateValue)) {
        const [startDate, endDate] = dateValue;
        if (!startDate && !endDate) return placeholder;

        const startStr = startDate
          ? calendar.adapter.format(startDate, "shortDate")
          : "___";
        const endStr = endDate
          ? calendar.adapter.format(endDate, "shortDate")
          : "___";

        return `${startStr} - ${endStr}`;
      } else if (!Array.isArray(dateValue)) {
        const dateStr = calendar.adapter.format(dateValue, "shortDate");

        if (
          showTime &&
          datePicker.hours !== undefined &&
          datePicker.minutes !== undefined
        ) {
          const timeStr = `${datePicker.hours.toString().padStart(2, "0")}:${datePicker.minutes.toString().padStart(2, "0")}`;
          return `${dateStr} ${timeStr}`;
        }

        return dateStr;
      }

      return placeholder;
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
      outline:
        datePicker.isFocused && !disabled ? `2px solid ${primary[70]}` : "none",
      outlineOffset: datePicker.isFocused && !disabled ? "1px" : "0",
      boxSizing: "border-box" as const,
      cursor: disabled ? "not-allowed" : "pointer",
      textAlign: "left" as const,
      display: "flex",
      alignItems: "center",
    });

    const checkPosition = useCallback(() => {
      if (datePickerRef.current) {
        const rect = datePickerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const dropdownHeight = 400;

        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;

        setOpenUpward(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
      }
    }, []);

    const handleButtonClick = () => {
      if (!disabled) {
        if (!datePicker.isOpen && value) {
          const dateToUse = Array.isArray(value) ? value[0] : value;
          if (dateToUse) {
            calendar.setCurrentMonth(
              new Date(dateToUse.getFullYear(), dateToUse.getMonth(), 1)
            );
          }
        }
        checkPosition();
        datePicker.handleOpen();
      }
    };

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
      type: "hours" | "minutes",
      value: number | undefined,
      input: string
    ) => {
      if (type === "hours") {
        datePicker.setHours(value);
        datePicker.setHoursInput(input);
      } else {
        datePicker.setMinutes(value);
        datePicker.setMinutesInput(input);
      }
    };

    const isDateSelectedAdapter = (
      date: Date,
      selectedDate?: Date | [Date?, Date?]
    ) => {
      if (isDateRange && Array.isArray(selectedDate)) {
        const [startDate, endDate] = selectedDate;
        if (startDate && date.getTime() === startDate.getTime()) return true;
        if (endDate && date.getTime() === endDate.getTime()) return true;
        return false;
      } else if (!Array.isArray(selectedDate)) {
        return calendar.isDateSelected(date, selectedDate);
      }
      return false;
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
        <Box position="relative" ref={datePickerRef}>
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
              top={openUpward ? "auto" : "100%"}
              bottom={openUpward ? "100%" : "auto"}
              left={0}
              right={0}
              zIndex={1000}
              mt={openUpward ? 0 : 4}
              mb={openUpward ? 4 : 0}
              p={4}
              gap={4}
              backgroundColor="white"
              border={{ color: "neutral/90", width: 1, style: "solid" }}
              borderRadius="6px"
              sx={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              {showTime && (
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
              )}

              {(!showTime || datePicker.selectedTab === 0) && (
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

                  {!datePicker.showMonthSelector &&
                    !datePicker.showYearSelector && (
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
                            {calendar.adapter.formatByString(
                              calendar.currentMonth,
                              "MMMM YYYY"
                            )}
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
                          isDateSelected={isDateSelectedAdapter}
                          isToday={calendar.isToday}
                          getDaysInMonth={calendar.getDaysInMonth}
                          getFirstDayOfMonth={calendar.getFirstDayOfMonth}
                          isDateRange={isDateRange}
                        />
                      </>
                    )}
                </>
              )}

              {showTime && datePicker.selectedTab === 1 && (
                <TimeSelector
                  hoursInput={datePicker.hoursInput}
                  minutesInput={datePicker.minutesInput}
                  onHoursChange={(hours, input) =>
                    handleTimeChange("hours", hours, input)
                  }
                  onMinutesChange={(minutes, input) =>
                    handleTimeChange("minutes", minutes, input)
                  }
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
                <Button
                  variant="tonal"
                  size="large"
                  onClick={datePicker.handleValidate}
                >
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
