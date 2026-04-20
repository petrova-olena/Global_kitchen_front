import { useState, useEffect } from "react";

export default function EventsCard({ title, events, renderItem, emptyText }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 900);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 900;
      setIsMobile(mobile);

      // if we switch to mobile, collapse the card;
      // but if we switch to desktop, expand it
      if (!mobile) setIsOpen(true);
    };

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className={`events-card ${isMobile ? "accordion" : ""}`}>
      {/* Card Header */}
      <div
        className="events-card-header"
        onClick={() => isMobile && setIsOpen(!isOpen)}
      >
        <h3>{title}</h3>
        {isMobile && <span className="arrow">{isOpen ? "▾" : "▸"}</span>}
      </div>

      {/* Accordion Content */}
      {(!isMobile || isOpen) && (
        <div className="events-card-content">
          {events.length === 0 ? (
            <p className="empty">{emptyText || "No events"}</p>
          ) : (
            events.map((ev) =>
              renderItem ? (
                renderItem(ev)
              ) : (
                <div key={ev.id} className="event-item">
                  <div className="event-title">{ev.title}</div>
                  <div className="event-time">
                    {ev.from} — {ev.to}
                  </div>
                  <div className="event-desc">{ev.description}</div>
                </div>
              ),
            )
          )}
        </div>
      )}
    </div>
  );
}
