import React, { useEffect, useState, useRef } from "react";
import { PaletteNames } from "../../theme";
import { colorPalettes } from "../../theme/colors";
import Box from "../Box";
import Icon from "../Icon";
import IconButton, { CustomColor } from "../IconButton";
import Typography from "../Typography";
import Stack from "../Stack";

const { primary, neutral } = colorPalettes;
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
import { Popper, styled } from "@cegid/cds-react";

const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    "&.Mui-readOnly": {
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: neutral[99],
      },
      "&.Mui-focused": {
        outline: `2px solid ${primary[70]}`,
        outlineOffset: "1px",
      },
    },
  },
}));

export type DatePickerGranularity = "day" | "week" | "month" | "year" | "hours";

type OneToThreeGranularities =
  | [DatePickerGranularity]
  | [DatePickerGranularity, DatePickerGranularity]
  | [DatePickerGranularity, DatePickerGranularity, DatePickerGranularity];

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
  /**
   * Available granularities to display in the segmented control
   * @example ["day"], ["day", "week"], ["day", "week", "month"]
   * @maximum 3 granularities allowed - enforced at TypeScript level
   */
  granularities?: OneToThreeGranularities;
  /**
   * Format for displaying dates in the input field
   * Can specify date format, range separator, and prefix
   * @example { prefix: "Du ", dateFormat: "dd/MM/yyyy", rangeSeparator: "au" }
   * @example { prefix: "From ", dateFormat: "shortDate", rangeSeparator: "-" }
   * @default { dateFormat: "shortDate", rangeSeparator: "-" }
   */
  dateDisplayFormat?: {
    prefix?: string;
    dateFormat?: string;
    rangeSeparator?: string;
  };
  /**
   * Index of the selected item in the segmented control
   * If provided, overrides the automatic selection based on selectedGranularity
   */
  selectedIndex?: number;
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
      granularities = ["day"] as const,
      dateDisplayFormat = {
        dateFormat: "shortDate",
        rangeSeparator: "-",
        prefix: "",
      },
      selectedIndex,
      ...textFieldProps
    } = props;

    const inputRef = useRef<HTMLDivElement>(null);
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
      const isValueInRange = (date: Date | undefined) => {
        if (!date) return true;
        if (minDate && date < minDate) return false;
        if (maxDate && date > maxDate) return false;
        return true;
      };

      const getValidNavigationDate = () => {
        const now = new Date();
        const currentDate = utc
          ? new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()))
          : new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (minDate && currentDate < minDate) {
          return minDate;
        }

        if (maxDate && currentDate > maxDate) {
          return maxDate;
        }

        return currentDate;
      };

      datePicker.setTempValue(value);
      datePicker.setDisplayValue(value);

      let navigationDate: Date | undefined;

      if (Array.isArray(value)) {
        const [startDate, endDate] = value;
        if (isValueInRange(startDate)) {
          navigationDate = startDate;
        } else if (isValueInRange(endDate)) {
          navigationDate = endDate;
        } else {
          navigationDate = getValidNavigationDate();
        }
      } else if (value) {
        if (isValueInRange(value)) {
          navigationDate = value;
        } else {
          navigationDate = getValidNavigationDate();
        }
      } else {
        navigationDate = getValidNavigationDate();
      }

      if (navigationDate) {
        calendar.setCurrentMonth(
          new Date(navigationDate.getFullYear(), navigationDate.getMonth(), 1)
        );
      }
    }, [value, minDate, maxDate, utc, isDateRange]);

    const getDateFormat = (date: Date) => {
      const format = dateDisplayFormat.dateFormat || "shortDate";
      return calendar.adapter.format(date, format);
    };

    const formatDateForDisplay = (
      dateValue: Date | [Date?, Date?] | undefined
    ) => {
      if (!dateValue) return undefined;

      const prefix = dateDisplayFormat.prefix || "";

      if (isDateRange && Array.isArray(dateValue)) {
        const [startDate, endDate] = dateValue;
        if (!startDate && !endDate) return undefined;

        const startStr = startDate ? getDateFormat(startDate) : "___";
        const endStr = endDate ? getDateFormat(endDate) : "___";

        const separator = dateDisplayFormat.rangeSeparator || "-";
        return `${prefix}${prefix ? " " : ""}${startStr} ${separator} ${endStr}`;
      } else if (!Array.isArray(dateValue)) {
        const dateStr = getDateFormat(dateValue);

        if (
          showTime &&
          datePicker.hours !== undefined &&
          datePicker.minutes !== undefined
        ) {
          const timeStr = `${datePicker.hours
            .toString()
            .padStart(2, "0")}:${datePicker.minutes
            .toString()
            .padStart(2, "0")}`;
          return `${prefix}${prefix ? " " : ""}${dateStr} ${timeStr}`;
        }

        return `${prefix}${prefix ? " " : ""}${dateStr}`;
      }

      return undefined;
    };

    const handleButtonClick = () => {
      if (!disabled) {
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

    const getSelectedMonthRange = ():
      | [{ month: number; year: number }?, { month: number; year: number }?]
      | undefined => {
      if (!isDateRange || !Array.isArray(value) || !value[0] || !value[1]) {
        return undefined;
      }
      return [
        { month: value[0].getMonth(), year: value[0].getFullYear() },
        { month: value[1].getMonth(), year: value[1].getFullYear() },
      ];
    };

    const getSelectedYearRange = (): [number?, number?] | undefined => {
      if (!isDateRange || !Array.isArray(value) || !value[0] || !value[1]) {
        return undefined;
      }
      return [value[0].getFullYear(), value[1].getFullYear()];
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
      if (selectedGranularity === "week") {
        return (
          <WeekSelector
            currentMonth={calendar.currentMonth}
            selectedDate={datePicker.tempValue}
            color={color}
            adapter={calendar.adapter}
            onWeekSelect={(weekStart) => {
              const weekEnd = new Date(weekStart);
              weekEnd.setDate(weekStart.getDate() + 6);
              if (isDateRange) {
                datePicker.setTempValue([weekStart, weekEnd]);
              } else {
                datePicker.setTempValue(weekStart);
              }
              if (!isDateRange && !isStatic) {
                datePicker.setDisplayValue([weekStart, weekEnd]);
                onChange?.([weekStart, weekEnd]);
                datePicker.setIsOpen(false);
              }
            }}
            onWeekRangeSelect={datePicker.handleWeekRangeSelect}
            tempRange={datePicker.tempWeekRange}
            allowRange={isDateRange}
            isDateDisabled={calendar.isDateDisabled}
            minDate={minDate}
            maxDate={maxDate}
            onMonthNavigate={(direction) => calendar.navigateMonth(direction)}
            canNavigateToPreviousMonth={() =>
              calendar.canNavigateToPreviousMonth()
            }
            canNavigateToNextMonth={() => calendar.canNavigateToNextMonth()}
          />
        );
      }

      if (
        selectedGranularity !== "day" ||
        datePicker.showMonthSelector ||
        datePicker.showYearSelector
      ) {
        return (
          <MonthYearSelector
            currentMonth={calendar.currentMonth}
            adapter={calendar.adapter}
            showMonthSelector={
              selectedGranularity === "month" || datePicker.showMonthSelector
            }
            showYearSelector={
              selectedGranularity === "year" || datePicker.showYearSelector
            }
            onMonthSelect={
              selectedGranularity === "month"
                ? handleGranularityMonthSelect
                : handleMonthSelect
            }
            onYearSelect={
              selectedGranularity === "year"
                ? handleGranularityYearSelect
                : handleYearSelect
            }
            onMonthRangeSelect={datePicker.handleMonthRangeSelect}
            onYearRangeSelect={datePicker.handleYearRangeSelect}
            tempMonthRange={datePicker.tempMonthRange}
            tempYearRange={datePicker.tempYearRange}
            selectedMonthRange={getSelectedMonthRange()}
            selectedYearRange={getSelectedYearRange()}
            allowRange={
              isDateRange &&
              (selectedGranularity === "month" ||
                selectedGranularity === "year")
            }
            color={
              color as
                | "primary"
                | "secondary"
                | "error"
                | "warning"
                | "success"
                | "info"
                | "neutral"
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
            onYearNavigate={(direction) => calendar.navigateYear(direction)}
            canNavigateToPreviousYear={() =>
              calendar.canNavigateToPreviousYear()
            }
            canNavigateToNextYear={() => calendar.canNavigateToNextYear()}
          />
        );
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
              color={color as CustomColor}
              square
              variant="outlined"
              disabled={!calendar.canNavigateToPreviousMonth()}
              onClick={() => calendar.navigateMonth(-1)}
            >
              <Icon variant="stroke" size={16}>
                arrow-left-01
              </Icon>
            </IconButton>
            <Typography
              variant="bodyMSemiBold"
              sx={{
                cursor:
                  calendar.canSelectMonth() || calendar.canSelectYear()
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
          />
        </>
      );
    };

    const renderDatePickerContent = () => {
      return (
        <>
          {granularities.length > 1 || showTime ? (
            <Box mb={2}>
              <SegmentedControl
                fullwidth
                actions={getGranularityOptions()}
                defaultSelected={selectedIndex !== undefined ? selectedIndex : getSelectedGranularityIndex()}
              />
            </Box>
          ) : null}

          {(!showTime ||
            (showTime &&
              selectedGranularity === ("day" as DatePickerGranularity))) && (
            <>{renderSelector()}</>
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
        </>
      );
    };

    return (
      <Box ref={ref} width="100%">
        <Box position="relative" ref={inputRef}>
          <StyledTextField
            {...textFieldProps}
            value={
              datePicker.displayValue
                ? formatDateForDisplay(datePicker.displayValue)
                : ""
            }
            readOnly
            placeholder={placeholder}
            disabled={disabled}
            onClick={handleButtonClick}
            onFocus={() => datePicker.setIsFocused(true)}
            onBlur={() => datePicker.setIsFocused(false)}
          />
        </Box>

        {(datePicker.isOpen || isStatic) && !disabled && (
          <>
            {isStatic ? (
              <Column
                position="relative"
                p={4}
                gap={4}
                backgroundColor="white"
                border={{ color: "neutral/90", width: 1, style: "solid" }}
                borderRadius="6px"
                sx={{
                  boxShadow: "none",
                }}
              >
                {renderDatePickerContent()}
              </Column>
            ) : (
              <Popper
                open={datePicker.isOpen}
                anchorEl={inputRef.current}
                placement="bottom-start"
                style={{ zIndex: 9999 }}
                modifiers={[
                  {
                    name: "offset",
                    options: {
                      offset: [0, 8],
                    },
                  },
                ]}
              >
                <Column
                  p={4}
                  gap={4}
                  backgroundColor="white"
                  border={{ color: "neutral/90", width: 1, style: "solid" }}
                  borderRadius="6px"
                  width={338}
                  sx={{
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {renderDatePickerContent()}
                </Column>
              </Popper>
            )}
          </>
        )}
      </Box>
    );
  }
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
