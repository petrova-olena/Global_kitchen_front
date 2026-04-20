import { useState } from "react";
import EventsCard from "./EventsCard";
import ReservationCard from "./ReservationCard";

export default function EventsOverview() {
  //const user = { id: "user123", role: "user" };

  const [mode, setMode] = useState("week");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  // TODO: Replace with real data fetching and state management
  const restaurantEvents = []; // global + admin-created events
  const reservations = [];
  const userEvents = [];

  // TODO: Add filtering logic later
  const filteredRestaurant = restaurantEvents;
  const filteredReservations = reservations;
  const filteredUserEvents = userEvents;

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
        events={filteredRestaurant}
        emptyText="No restaurant events for the selected period"
      />

      {/* My Events */}
      <EventsCard
        title="My Events"
        events={[...filteredReservations, ...filteredUserEvents]}
        renderItem={(item) =>
          item.tableId ? (
            <ReservationCard reservation={item} />
          ) : (
            <div key={item.id} className="event-item">
              <div className="event-title">{item.title}</div>
              <div className="event-time">
                {item.from} — {item.to}
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
