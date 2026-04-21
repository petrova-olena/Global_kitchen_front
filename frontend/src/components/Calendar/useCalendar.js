import { useState } from "react";

export function useCalendar() {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [activeDay, setActiveDay] = useState(today.getDate());

  // Local state for events, in format: [{ day, month, year, events: [{ title, time }] }]
  // TODO: Replace with backend integration
  const [events, setEvents] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

  // Add an event to the current active day
  const addEvent = (title, from, to) => {
    const newEvent = {
      day: activeDay,
      month: month + 1,
      year,
      events: [{ title, time: `${from} - ${to}` }],
    };

    setEvents((prev) => [...prev, newEvent]);
  };

  // Delete an event by title from the current active day
  const deleteEvent = (title) => {
    setEvents((prev) =>
      prev
        .map((e) =>
          e.day === activeDay && e.month === month + 1 && e.year === year
            ? { ...e, events: e.events.filter((ev) => ev.title !== title) }
            : e,
        )
        .filter((e) => e.events.length > 0),
    );
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
    events,
    nextMonth,
    prevMonth,
    goToDate,
    goToToday,
    addEvent,
    deleteEvent,
  };
}
