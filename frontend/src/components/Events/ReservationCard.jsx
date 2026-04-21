export default function ReservationCard({ reservation }) {
  return (
    <div className="reservation-item">
      <div className="reservation-title">Бронирование столика</div>
      <div className="reservation-time">
        {reservation.from} — {reservation.to}
      </div>
      <div className="reservation-guests">Гостей: {reservation.guests}</div>
      {reservation.notes && (
        <div className="reservation-notes">{reservation.notes}</div>
      )}
    </div>
  );
}
