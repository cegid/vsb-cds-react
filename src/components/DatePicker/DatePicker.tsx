import React, { useEffect, useState, useRef, useCallback } from "react";
import { PaletteNames } from "../../theme";
import Box from "../Box";
import Icon from "../Icon";
import IconButton, { CustomColor } from "../IconButton";
import Typography from "../Typography";
import Stack from "../Stack";
import Button, { ButtonColor } from "../Button";
import SegmentedControl from "../SegmentedControl";
import Column from "../Column";
import TextField, { TextFieldProps } from "../TextField";
import { useCalendar, Locale } from "./hooks/useCalendar";
import { useDatePicker } from "./hooks/useDatePicker";
import CalendarGrid from "./components/CalendarGrid";
import MonthYearSelector from "./components/MonthYearSelector";
import TimeSelector from "./components/TimeSelector";
import WeekSelector from "./components/WeekSelector";

export type DatePickerGranularity = "day" | "week" | "month" | "year" | "hours";

/**
 * Props for the DatePicker component.
 * @interface DatePickerProps
 */
export interface DatePickerProps
  extends Omit<TextFieldProps, "onChange" | "color"> {
  /** The selected date value or date range [startDate, endDate] */
  value?: Date | [Date?, Date?];
  /** Callback fired when the date changes */
  onChange?: (date: Date | null | [Date?, Date?]) => void;
  /** Whether to enable date range selection */
  isDateRange?: boolean;
  /** The color variant from available palette names */
  color?: PaletteNames;
  /** The minimum selectable date */
  minDate?: Date;
  /** The maximum selectable date */
  maxDate?: Date;
  /** Locale for date formatting and labels (defaults to 'fr') */
  locale?: Locale;
  /** Timezone for date handling (defaults to browser timezone). Use 'UTC' for UTC mode. */
  timezone?: string;
  /** Force UTC mode - all dates will be treated as UTC */
  utc?: boolean;
  /** Whether to display the date picker in static mode (always visible) */
  static?: boolean;
  /** Available granularities to display in the segmented control */
  granularities?: DatePickerGranularity[];
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      isDateRange = false,
      color = "primary",
      disabled = false,
      placeholder = "Select date",
      minDate,
      maxDate,
      locale = "fr",
      timezone,
      utc = false,
      static: isStatic = false,
      granularities = ["day"],
      ...textFieldProps
    } = props;

    const datePickerRef = useRef<HTMLDivElement>(null);
    const [openUpward, setOpenUpward] = useState(false);
    const [selectedGranularity, setSelectedGranularity] =
      useState<DatePickerGranularity>(granularities[0]);

    const showTime = selectedGranularity === "hours" && !isDateRange;

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

    const getDateFormat = (date: Date) => {
      // Utilise le format DD pour avoir toujours 2 chiffres pour le jour
      const format = selectedGranularity === "week" ? "DD/MM/YYYY" : "shortDate";
      return calendar.adapter.formatByString(date, format);
    };

    const formatDateForDisplay = (
      dateValue: Date | [Date?, Date?] | undefined
    ) => {
      if (!dateValue) return placeholder;

      if (isDateRange && Array.isArray(dateValue)) {
        const [startDate, endDate] = dateValue;
        if (!startDate && !endDate) return placeholder;

        const startStr = startDate
          ? getDateFormat(startDate)
          : "___";
        const endStr = endDate
          ? getDateFormat(endDate)
          : "___";

        return `${startStr} - ${endStr}`;
      } else if (!Array.isArray(dateValue)) {
        const dateStr = calendar.adapter.formatByString(dateValue, "DD/MM/YYYY");

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

    const getTopPosition = () => {
      if (isStatic) return "auto";
      return openUpward ? "auto" : "100%";
    };

    const getBottomPosition = () => {
      if (isStatic) return "auto";
      return openUpward ? "100%" : "auto";
    };

    const getMarginTop = () => {
      if (isStatic) return 2;
      return openUpward ? 0 : 4;
    };

    const getMarginBottom = () => {
      if (isStatic) return 0;
      return openUpward ? 4 : 0;
    };

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

    const handleGranularityChange = (
      granularityType: DatePickerGranularity
    ) => {
      setSelectedGranularity(granularityType);
    };

    const createDateRangeFromMonth = (month: Date): [Date, Date] => {
      const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
      const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
      return [startOfMonth, endOfMonth];
    };

    const createDateRangeFromYear = (year: Date): [Date, Date] => {
      const startOfYear = new Date(year.getFullYear(), 0, 1);
      const endOfYear = new Date(year.getFullYear(), 11, 31);
      return [startOfYear, endOfYear];
    };

    const handleSpecialDateSelect = (date: Date) => {
      if (!isDateRange || !onChange) return;

      if (selectedGranularity === "month") {
        const dateRange = createDateRangeFromMonth(date);
        onChange(dateRange);
        datePicker.setIsOpen(false);
      } else if (selectedGranularity === "year") {
        const dateRange = createDateRangeFromYear(date);
        onChange(dateRange);
        datePicker.setIsOpen(false);
      }
    };

    const getGranularityOptions = () => {
      const options: Array<{
        label: string;
        icon?: React.ReactNode;
        onClick: () => void;
      }> = [];

      granularities.forEach((granularityType) => {
        switch (granularityType) {
          case "day":
            options.push({
              label: showTime ? "Date" : "Jour",
              icon: showTime ? (
                <Icon size={16} color="neutral/10">
                  calendar-03
                </Icon>
              ) : undefined,
              onClick: () => {
                handleGranularityChange("day");
                if (showTime) {
                  datePicker.setSelectedTab(0);
                }
              },
            });
            break;
          case "week":
            options.push({
              label: "Semaine",
              onClick: () => handleGranularityChange("week"),
            });
            break;
          case "month":
            options.push({
              label: "Mois",
              onClick: () => handleGranularityChange("month"),
            });
            break;
          case "year":
            if (isDateRange) {
              options.push({
                label: "Année",
                onClick: () => handleGranularityChange("year"),
              });
            }
            break;
          case "hours":
            if (!isDateRange) {
              options.push({
                label: "Heure",
                icon: (
                  <Icon size={16} color="neutral/10">
                    time-quarter-02
                  </Icon>
                ),
                onClick: () => {
                  handleGranularityChange("hours");
                  datePicker.setSelectedTab(1);
                },
              });
            }
            break;
        }
      });

      return options;
    };

    const getSelectedGranularityIndex = () => {
      const options = getGranularityOptions();
      return options.findIndex((option) => {
        if (selectedGranularity === "day") {
          return option.label === "Date" || option.label === "Jour";
        }
        if (selectedGranularity === "week") {
          return option.label === "Semaine";
        }
        if (selectedGranularity === "month") {
          return option.label === "Mois";
        }
        if (selectedGranularity === "year") {
          return option.label === "Année";
        }
        if (selectedGranularity === "hours") {
          return option.label === "Heure";
        }
        return false;
      });
    };

    const handleGranularityMonthSelect = (monthIndex: number) => {
      const monthDate = new Date(
        calendar.currentMonth.getFullYear(),
        monthIndex,
        1
      );
      handleSpecialDateSelect(monthDate);
    };

    const handleGranularityYearSelect = (year: number) => {
      const yearDate = new Date(year, 0, 1);
      handleSpecialDateSelect(yearDate);
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

    const renderSelector = () => {
      // Week selector
      if (selectedGranularity === "week") {
        return (
          <WeekSelector
            currentYear={calendar.currentMonth.getFullYear()}
            selectedDate={datePicker.tempValue}
            color={color}
            adapter={calendar.adapter}
            onWeekSelect={(weekStart) => {
              const weekEnd = new Date(weekStart);
              weekEnd.setDate(weekStart.getDate() + 6);
              if (isDateRange) {
                datePicker.setTempValue([weekStart, weekEnd]);
                datePicker.setDisplayValue([weekStart, weekEnd]);
                onChange?.([weekStart, weekEnd]);
              } else {
                datePicker.setTempValue(weekStart);
                datePicker.setDisplayValue(weekStart);
                onChange?.(weekStart);
              }
              if (!isStatic) {
                datePicker.setIsOpen(false);
              }
            }}
            isDateDisabled={calendar.isDateDisabled}
            minDate={minDate}
            maxDate={maxDate}
          />
        );
      }

      // Month/Year selector
      if (selectedGranularity !== "day" ||
          datePicker.showMonthSelector ||
          datePicker.showYearSelector) {
        return (
          <MonthYearSelector
            currentMonth={calendar.currentMonth}
            adapter={calendar.adapter}
            showMonthSelector={selectedGranularity === "month" || datePicker.showMonthSelector}
            showYearSelector={selectedGranularity === "year" || datePicker.showYearSelector}
            onMonthSelect={selectedGranularity === "month"
              ? handleGranularityMonthSelect
              : handleMonthSelect
            }
            onYearSelect={selectedGranularity === "year"
              ? handleGranularityYearSelect
              : handleYearSelect
            }
            onShowYearSelector={() => {
              datePicker.setShowYearSelector(true);
              datePicker.setShowMonthSelector(false);
            }}
            isMonthDisabled={calendar.isMonthDisabled}
            isYearDisabled={calendar.isYearDisabled}
            getAvailableYears={calendar.getAvailableYears}
            canSelectYear={calendar.canSelectYear}
            canSelectMonth={calendar.canSelectMonth}
          />
        );
      }

      // Default day selector header
      return (
        <>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <IconButton
              size="small"
              color={color as CustomColor}
              square
              variant="outlined"
              disabled={!calendar.canNavigateToPreviousMonth()}
              onClick={() => calendar.navigateMonth(-1)}
            >
              <Icon variant="stroke" size={16}>arrow-left-01</Icon>
            </IconButton>
            <Typography
              variant="bodyMSemiBold"
              sx={{
                cursor: calendar.canSelectMonth() || calendar.canSelectYear()
                  ? "pointer"
                  : "default",
              }}
              onClick={() => {
                if (calendar.canSelectMonth() || calendar.canSelectYear()) {
                  datePicker.setShowMonthSelector(true);
                  datePicker.setShowYearSelector(false);
                }
              }}
            >
              {calendar.adapter.formatByString(
                calendar.currentMonth,
                "MMMM YYYY"
              )}
            </Typography>
            <IconButton
              size="small"
              color={color as CustomColor}
              variant="outlined"
              disabled={!calendar.canNavigateToNextMonth()}
              onClick={() => calendar.navigateMonth(1)}
              square
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
            onDateSelect={(date) =>
              datePicker.handleDateSelect(
                date,
                selectedGranularity === ("week" as DatePickerGranularity)
              )
            }
            isDateDisabled={calendar.isDateDisabled}
            isDateSelected={isDateSelectedAdapter}
            isToday={calendar.isToday}
            getDaysInMonth={calendar.getDaysInMonth}
            getFirstDayOfMonth={calendar.getFirstDayOfMonth}
            isDateRange={isDateRange}
            isWeekMode={selectedGranularity === ("week" as DatePickerGranularity)}
          />
        </>
      );
    };

    return (
      <Box ref={ref} width="100%">
        <Box position="relative" ref={datePickerRef}>
          <TextField
            {...textFieldProps}
            value={formatDateForDisplay(datePicker.displayValue)}
            readOnly
            disabled={disabled}
            onClick={handleButtonClick}
            onFocus={() => datePicker.setIsFocused(true)}
            onBlur={() => datePicker.setIsFocused(false)}
          />

          {(datePicker.isOpen || isStatic) && !disabled && (
            <Column
              position={isStatic ? "relative" : "absolute"}
              top={getTopPosition()}
              bottom={getBottomPosition()}
              left={isStatic ? "auto" : 0}
              right={isStatic ? "auto" : 0}
              zIndex={isStatic ? "auto" : 1000}
              mt={getMarginTop()}
              mb={getMarginBottom()}
              p={4}
              gap={4}
              backgroundColor="white"
              border={{ color: "neutral/90", width: 1, style: "solid" }}
              borderRadius="6px"
              sx={{
                boxShadow: isStatic ? "none" : "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              {granularities.length > 1 || showTime ? (
                <Box mb={2}>
                  <SegmentedControl
                    fullwidth
                    actions={getGranularityOptions()}
                    defaultSelected={getSelectedGranularityIndex()}
                  />
                </Box>
              ) : null}

              {(!showTime ||
                (showTime &&
                  selectedGranularity === ("day" as DatePickerGranularity))) && (
                  <>
                    {renderSelector()}
                  </>
              )}

              {showTime && selectedGranularity === "hours" && (
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
                  color={color as ButtonColor}
                  size="large"
                  onClick={datePicker.handleCancel}
                >
                  {datePicker.localeLabels.cancel}
                </Button>
                <Button
                  variant="tonal"
                  color={color as ButtonColor}
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
