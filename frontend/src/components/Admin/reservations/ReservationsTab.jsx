import useAdminReservations from "./useAdminReservations";
import ReservationCard from "./../../Events/ReservationCard";

export default function ReservationsTab({
  deleteReservation,
  editReservation,
}) {
  const {
    reservations,
    userMap,
    dateMode,
    setDateMode,
    customFrom,
    setCustomFrom,
    customTo,
    setCustomTo,
    handleSearch,
  } = useAdminReservations();

  return (
    <div className="reservations-tab">
      <h2>Reservations</h2>

      {/* Date filters */}
      <div className="admin-filters">
        <button
          className={dateMode === "week" ? "active" : ""}
          onClick={() => setDateMode("week")}
        >
          Current week
        </button>

        <button
          className={dateMode === "month" ? "active" : ""}
          onClick={() => setDateMode("month")}
        >
          Current month
        </button>

        <button
          className={dateMode === "custom" ? "active" : ""}
          onClick={() => setDateMode("custom")}
        >
          Choose period
        </button>
      </div>

      {dateMode === "custom" && (
        <>
          <div className="custom-range">
            <input
              type="date"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
            />
            <input
              type="date"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
            />
          </div>
          <div className="admin-search">
            <button onClick={handleSearch}>Search</button>
          </div>
        </>
      )}

      <div className="reservations-list">
        {reservations.length === 0 && (
          <p>No reservations found for this period</p>
        )}

        {reservations.map((r) => {
          const adapted = {
            id: r.id,
            from: r.reservation_time,
            to: r.expires_at,
            guests: r.number_of_people,
            notes: r.notes || "",
            table: r.table_id,
            userName: userMap[r.reserver_id], // ← имя пользователя
          };

          return (
            <ReservationCard
              key={r.id}
              reservation={adapted}
              onDelete={() => deleteReservation(r.id)}
              onEdit={() => editReservation(r)}
            />
          );
        })}
      </div>
    </div>
  );
}
