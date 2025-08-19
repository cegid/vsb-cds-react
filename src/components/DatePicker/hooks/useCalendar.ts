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
    return firstDay === 0 ? 6 : firstDay - 1; // Monday = 0
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
  };
};