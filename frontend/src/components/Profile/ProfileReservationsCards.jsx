import React from 'react';
import { useTranslation } from 'react-i18next';

const ProfileReservationsCards = ({ reservations, onCancel }) => {
  const { t } = useTranslation();

  if (!reservations || reservations.length === 0) {
    return <p>{t('noReservations')}</p>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="events-card-grid">
      {reservations.map((r) => (
        <div key={r.id} className="event-card">
          {/* HEADER */}
          <div className="event-card-header">
            <h4>
              🍽 {t('Table')} {r.table_id}
            </h4>

            <span className="event-card-body">
              <p>{r.number_of_people} 👥</p>

              {r.note && <p>📝 {r.note}</p>}
            </span>
          </div>

          {/* TIME INFO */}
          <div className="event-datetime">
            <div>
              📅 {formatDate(r.reservation_time)} | ⏱{' '}
              {formatTime(r.reservation_time)}
            </div>

            <div>
              ⏳ {formatDate(r.expires_at)} | {formatTime(r.expires_at)}
            </div>
          </div>

          {/* ACTION */}
          <div className="event-card-actions">
            <button className="btn btn-danger" onClick={() => onCancel(r.id)}>
              {t('common.cancel')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileReservationsCards;
