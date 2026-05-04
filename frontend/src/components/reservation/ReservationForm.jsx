import { useEffect, useState } from "react";
import "./reservation.css";

export default function ReservationForm({
  tables,
  onSubmit,
  disabledForm,
  disabledReserve,
  onDatetimeChange,
  prefillTable,
  prefillDate,
  prefillTime,
  isAdmin = false,
}) {
  const [tableId, setTableId] = useState("");
  const [pepole, setPepole] = useState(1);
  const [duration, setDuration] = useState(120); // default 2 hours
  const [datetime, setDatetime] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (prefillDate && prefillTime) {
      setDatetime(`${prefillDate}T${prefillTime}`);
    }
  }, [prefillDate, prefillTime]);

  useEffect(() => {
    if (prefillTable) {
      setTableId(String(prefillTable));
    }
  }, [prefillTable]);

  // Notify parent when datetime changes
  useEffect(() => {
    if (datetime) {
      onDatetimeChange(datetime);
    }
  }, [datetime]);

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
      duration,
      note: isAdmin ? note : null,
    });
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      {/* DATE & TIME */}
      <label className="form-label">
        Date & Time
        <input
          type="datetime-local"
          value={datetime}
          onChange={handleDatetimeChange}
          disabled={disabledForm}
          className="form-input"
          required
        />
      </label>

      {/* PEOPLE */}
      <label className="form-label">
        Number of People
        <input
          type="number"
          min="1"
          max="20"
          value={pepole}
          onChange={(e) => setPepole(e.target.value)}
          disabled={disabledForm}
          className="form-input"
          required
        />
      </label>

      {/* DURATION */}
      <label className="form-label">
        Duration
        <select
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          disabled={disabledForm}
          className="form-input"
        >
          <option value={60}>1 hour</option>
          <option value={90}>1.5 hours</option>
          <option value={120}>2 hours</option>
          <option value={150}>2.5 hours</option>
          <option value={180}>3 hours</option>
        </select>
      </label>

      {/* TABLE */}
      <label className="form-label">
        Table
        <select
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
          disabled={disabledForm || tables.length === 0}
          className="form-input"
          required
        >
          <option value="">Select table</option>
          {tables.map((t) => (
            <option key={t.id} value={t.id}>
              Table #{t.id}
            </option>
          ))}
        </select>
      </label>

      {/* NO TABLES */}
      {tables.length === 0 && !disabledForm && (
        <p className="no-tables">No free tables for selected time</p>
      )}

      {/* ADMIN NOTES FIELD */}
      {isAdmin && (
        <label className="form-label">
          Notes
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="form-input"
            rows={3}
            placeholder="Enter notes"
          />
        </label>
      )}

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={disabledForm || disabledReserve}
        className="btn-submit"
      >
        Reserve
      </button>
    </form>
  );
}
