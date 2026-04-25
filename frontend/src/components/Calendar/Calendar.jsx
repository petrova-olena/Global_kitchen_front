import "./calendar.css";

import { useState } from "react";
import { useCalendar } from "./useCalendar";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import EventsPanel from "./EventsPanel";
import AddEventModal from "./AddEventModal";

export default function Calendar({
  events,
  deleteEvent,
  currentUser,
  addEvent,
}) {
  const calendar = useCalendar();

  // Go-to inputs
  const [gotoMonth, setGotoMonth] = useState("");
  const [gotoYear, setGotoYear] = useState("");
  const [monthError, setMonthError] = useState(false);

  const handleGoTo = () => {
    const m = parseInt(gotoMonth, 10) - 1;
    const y = parseInt(gotoYear, 10);

    if (isNaN(m) || m < 0 || m > 11) {
      setMonthError(true);
      return;
    }

    setMonthError(false);

    if (!isNaN(y)) {
      calendar.goToDate(m, y);
      setGotoMonth("");
      setGotoYear("");
    }
  };

  return (
    <div className="calendar-container">
      {/* LEFT SIDE — calendar grid */}
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

          <CalendarGrid
            month={calendar.month}
            year={calendar.year}
            activeDay={calendar.activeDay}
            setActiveDay={calendar.setActiveDay}
            events={events}
          />

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
        <EventsPanel
          events={events}
          activeDay={calendar.activeDay}
          month={calendar.month}
          year={calendar.year}
          deleteEvent={deleteEvent}
          currentUser={currentUser}
        />

        <AddEventModal addEvent={addEvent} />
      </div>
    </div>
  );
}
