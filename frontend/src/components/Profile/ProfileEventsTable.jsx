import React from 'react';
import { useTranslation } from 'react-i18next';

const ProfileEventsTable = ({ events, onDelete }) => {
  const { t } = useTranslation();

  return (
    <div className="events-table-wrapper">
      <table className="events-table">
        <thead>
          <tr>
            <th>{t('profileEvents.eventTitle')}</th>
            <th>{t('profileEvents.description')}</th>
            <th>{t('profileEvents.start')}</th>
            <th>{t('profileEvents.end')}</th>
            <th>{t('profileEvents.delete')}</th>
          </tr>
        </thead>

        <tbody>
          {events && events.length > 0 ? (
            events.map((event) => {
              const startObj = new Date(event.start_date);
              const endObj = new Date(event.end_date);

              const formattedStart = `${startObj.toLocaleDateString()} ${startObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
              const formattedEnd = `${endObj.toLocaleDateString()} ${endObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

              return (
                <tr key={event.id || event._id}>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{formattedStart}</td>
                  <td>{formattedEnd}</td>
                  <td className="events-table-delete-cell">
                    <button
                      className="action-btn events-table-delete-btn"
                      onClick={() => onDelete(event.id || event._id)}
                    >
                      {t('profileEvents.delete')}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5} className="events-table-empty">
                {t('profileEvents.noEvents')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileEventsTable;
