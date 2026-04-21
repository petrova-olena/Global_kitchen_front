export default function EventsPanel({
  activeDay,
  month,
  year,
  events,
  deleteEvent,
}) {
  const dayEvents = events.find(
    (e) => e.day === activeDay && e.month === month + 1 && e.year === year,
  );

  // If there are no events for the selected day, show a message
  if (!dayEvents) {
    return (
      <div className="no-event">
        <h3>No events scheduled</h3>
      </div>
    );
  }

  return (
    <div className="events">
      {dayEvents.events.map((ev, i) => (
        <div className="event" key={i}>
          <div className="title">
            <i className="fas fa-circle"></i>
            <h3>{ev.title}</h3>
          </div>
          <div className="event-time">{ev.time}</div>

          <button className="delete-btn" onClick={() => deleteEvent(ev.title)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
