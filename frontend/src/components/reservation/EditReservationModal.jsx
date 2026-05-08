import "./editReservations.css";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { findAvailabilityForTable } from "../../utils/reservationAvailability";

export default function EditReservationModal({
  reservation,
  reservations,
  tables,
  onSave,
  onCancel,
  isAdmin = false,
}) {
  const { t } = useTranslation();
  // -----------------------------
  // Helpers
  // -----------------------------
  function toLocalInputValue(isoString) {
    const date = new Date(isoString);
    const pad = (n) => String(n).padStart(2, "0");

    const yyyy = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const min = pad(date.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  }

  function toIsoFromLocal(localString) {
    return new Date(localString).toISOString();
  }

  // -----------------------------
  // State
  // -----------------------------
  const [tableId, setTableId] = useState(
    reservation.tableId ?? reservation.table,
  );
  const [from, setFrom] = useState(toLocalInputValue(reservation.from));
  const [duration, setDuration] = useState(120);
  const [guests, setGuests] = useState(reservation.guests);

  const [note, setNote] = useState(reservation.notes ?? reservation.note ?? "");

  const [checkResult, setCheckResult] = useState(null);
  const [showBusyModal, setShowBusyModal] = useState(false);
  const [busyIntervals, setBusyIntervals] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Check availability
  function handleCheck() {
    const reservationsWithoutCurrent = reservations.filter(
      (r) => r.id !== reservation.id,
    );

    const availability = findAvailabilityForTable(
      Number(tableId),
      toIsoFromLocal(from),
      reservationsWithoutCurrent,
    );

    const start = new Date(toIsoFromLocal(from));
    const end = new Date(start.getTime() + duration * 60000);

    const fits = availability.intervals.some((interval) => {
      return start >= interval.from && end <= interval.to;
    });

    if (fits) {
      setCheckResult("free");
    } else {
      setCheckResult("busy");
      setBusyIntervals(availability.intervals);
      setShowBusyModal(true);
    }
  }

  // Save
  function handleSave() {
    const start = new Date(from + ":00");
    const end = new Date(start.getTime() + duration * 60000);
    const expire = new Date(end.getTime() + 60 * 60000); // +1 hour

    onSave({
      tableId: Number(tableId),
      reservationTime: start.toISOString(),
      pepole: Number(guests),
      expire: expire.toISOString(),
      note: isAdmin ? note : null,
    });
  }

  // Render
  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <h3 className="modal-title">{t("modals.editReservation")}</h3>

        <div className="modal-form">
          <label className="modal-label">
            {t("modals.table")}
            <select
              className="modal-select"
              value={tableId}
              onChange={(e) => setTableId(e.target.value)}
            >
              {tables.map((t) => (
                <option key={t.id} value={t.id}>
                  {t("reservationForm.tableNumber")} {t.id}
                </option>
              ))}
            </select>
          </label>

          <label className="modal-label">
            {t("modals.startTime")}
            <input
              type="datetime-local"
              className="modal-input"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </label>

          <label className="modal-label">
            {t("modals.duration")}
            <select
              className="modal-select"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value={60}>{t("reservationForm.oneHour")}</option>
              <option value={90}>{t("reservationForm.oneHalfHours")}</option>
              <option value={120}>{t("reservationForm.twoHours")}</option>
              <option value={150}>{t("reservationForm.twoHalfHours")}</option>
              <option value={180}>{t("reservationForm.threeHours")}</option>
            </select>
          </label>

          <label className="modal-label">
            {t("modals.guests")}
            <input
              type="number"
              className="modal-input"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </label>

          {isAdmin && (
            <label className="modal-label">
              {t("modals.notes")}
              <textarea
                className="modal-textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t("modals.enterNotes")}
                rows={3}
              />
            </label>
          )}

          {checkResult === "free" && (
            <p style={{ color: "green" }}>{t("modals.tableAvailable")}</p>
          )}

          {checkResult === "busy" && (
            <p style={{ color: "red" }}>{t("modals.tableNotAvailable")}</p>
          )}

          <div className="modal-buttons">
            <button className="modal-btn modal-btn-cancel" onClick={onCancel}>
              {t("modals.cancel")}
            </button>

            <button className="modal-btn modal-btn-save" onClick={handleCheck}>
              {t("modals.checkAvailability")}
            </button>

            {checkResult === "free" && (
              <button
                className="modal-btn modal-btn-save"
                onClick={() => setShowConfirmModal(true)}
              >
                {t("modals.saveChanges")}
              </button>
            )}
          </div>
        </div>

        {/* Busy modal */}
        {showBusyModal && (
          <div className="modal-overlay">
            <div className="modal-window">
              <h3 className="modal-title">{t("modals.tableBusy")}</h3>

              <p>{t("modals.availableIntervals")}</p>

              {busyIntervals.map((i, idx) => (
                <div key={idx}>
                  {i.from.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  —{" "}
                  {i.to.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              ))}

              <div className="modal-buttons">
                <button
                  className="modal-btn modal-btn-cancel"
                  onClick={() => setShowBusyModal(false)}
                >
                  {t("modals.close")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirm modal */}
        {showConfirmModal && (
          <div className="modal-overlay">
            <div className="modal-window">
              <h3 className="modal-title">{t("modals.confirmChanges")}</h3>

              <p>{t("modals.table")}: {tableId}</p>
              <p>{t("modals.start")}: {from.replace("T", " ")}</p>
              <p>{t("modals.duration")}: {duration} {t("modals.min")}</p>
              <p>{t("modals.guests")}: {guests}</p>

              <div className="modal-buttons">
                <button
                  className="modal-btn modal-btn-cancel"
                  onClick={() => setShowConfirmModal(false)}
                >
                  {t("modals.cancel")}
                </button>

                <button
                  className="modal-btn modal-btn-save"
                  onClick={handleSave}
                >
                  {t("modals.confirm")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
