import { useState } from "react";
import { findAvailabilityForTable } from "../../utils/reservationAvailability";
// путь подстрой под свой проект

export default function EditReservationModal({
  reservation,
  reservations,
  onSave,
  onCancel,
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
  const [tableId, setTableId] = useState(reservation.tableId);
  const [from, setFrom] = useState(toLocalInputValue(reservation.from));
  const [duration, setDuration] = useState(120);
  const [guests, setGuests] = useState(reservation.guests);

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
    const start = new Date(from);
    const end = new Date(start.getTime() + duration * 60000);
    const expire = new Date(end.getTime() + 60 * 60000); // +1 час буфер

    onSave({
      tableId: Number(tableId),
      reservationTime: start.toISOString(),
      pepole: Number(guests),
      expire: expire.toISOString(),
    });
  }

  // Render
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit reservation</h3>

        <label>Table</label>
        <input
          type="number"
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
        />

        <label>Start time</label>
        <input
          type="datetime-local"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <label className="form-label">
          Duration
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="form-input"
          >
            <option value={60}>1 hour</option>
            <option value={90}>1.5 hours</option>
            <option value={120}>2 hours</option>
            <option value={150}>2.5 hours</option>
            <option value={180}>3 hours</option>
          </select>
        </label>

        <label>Guests</label>
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />

        {checkResult === "free" && (
          <p style={{ color: "green" }}>Table is available</p>
        )}

        {checkResult === "busy" && (
          <p style={{ color: "red" }}>Table is not available</p>
        )}

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>

          <button className="save-btn" onClick={handleCheck}>
            Check availability
          </button>

          {checkResult === "free" && (
            <button
              className="save-btn"
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
          <div className="modal">
            <h3>Table is busy</h3>
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
                className="cancel-btn"
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
          <div className="modal">
            <h3>Confirm changes</h3>

            <p>Table: {tableId}</p>
            <p>Start: {from.replace("T", " ")}</p>
            <p>Duration: {duration} min</p>
            <p>Guests: {guests}</p>

            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>

              <button className="save-btn" onClick={handleSave}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
