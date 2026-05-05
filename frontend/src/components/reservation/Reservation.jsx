import { useState } from 'react';
import { buildAvailabilityGrid } from '../../utils/reservationAvailability';
import { useNavigate } from 'react-router-dom';
import { useReservation } from './useReservation';
import ReservationForm from './ReservationForm';
import SuccessModal from './SuccessModal';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Reservation() {
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // datetime from form
  const [selectedDatetime, setSelectedDatetime] = useState('');

  // success modal
  const [showModal, setShowModal] = useState(false);

  // availability modal
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [availabilityGrid, setAvailabilityGrid] = useState([]);

  // prefill for form
  const [prefill, setPrefill] = useState(null);

  // range validation
  const [activeSuggestion, setActiveSuggestion] = useState(null);
  const [rangeError, setRangeError] = useState(null);

  const {
    tables,
    reservations,
    getFreeTables,
    loading,
    error,
    createReservation,
  } = useReservation(currentUser);

  const freeTables = getFreeTables(selectedDatetime);

  // OPEN GRID MODAL
  function openOptionsModal() {
    const grid = buildAvailabilityGrid(tables, selectedDatetime, reservations);
    setAvailabilityGrid(grid);
    setShowOptionsModal(true);
  }

  // SUBMIT FORM
  async function handleSubmit(data) {
    const chosen = new Date(data.reservation_time);

    // RANGE VALIDATION
    if (
      activeSuggestion &&
      activeSuggestion.tableId === Number(data.table_id)
    ) {
      const { from, to } = activeSuggestion;

      if (chosen < from) {
        setRangeError(
          `This table is available starting from ${from.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        );
        return;
      }

      if (to && chosen > to) {
        setRangeError(
          `This table is available only until ${to.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        );
        return;
      }
    }

    // CREATE RESERVATION
    const result = await createReservation(data);

    if (
      result &&
      (result.success || result.status === 'success' || result.ok)
    ) {
      setShowModal(true);
    }
  }

  return (
    <div className="reservation-page">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* MAIN FORM */}
      {/* MAIN FORM OR GUEST MESSAGE */}
      {!currentUser ? (
        <div className="reservation-guest-message">
          To reserve a table, please <strong>log in</strong> or call the
          administrator.
        </div>
      ) : (
        <ReservationForm
          tables={freeTables}
          onSubmit={handleSubmit}
          disabledForm={false}
          disabledReserve={freeTables.length === 0}
          onDatetimeChange={setSelectedDatetime}
          prefillTable={prefill?.table}
          prefillDate={prefill?.date}
          prefillTime={prefill?.time}
        />
      )}

      {/* BUTTON: all tables busy */}
      {freeTables.length === 0 && selectedDatetime && (
        <button className="show-options-btn" onClick={openOptionsModal}>
          Unfortunately, all tables are booked at this time. Would you like to
          see available options?
        </button>
      )}

      {/* SUCCESS MODAL */}
      {showModal && (
        <SuccessModal
          message="Your table has been successfully reserved!"
          onClose={() => {
            setShowModal(false);
            navigate('/calendar');
          }}
        />
      )}

      {/* RANGE ERROR MODAL */}
      {rangeError && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{rangeError}</p>
            <button className="cancel-btn" onClick={() => setRangeError(null)}>
              OK
            </button>
          </div>
        </div>
      )}

      {/* OPTIONS GRID MODAL */}
      {showOptionsModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Available options</h3>

            <div className="tables-grid">
              {availabilityGrid.map(({ tableId, slot }) => (
                <div key={tableId} className="table-cell">
                  <div className="table-number">Table {tableId}</div>

                  {slot.intervals.length > 0 ? (
                    <>
                      <div className="slot-date">
                        {slot.intervals[0].from.toLocaleDateString()}
                      </div>

                      {slot.intervals.map((interval, idx) => (
                        <div key={idx} className="slot-time">
                          {interval.from.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                          {' – '}
                          {interval.to.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      ))}

                      <button
                        className="book-btn"
                        onClick={() => {
                          const interval =
                            slot.recommended ?? slot.intervals[0];

                          setPrefill({
                            table: tableId,
                            date: interval.from.toISOString().slice(0, 10),
                            time: interval.from.toTimeString().slice(0, 5),
                          });

                          setActiveSuggestion({
                            tableId,
                            from: interval.from,
                            to: interval.to,
                          });

                          setShowOptionsModal(false);
                        }}
                      >
                        Reserve
                      </button>
                    </>
                  ) : (
                    <div className="slot-unavailable">Not available</div>
                  )}
                </div>
              ))}
            </div>

            <button
              className="cancel-btn"
              onClick={() => setShowOptionsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
