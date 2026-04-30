import { useState } from "react";

export function useCalendar() {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [activeDay, setActiveDay] = useState(today.getDate());

  // Months will be passed from component level for i18n support
  const months = [];

  // Navigate to next month, adjusting year if needed
  const nextMonth = () => {
    setMonth((m) => {
      if (m === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  // Navigate to previous month, adjusting year if needed
  const prevMonth = () => {
    setMonth((m) => {
      if (m === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  // Reset to current month and year
  const goToToday = () => {
    setMonth(today.getMonth());
    setYear(today.getFullYear());
    setActiveDay(today.getDate());
  };

  // Go to a specific month and year, validating input
  const goToDate = (m, y) => {
    if (m >= 0 && m <= 11 && Number.isInteger(y)) {
      setMonth(m);
      setYear(y);
      setActiveDay(1);
    }
  };

  // Return all calendar state and functions
  return {
    month,
    year,
    months,
    activeDay,
    setActiveDay,
    nextMonth,
    prevMonth,
    goToDate,
    goToToday,
  };
}
