import "./editReservations.css";

import { useState } from "react";
import { findAvailabilityForTable } from "../../utils/reservationAvailability";

export default function EditReservationModal({
  reservation,
  reservations,
  tables,
  onSave,
  onCancel,
  isAdmin = false,
}) {
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
        <h3 className="modal-title">Edit reservation</h3>

        <div className="modal-form">
          <label className="modal-label">
            Table
            <select
              className="modal-select"
              value={tableId}
              onChange={(e) => setTableId(e.target.value)}
            >
              {tables.map((t) => (
                <option key={t.id} value={t.id}>
                  Table #{t.id}
                </option>
              ))}
            </select>
          </label>

          <label className="modal-label">
            Start time
            <input
              type="datetime-local"
              className="modal-input"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </label>

          <label className="modal-label">
            Duration
            <select
              className="modal-select"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
              <option value={150}>2.5 hours</option>
              <option value={180}>3 hours</option>
            </select>
          </label>

          <label className="modal-label">
            Guests
            <input
              type="number"
              className="modal-input"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </label>

          {isAdmin && (
            <label className="modal-label">
              Notes
              <textarea
                className="modal-textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter notes for this reservation"
                rows={3}
              />
            </label>
          )}

          {checkResult === "free" && (
            <p style={{ color: "green" }}>Table is available</p>
          )}

          {checkResult === "busy" && (
            <p style={{ color: "red" }}>Table is not available</p>
          )}

          <div className="modal-buttons">
            <button className="modal-btn modal-btn-cancel" onClick={onCancel}>
              Cancel
            </button>

            <button className="modal-btn modal-btn-save" onClick={handleCheck}>
              Check availability
            </button>

            {checkResult === "free" && (
              <button
                className="modal-btn modal-btn-save"
                onClick={() => setShowConfirmModal(true)}
              >
                Save changes
              </button>
            )}
          </div>
        </div>

        {/* Busy modal */}
        {showBusyModal && (
          <div className="modal-overlay">
            <div className="modal-window">
              <h3 className="modal-title">Table is busy</h3>

              <p>Available intervals:</p>

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
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirm modal */}
        {showConfirmModal && (
          <div className="modal-overlay">
            <div className="modal-window">
              <h3 className="modal-title">Confirm changes</h3>

              <p>Table: {tableId}</p>
              <p>Start: {from.replace("T", " ")}</p>
              <p>Duration: {duration} min</p>
              <p>Guests: {guests}</p>

              <div className="modal-buttons">
                <button
                  className="modal-btn modal-btn-cancel"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="modal-btn modal-btn-save"
                  onClick={handleSave}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
