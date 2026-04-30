import React from 'react';

const ProfileReservationsTable = ({ reservations, onCancel }) => {
  return (
    <table className="events-table">
      <thead>
        <tr>
          <th>Table</th>
          <th>Date</th>
          <th>Time</th>
          <th>People</th>
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
                Cancel
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProfileReservationsTable;
