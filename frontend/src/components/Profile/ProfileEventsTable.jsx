import React from 'react';

const ProfileEventsTable = ({ events, onDelete }) => (
  <div className="events-table-wrapper">
    <table className="events-table">
      <thead>
        <tr>
          <th>Event Title</th>
          <th>Description</th>
          <th>Start</th>
          <th>End</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {events && events.length > 0 ? (
          events.map((event) => {
            const startObj = new Date(event.start_date);
            const endObj = new Date(event.end_date);
            const formattedStart = `${startObj.toLocaleDateString('tr-TR')} ${startObj.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`;
            const formattedEnd = `${endObj.toLocaleDateString('tr-TR')} ${endObj.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`;
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
                    Delete
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5} className="events-table-empty">
              No events found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default ProfileEventsTable;
