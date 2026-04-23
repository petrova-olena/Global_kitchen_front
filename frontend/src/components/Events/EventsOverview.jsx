import { useState, useEffect } from "react";
import EventsCard from "./EventsCard";
import ReservationCard from "./ReservationCard";

export default function EventsOverview() {
  const currentUser = { id: "olenatest", role: "user" };

  const [events, setEvents] = useState([]);

  // Load events on component mount
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("http://localhost:3000/api/v1/calenderEvent");
        const data = await res.json();
        setEvents(data.events || []);
      } catch (err) {
        console.error("Failed to load events:", err);
      }
    }

    fetchEvents();
  }, []);

  // Filters
  const [mode, setMode] = useState("week");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  // Event separation
  const restaurantEvents = events.filter((e) => e.type === "admin");
  const reservations = [];
  const userEvents = events.filter((e) => e.created_by === currentUser.id);

  return (
    <div className="events-overview">
      {/* Period filters */}
      <div className="events-filter">
        <button
          className={mode === "week" ? "active" : ""}
          onClick={() => setMode("week")}
        >
          Current week
        </button>

        <button
          className={mode === "month" ? "active" : ""}
          onClick={() => setMode("month")}
        >
          Current month
        </button>

        <button
          className={mode === "custom" ? "active" : ""}
          onClick={() => setMode("custom")}
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

      {/* Restaurant Events */}
      <EventsCard
        title="Restaurant Events"
        events={restaurantEvents}
        renderItem={(item) => (
          <div key={item.id} className="event-item">
            <div className="event-title">{item.title}</div>
            <div className="event-time">
              {item.start_date} — {item.end_date}
            </div>
            <div className="event-desc">{item.description}</div>
          </div>
        )}
        emptyText="No restaurant events for the selected period"
      />

      {/* My Events */}
      <EventsCard
        title="My Events"
        events={[...reservations, ...userEvents]}
        renderItem={(item) =>
          item.tableId ? (
            <ReservationCard reservation={item} />
          ) : (
            <div key={item.id} className="event-item">
              <div className="event-title">{item.title}</div>
              <div className="event-time">
                {item.start_date} — {item.end_date}
              </div>
              <div className="event-desc">{item.description}</div>
            </div>
          )
        }
        emptyText="You have no scheduled events for the selected period"
      />
    </div>
  );
}
