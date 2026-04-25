import { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import EventsCard from "./EventsCard";
import ReservationCard from "./ReservationCard";
import { loadEvents } from "../../utils/loadEvents";

export default function EventsOverview() {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [events, setEvents] = useState([]);

  // Load events from backend on mount
  useEffect(() => {
    loadEvents().then(setEvents);
  }, []);

  // ADD event
  async function addEvent(title, description, from, to) {
    if (!currentUser || !currentUser.id) {
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
          type: currentUser.role,
          title,
          description,
          start_date,
          end_date,
          created_by: currentUser.id,
        }),
      });

      if (res.ok) {
        loadEvents().then(setEvents);
      }
    } catch (err) {
      console.error("Failed to create event:", err);
    }
  }

  // DELETE event
  async function deleteEvent(id) {
    try {
      await fetch(`http://localhost:3000/api/v1/calenderEvent/${id}`, {
        method: "DELETE",
      });

      loadEvents().then(setEvents);
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  }

  // Filters
  const [mode, setMode] = useState("week");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  // Reset custom range when switching modes
  function changeMode(newMode) {
    setMode(newMode);

    if (newMode !== "custom") {
      setCustomFrom("");
      setCustomTo("");
    }
  }

  // ---------- helpers: dates without time ----------

  function toDateOnly(iso) {
    return iso.slice(0, 10);
  }

  function parseDate(dateStr) {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function rangesOverlapDates(
    eventStartStr,
    eventEndStr,
    rangeStartStr,
    rangeEndStr,
  ) {
    const eventStart = parseDate(eventStartStr);
    const eventEnd = parseDate(eventEndStr);
    const rangeStart = parseDate(rangeStartStr);
    const rangeEnd = parseDate(rangeEndStr);

    return eventStart <= rangeEnd && eventEnd >= rangeStart;
  }

  function isInCurrentWeek(eventStartStr, eventEndStr) {
    const today = new Date();
    const weekStart = new Date(today);
    const day = today.getDay();
    const offset = day === 0 ? -6 : 1 - day;
    weekStart.setDate(today.getDate() + offset);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const startStr = weekStart.toISOString().slice(0, 10);
    const endStr = weekEnd.toISOString().slice(0, 10);

    return rangesOverlapDates(eventStartStr, eventEndStr, startStr, endStr);
  }

  function isInCurrentMonth(eventStartStr, eventEndStr) {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();

    const monthStartStr = `${y}-${String(m + 1).padStart(2, "0")}-01`;
    const lastDay = new Date(y, m + 1, 0).getDate();
    const monthEndStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

    return rangesOverlapDates(
      eventStartStr,
      eventEndStr,
      monthStartStr,
      monthEndStr,
    );
  }

  function isInCustomRange(eventStartStr, eventEndStr) {
    if (!customFrom || !customTo) return false;
    return rangesOverlapDates(eventStartStr, eventEndStr, customFrom, customTo);
  }

  // ---------- filtering ----------

  const filteredEvents = events.filter((e) => {
    const start = toDateOnly(e.start_date);
    const end = toDateOnly(e.end_date);

    if (mode === "week") return isInCurrentWeek(start, end);
    if (mode === "month") return isInCurrentMonth(start, end);
    if (mode === "custom") return isInCustomRange(start, end);

    return true;
  });

  const restaurantEvents = filteredEvents.filter((e) => e.type === "admin");
  const userEvents = filteredEvents.filter(
    (e) => e.created_by === currentUser.id,
  );
  const reservations = [];

  // ---------- formatting ----------

  function formatTime(iso) {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function formatDate(iso) {
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
  }

  return (
    <>
      {/* Daily Calendar */}
      <Calendar
        events={events}
        deleteEvent={deleteEvent}
        currentUser={currentUser}
        addEvent={addEvent}
      />
      <div className="events-overview">
        <div className="events-filter">
          <button
            className={mode === "week" ? "active" : ""}
            onClick={() => changeMode("week")}
          >
            Current week
          </button>

          <button
            className={mode === "month" ? "active" : ""}
            onClick={() => changeMode("month")}
          >
            Current month
          </button>

          <button
            className={mode === "custom" ? "active" : ""}
            onClick={() => changeMode("custom")}
          >
            Choose period
          </button>
        </div>

        {mode === "custom" && (
          <div className="custom-range">
            <input
              type="date"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
            />
            <input
              type="date"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
            />
          </div>
        )}

        <EventsCard
          title="Restaurant Events"
          events={restaurantEvents}
          deleteEvent={deleteEvent}
          renderItem={(item, deleteEvent) => (
            <div key={item.id} className="event-item">
              <div className="event-title">{item.title}</div>

              <div className="event-time">
                <div>
                  <span className="event-icon">📅</span>
                  {formatDate(item.start_date)}
                  {formatDate(item.start_date) !==
                    formatDate(item.end_date) && (
                    <> — {formatDate(item.end_date)}</>
                  )}
                </div>

                <div>
                  <span className="event-icon">🕒</span>
                  {formatTime(item.start_date)} — {formatTime(item.end_date)}
                </div>
              </div>

              <div className="event-desc">{item.description}</div>
              {/* delete only for admin */}
              {currentUser.role === "admin" && (
                <button
                  className="delete-btn"
                  onClick={() => deleteEvent(item.id)}
                >
                  Delete event
                </button>
              )}
            </div>
          )}
          emptyText="No restaurant events for the selected period"
        />

        <EventsCard
          title="My Events"
          events={[...reservations, ...userEvents]}
          deleteEvent={deleteEvent}
          renderItem={(item, deleteEvent) =>
            item.tableId ? (
              <ReservationCard reservation={item} />
            ) : (
              <div key={item.id} className="event-item">
                <div className="event-title">{item.title}</div>

                <div className="event-time">
                  <div>
                    <span className="event-icon">📅</span>
                    {formatDate(item.start_date)}
                    {formatDate(item.start_date) !==
                      formatDate(item.end_date) && (
                      <> — {formatDate(item.end_date)}</>
                    )}
                  </div>

                  <div>
                    <span className="event-icon">🕒</span>
                    {formatTime(item.start_date)} — {formatTime(item.end_date)}
                  </div>
                </div>

                <div className="event-desc">{item.description}</div>
                {/* delete only for user events */}
                {item.type === "user" && (
                  <button
                    className="delete-btn"
                    onClick={() => deleteEvent(item.id)}
                  >
                    Delete event
                  </button>
                )}
              </div>
            )
          }
          emptyText="You have no scheduled events for the selected period"
        />
      </div>
    </>
  );
}
