import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../views/styles/reservation.css';
import reservationImg from '../../assets/reservation.jpg';

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
  const { t } = useTranslation();
  const [tableId, setTableId] = useState('');
  const [pepole, setPepole] = useState(1);
  const [duration, setDuration] = useState(120); // default 2 hours
  const [datetime, setDatetime] = useState('');
  const [note, setNote] = useState('');

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
      <h2>{t('reservationForm.title')}</h2>
      <div className="form-content">
        <img
          src={reservationImg}
          alt="Reservation"
          className="reservation-image"
        />
        {/* DATE & TIME */}
        <label className="form-label">
          {t('reservationForm.dateTime')}
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
          {t('reservationForm.people')}
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
          {t('reservationForm.duration')}
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            disabled={disabledForm}
            className="form-input"
          >
            <option value={60}>{t('reservationForm.oneHour')}</option>
            <option value={90}>{t('reservationForm.oneHalfHours')}</option>
            <option value={120}>{t('reservationForm.twoHours')}</option>
            <option value={150}>{t('reservationForm.twoHalfHours')}</option>
            <option value={180}>{t('reservationForm.threeHours')}</option>
          </select>
        </label>

        {/* TABLE */}
        <label className="form-label">
          {t('reservationForm.selectTableLabel')}
          <select
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
            disabled={disabledForm || tables.length === 0}
            className="form-input"
            required
          >
            <option value="">{t('reservationForm.selectTable')}</option>
            {tables.map((table) => (
              <option key={table.id} value={table.id}>
                {t('reservationForm.tableNumber')}{table.id}
              </option>
            ))}
          </select>
        </label>

        {/* NO TABLES */}
        {tables.length === 0 && !disabledForm && (
          <p className="no-tables">{t('reservationForm.noFreeTables')}</p>
        )}

        {/* ADMIN NOTES FIELD */}
        {isAdmin && (
          <label className="form-label">
            {t('reservationForm.notesLabel')}
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="form-input"
              rows={3}
              placeholder={t('reservationForm.notesPlaceholder')}
            />
          </label>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={disabledForm || disabledReserve}
          className="btn-submit"
        >
          {t('nav.reservation')}
        </button>
      </div>
    </form>
  );
}
