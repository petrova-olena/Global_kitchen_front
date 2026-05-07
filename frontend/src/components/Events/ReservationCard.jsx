import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  formatDate,
  formatTime,
  getUserVisibleEndTime,
} from "../../utils/dateHelpers";

export default function ReservationCard({ reservation, onDelete, onEdit }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="reservation-item-row">
      <div className="reservation-item-left">
        <div className="reservation-title">{t("reservationCard.title")}</div>

        <div className="reservation-table">
          <span className="event-icon">🍽️</span>
          {t("reservationCard.table")}:{" "}
          {reservation.tableId ?? reservation.table}
        </div>

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

        <div className="reservation-guests">
          {t("reservationCard.guests")}: {reservation.guests}
        </div>

        {reservation.notes && (
          <div className="reservation-notes">
            {t("reservationCard.notes")}: {reservation.notes}
          </div>
        )}

        {reservation.userName && (
          <div className="reservation-user">
            {t("reservationCard.user")}: {reservation.userName}
          </div>
        )}
      </div>

      <div className="event-actions">
        <button className="edit-btn" onClick={() => onEdit(reservation)}>
          ✏️
        </button>

        <button className="delete-btn" onClick={() => setShowConfirm(true)}>
          🗑️
        </button>
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{t("reservationCard.user")}</p>

            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowConfirm(false)}
              >
                {t("reservationCard.cancel")}
              </button>

              <button
                className="delete-btn"
                onClick={async () => {
                  await onDelete(reservation.id);
                  setShowConfirm(false);
                }}
              >
                {t("reservationCard.delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
