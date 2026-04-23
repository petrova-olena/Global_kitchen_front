export default function EventsPanel({ events, activeDay, month, year }) {
  const selectedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(
    activeDay,
  ).padStart(2, "0")}`;

  const dayEvents = events.filter((e) => e.start_date === selectedDate);

  return (
    <div className="events-panel">
      <h3>Events for {selectedDate}</h3>

      {dayEvents.length === 0 && <p>No events</p>}

      {dayEvents.map((ev) => (
        <div key={ev.id} className="event-item">
          <div className="event-title">{ev.title}</div>
          <div className="event-time">
            {ev.start_date} — {ev.end_date}
          </div>
          <div className="event-desc">{ev.description}</div>
        </div>
      ))}
    </div>
  );
}
