export default function EventsPanel({
  events,
  activeDay,
  month,
  year,
  deleteEvent,
  currentUser,
}) {
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

  // Filter events that occur on the selected day
  // --- FILTER BY USER ROLE ---
  const visibleEvents = events.filter((e) => {
    if (currentUser.role === "admin") return true;

    // user sees only admin events + their own
    return e.type === "admin" || e.created_by === currentUser.id;
  });

  // --- FILTER BY SELECTED DAY ---
  const dayEvents = visibleEvents.filter((e) =>
    eventOccursOnDay(e, selectedDate),
  );

  return (
    <div className="events-panel">
      <h3>Events for {selectedDate}</h3>

      {dayEvents.length === 0 && <p>No events</p>}

      {dayEvents.map((ev) => (
        <div key={ev.id} className="event-item">
          <div className="event-title">{ev.title}</div>

          <div className="event-time">
            {/* Date (one or range) */}
            <div>
              <span className="event-icon">📅</span>
              {formatDate(ev.start_date)}
              {formatDate(ev.start_date) !== formatDate(ev.end_date) && (
                <> — {formatDate(ev.end_date)}</>
              )}
            </div>

            {/* Time */}
            <div>
              <span className="event-icon">🕒</span>
              {formatTime(ev.start_date)} — {formatTime(ev.end_date)}
            </div>
          </div>

          <div className="event-desc">{ev.description}</div>
          {/* --- DELETE BUTTON LOGIC --- */}
          {(ev.type === "user" || currentUser.role === "admin") && (
            <button className="delete-btn" onClick={() => deleteEvent(ev.id)}>
              Delete event
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
