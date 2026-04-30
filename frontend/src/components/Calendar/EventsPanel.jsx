import { useNavigate } from "react-router-dom";

export default function EventsPanel({
  events,
  activeDay,
  month,
  year,
  deleteEvent,
  currentUser,
}) {
  const navigate = useNavigate();

  // Form date in YYYY-MM-DD format
  const selectedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(
    activeDay,
  ).padStart(2, "0")}`;

  // --- Date and time formatting ---
  function formatTime(iso) {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function formatDate(iso) {
    const d = new Date(iso);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }

  // --- Check if event occurs on the selected day ---
  function eventOccursOnDay(event, dayStr) {
    const start = event.start_date.slice(0, 10); // YYYY-MM-DD
    const end = event.end_date.slice(0, 10);
    return start <= dayStr && end >= dayStr;
  }

  if (!currentUser) {
    return (
      <div className="events-panel">
        <h3>Events for {selectedDate}</h3>
        <p>Log in to view available events</p>
      </div>
    );
  }

  // Filter events that occur on the selected day
  const visibleEvents = events.filter((e) => {
    if (e.type === "admin") return true;

    // user sees only admin events + their own
    return e.type === "user" && e.created_by === currentUser.id;
  });

  // --- FILTER BY SELECTED DAY ---
  const dayEvents = visibleEvents.filter((e) =>
    eventOccursOnDay(e, selectedDate),
  );

  return (
    <div className="events-panel">
      <h3>Events for {selectedDate}</h3>

      {/* Scrollable area */}
      <div className="events-scroll">
        {dayEvents.length === 0 && <p>No events</p>}

        {dayEvents.map((ev) => (
          <div key={ev.id} className="event-item-row">
            <div className="event-item-left">
              <div className="event-title">{ev.title}</div>

              <div className="event-time">
                <div>
                  <span className="event-icon">📅</span>
                  {formatDate(ev.start_date)}
                  {formatDate(ev.start_date) !== formatDate(ev.end_date) && (
                    <> — {formatDate(ev.end_date)}</>
                  )}
                </div>

                <div>
                  <span className="event-icon">🕒</span>
                  {formatTime(ev.start_date)} — {formatTime(ev.end_date)}
                </div>
              </div>

              <div className="event-desc">{ev.description}</div>
            </div>

            {(ev.type === "user" || currentUser.role === "admin") && (
              <button
                className="delete-btn delete-right"
                onClick={() => deleteEvent(ev.id)}
              >
                🗑
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer with buttons */}
      <div className="events-footer">
        {currentUser?.role === "admin" && (
          <button
            className="admin-panel-btn"
            onClick={() => navigate("/admin")}
          >
            Admin Panel
          </button>
        )}
      </div>
    </div>
  );
}
