import React from 'react';
import { useTranslation } from 'react-i18next';

const ProfileEventsCards = ({ events, onDelete }) => {
  const { t } = useTranslation();

  if (!events || events.length === 0) {
    return <p>{t('profileOverview.noEvents')}</p>;
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
      {events.map((event) => (
        <div key={event.id} className="event-card">
          {/* HEADER */}
          <div className="event-card-header">
            <h4>{event.title}</h4>
          </div>

          {/* DESCRIPTION */}
          <div className="event-card-body">
            <p>{event.description}</p>
          </div>

          {/* DATE RANGE */}
          <div className="event-datetime">
            <div>
              📅 {formatDate(event.start_date)} | ⏱{' '}
              {formatTime(event.start_date)}
            </div>

            <div>
              📅 {formatDate(event.end_date)} | ⏱ {formatTime(event.end_date)}
            </div>
          </div>

          {/* ACTION */}
          <div className="event-card-actions">
            <button
              className="btn btn-danger"
              onClick={() => onDelete(event.id)}
            >
              {t('common.delete')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileEventsCards;
