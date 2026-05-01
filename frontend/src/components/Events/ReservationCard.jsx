import { useState } from "react";
//import { useTranslation } from "react-i18next";
import {
  formatDate,
  formatTime,
  getUserVisibleEndTime,
} from "../../utils/dateHelpers";

export default function ReservationCard({ reservation, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  //const { t } = useTranslation();

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
          {formatTime(getUserVisibleEndTime(reservation.to))}
        </div>

        <div className="reservation-guests">Guests: {reservation.guests}</div>

        {reservation.notes && (
          <div className="reservation-notes">{reservation.notes}</div>
        )}
      </div>

      <button className="delete-btn" onClick={() => setShowConfirm(true)}>
        🗑️
      </button>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to cancel this reservation?</p>

            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="delete-btn"
                onClick={() => onDelete(reservation.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
