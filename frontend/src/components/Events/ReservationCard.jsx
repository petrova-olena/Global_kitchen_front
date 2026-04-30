import { useTranslation } from 'react-i18next';

export default function ReservationCard({ reservation }) {
  const { t } = useTranslation();
  return (
    <div className="reservation-item">
      <div className="reservation-title">{t('modals.tableReservation')}</div>
      <div className="reservation-time">
        {reservation.from} — {reservation.to}
      </div>
      <div className="reservation-guests">{t('forms.guests')}: {reservation.guests}</div>
      {reservation.notes && (
        <div className="reservation-notes">{reservation.notes}</div>
      )}
    </div>
  );
}
