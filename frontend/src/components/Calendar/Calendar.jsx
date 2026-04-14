import "./calendar.css";

import { useState } from "react";
import { useCalendar } from "./useCalendar";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import EventsPanel from "./EventsPanel";
import AddEventModal from "./AddEventModal";

export default function Calendar() {
  const calendar = useCalendar();

  // State for "Go to" inputs and error handling
  const [gotoMonth, setGotoMonth] = useState("");
  const [gotoYear, setGotoYear] = useState("");
  const [monthError, setMonthError] = useState(false);

  // Handle "Go to" button click
  const handleGoTo = () => {
    const m = parseInt(gotoMonth, 10) - 1;
    const y = parseInt(gotoYear, 10);

    // Month validation
    if (isNaN(m) || m < 0 || m > 11) {
      setMonthError(true);
      return;
    }

    setMonthError(false);

    // Year validation
    if (!isNaN(y)) {
      calendar.goToDate(m, y);
      setGotoMonth("");
      setGotoYear("");
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-left">
        <div className="calendar">
          <CalendarHeader {...calendar} />

          <div className="weekdays">
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>
            <div>Su</div>
          </div>

          <CalendarGrid {...calendar} />

          <div className="goto-today">
            <div className="goto">
              <input
                type="number"
                placeholder="MM"
                min="1"
                max="12"
                className={`date-input ${monthError ? "error" : ""}`}
                value={gotoMonth}
                onChange={(e) => {
                  setGotoMonth(e.target.value);
                  setMonthError(false);
                }}
              />

              <input
                type="number"
                placeholder="YYYY"
                className="date-input"
                value={gotoYear}
                onChange={(e) => setGotoYear(e.target.value)}
              />

              <button className="goto-btn" onClick={handleGoTo}>
                Go to
              </button>
            </div>

            <button className="today-btn" onClick={calendar.goToToday}>
              Today
            </button>
          </div>
        </div>
      </div>

      <div className="calendar-right">
        <EventsPanel {...calendar} />

        <AddEventModal addEvent={calendar.addEvent} />
      </div>
    </div>
  );
}
