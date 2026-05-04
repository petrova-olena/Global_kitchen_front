import React from 'react';
import { useTranslation } from 'react-i18next';

const ProfileReservationsTable = ({ reservations, onCancel }) => {
  const { t } = useTranslation();

  return (
    <table className="events-table">
      <thead>
        <tr>
          <th>{t('profileReservations.table')}</th>
          <th>{t('profileReservations.date')}</th>
          <th>{t('profileReservations.time')}</th>
          <th>{t('profileReservations.people')}</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {reservations.map((r) => (
          <tr key={r.id}>
            <td>{r.table_id}</td>

            <td>{new Date(r.reservation_time).toLocaleDateString()}</td>

            <td>
              {new Date(r.reservation_time).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </td>

            <td>{r.number_of_people}</td>

            <td>
              <button className="action-btn" onClick={() => onCancel(r.id)}>
                {t('profileReservations.cancel')}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProfileReservationsTable;
