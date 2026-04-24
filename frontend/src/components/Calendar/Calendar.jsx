import "./calendar.css";

import { useState, useEffect } from "react";
import { useCalendar } from "./useCalendar";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import EventsPanel from "./EventsPanel";
import AddEventModal from "./AddEventModal";
import { loadEvents } from "../../utils/loadEvents";

export default function Calendar() {
  const calendar = useCalendar();

  const [events, setEvents] = useState([]);

  // GET events from backend
  useEffect(() => {
    loadEvents().then(setEvents);
  }, []);

  // POST event to backend
  async function addEvent(title, description, from, to) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
      console.error("User not logged in");
      return;
    }

    try {
      const start_date = from.replace("T", " ") + ":00";
      const end_date = to.replace("T", " ") + ":00";

      const res = await fetch("http://localhost:3000/api/v1/calenderEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: user.role,
          title,
          description,
          start_date,
          end_date,
          created_by: user.id,
        }),
      });

      if (res.ok) {
        loadEvents();
      }
    } catch (err) {
      console.error("Failed to create event:", err);
    }
  }

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
        />

        <AddEventModal addEvent={addEvent} />
      </div>
    </div>
  );
}
