import { useState } from "react";
import "./reservation.css";

export default function ReservationForm({
  tables,
  onSubmit,
  disabled,
  onDatetimeChange,
}) {
  const [tableId, setTableId] = useState("");
  const [datetime, setDatetime] = useState("");
  const [pepole, setPepole] = useState(1);
  const [duration, setDuration] = useState(120); // default 2 hours

  function handleDatetimeChange(e) {
    const value = e.target.value;
    setDatetime(value);
    onDatetimeChange(value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      tableId,
      datetime,
      pepole,
      duration, // minutes
    });
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <label className="form-label">
        Date & Time
        <input
          type="datetime-local"
          value={datetime}
          onChange={handleDatetimeChange}
          disabled={disabled}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Number of People
        <input
          type="number"
          min="1"
          max="20"
          value={pepole}
          onChange={(e) => setPepole(e.target.value)}
          disabled={disabled}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Duration
        <select
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          disabled={disabled}
          className="form-input"
        >
          <option value={60}>1 hour</option>
          <option value={90}>1.5 hours</option>
          <option value={120}>2 hours</option>
          <option value={150}>2.5 hours</option>
          <option value={180}>3 hours</option>
        </select>
      </label>

      <label className="form-label">
        Table
        <select
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
          disabled={disabled || tables.length === 0}
          className="form-input"
        >
          <option value="">Select table</option>
          {tables.map((t) => (
            <option key={t.id} value={t.id}>
              Table #{t.id}
            </option>
          ))}
        </select>
      </label>

      {tables.length === 0 && !disabled && (
        <p className="no-tables">No free tables for selected time</p>
      )}

      <button type="submit" disabled={disabled} className="btn-submit">
        Reserve
      </button>
    </form>
  );
}
