function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(iso) {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}

export default function ReservationCard({ reservation }) {
  return (
    <div className="reservation-item-row">
      <div className="reservation-item-left">
        <div className="reservation-title">Table reservation</div>

        <div className="reservation-time">
          <span className="event-icon">📅</span>
          {formatDate(reservation.from)}
          {" — "}
          {formatDate(reservation.to)}
        </div>

        <div className="reservation-time">
          <span className="event-icon">🕒</span>
          {formatTime(reservation.from)}
          {" — "}
          {formatTime(reservation.to)}
        </div>

        <div className="reservation-guests">Guests: {reservation.guests}</div>

        {reservation.notes && (
          <div className="reservation-notes">{reservation.notes}</div>
        )}
      </div>
    </div>
  );
}
