import { useState, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import "dayjs/locale/fr";
import "dayjs/locale/en";
import "dayjs/locale/de";
import "dayjs/locale/es";
import "dayjs/locale/it";
import "dayjs/locale/pt";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export type Locale = "fr" | "en" | "de" | "es" | "it" | "pt";

interface DayJsAdapter {
  format: (date: Date, formatString: string) => string;
  formatByString: (date: Date, formatString: string) => string;
}

interface UseCalendarProps {
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
  locale?: Locale;
  timezone?: string;
  utc?: boolean;
}

export const useCalendar = ({
  value,
  minDate,
  maxDate,
  locale = "fr",
  timezone = dayjs.tz.guess(),
  utc = false,
}: UseCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value.getFullYear(), value.getMonth(), 1) : new Date()
  );

  const adapter = useMemo((): DayJsAdapter => {
    dayjs.locale(locale);
    
    const createDayjs = (date: Date) => {
      if (utc) {
        return dayjs(date).utc();
      } else if (timezone) {
        return dayjs(date).tz(timezone);
      } else {
        return dayjs(date);
      }
    };
    
    return {
      format: (date: Date, formatString: string) => {
        const formatMap: Record<string, string> = {
          "shortDate": locale === "en" ? "MM/DD/YYYY" : "DD/MM/YYYY",
          "longDate": "dddd D MMMM YYYY",
          "weekdayShort": "ddd",
          "weekdayLong": "dddd",
          "monthShort": "MMM",
          "monthLong": "MMMM",
          "MMMM yyyy": "MMMM YYYY",
          "EEEE d MMMM yyyy": "dddd D MMMM YYYY",
          "yyyy-MM-dd": "YYYY-MM-DD"
        };
        
        const dayjsFormat = formatMap[formatString] || formatString;
        return createDayjs(date).format(dayjsFormat);
      },
      formatByString: (date: Date, formatString: string) => {
        return createDayjs(date).format(formatString);
      }
    };
  }, [locale, timezone, utc]);

  const getDaysInMonth = (date: Date) => {
    return dayjs(date).daysInMonth();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = dayjs(date).startOf('month').day();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const createDayjs = (date: Date) => {
    if (utc) {
      return dayjs(date).utc();
    } else if (timezone) {
      return dayjs(date).tz(timezone);
    } else {
      return dayjs(date);
    }
  };

  const isDateDisabled = (date: Date) => {
    const dayjsDate = createDayjs(date);
    if (minDate && dayjsDate.isBefore(createDayjs(minDate), 'day')) return true;
    if (maxDate && dayjsDate.isAfter(createDayjs(maxDate), 'day')) return true;
    return false;
  };

  const isDateSelected = (date: Date, selectedDate?: Date) => {
    if (!selectedDate) return false;
    return createDayjs(date).isSame(createDayjs(selectedDate), 'day');
  };

  const isToday = (date: Date) => {
    const today = utc ? dayjs().utc() : (timezone ? dayjs().tz(timezone) : dayjs());
    return createDayjs(date).isSame(today, 'day');
  };

  const getWeekRange = (date: Date): [Date, Date] => {
    const day = createDayjs(date);
    const startOfWeek = day.startOf('week').toDate();
    const endOfWeek = day.endOf('week').toDate();
    return [startOfWeek, endOfWeek];
  };

  const isDateInWeek = (date: Date, weekStart: Date) => {
    const day = createDayjs(date);
    const start = createDayjs(weekStart).startOf('week');
    return day.isSame(start, 'week');
  };

  const navigateMonth = (direction: 1 | -1) => {
    const newMonth = dayjs(currentMonth).add(direction, 'month').startOf('month');
    setCurrentMonth(newMonth.toDate());
  };

  const goToMonth = (monthIndex: number) => {
    const newMonth = dayjs(currentMonth).month(monthIndex).startOf('month');
    setCurrentMonth(newMonth.toDate());
  };

  const goToYear = (year: number) => {
    const newMonth = dayjs(currentMonth).year(year).startOf('month');
    setCurrentMonth(newMonth.toDate());
  };

  const hasAvailableDaysInMonth = (targetMonth: Date) => {
    const daysInMonth = getDaysInMonth(targetMonth);
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), day);
      if (!isDateDisabled(date)) {
        return true;
      }
    }
    
    return false;
  };

  const canNavigateToPreviousMonth = () => {
    const previousMonth = dayjs(currentMonth).subtract(1, 'month').startOf('month').toDate();
    return hasAvailableDaysInMonth(previousMonth);
  };

  const canNavigateToNextMonth = () => {
    const nextMonth = dayjs(currentMonth).add(1, 'month').startOf('month').toDate();
    return hasAvailableDaysInMonth(nextMonth);
  };

  const isMonthDisabled = (monthIndex: number, year?: number) => {
    const targetYear = year || currentMonth.getFullYear();
    const monthDate = new Date(targetYear, monthIndex, 1);
    return !hasAvailableDaysInMonth(monthDate);
  };

  const isYearDisabled = (year: number) => {
    for (let month = 0; month < 12; month++) {
      const monthDate = new Date(year, month, 1);
      if (hasAvailableDaysInMonth(monthDate)) {
        return false;
      }
    }
    return true;
  };

  const getAvailableYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    
    for (let year = 1925; year <= currentYear; year++) {
      if (!isYearDisabled(year)) {
        years.push(year);
      }
    }
    
    return years.reverse();
  };

  const getAvailableMonthsInYear = (year: number) => {
    const months = [];
    for (let month = 0; month < 12; month++) {
      if (!isMonthDisabled(month, year)) {
        months.push(month);
      }
    }
    return months;
  };

  const canSelectYear = () => {
    return getAvailableYears().length > 1;
  };

  const canSelectMonth = (year?: number) => {
    const targetYear = year || currentMonth.getFullYear();
    return getAvailableMonthsInYear(targetYear).length > 1;
  };


  return {
    currentMonth,
    setCurrentMonth,
    adapter,
    getDaysInMonth,
    getFirstDayOfMonth,
    isDateDisabled,
    isDateSelected,
    isToday,
    navigateMonth,
    goToMonth,
    goToYear,
    canNavigateToPreviousMonth,
    canNavigateToNextMonth,
    isMonthDisabled,
    isYearDisabled,
    getAvailableYears,
    getAvailableMonthsInYear,
    canSelectYear,
    canSelectMonth,
  };
};