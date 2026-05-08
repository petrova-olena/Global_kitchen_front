import { useState } from "react";
import useAdminReservations from "./useAdminReservations";
import ReservationForm from "../../Reservation/ReservationForm";
import ReservationCard from "./../../Events/ReservationCard";
import EditReservationModal from "../../Reservation/EditReservationModal";
import SuccessModal from "../../Reservation/SuccessModal";
import { useTranslation } from "react-i18next";

export default function ReservationsTab({
  createReservation,
  deleteReservation,
  updateReservation,
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
    tables,
    freeTables,
    handleAdminDatetimeChange,
    reloadReservationsAdmin,
  } = useAdminReservations();

  const { t } = useTranslation();

  const [editing, setEditing] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function handleCreate(formData) {
    try {
      await createReservation(formData);

      setSuccessMessage(t("modals.createEventSuccessMessage"));
      setShowSuccess(true);

      await reloadReservationsAdmin();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Admin create error:", err);
    }
  }

  async function handleSaveEdit(updated) {
    await updateReservation(editing.id, updated);
    await reloadReservationsAdmin();
    setSuccessMessage(t("modals.updateEventSuccessMessage"));
    setShowSuccess(true);
    setEditing(null);
  }

  async function handleDelete(id) {
    await deleteReservation(id);
    await reloadReservationsAdmin();
    setSuccessMessage(t("modals.deleteEventSuccessMessage"));
    setShowSuccess(true);
  }

  return (
    <div className="reservations-tab">
      <h2>{t("admin.reservations")}</h2>

      {/* Reservation adding for admin */}
      <ReservationForm
        tables={freeTables}
        onSubmit={handleCreate}
        disabledForm={false}
        disabledReserve={false}
        onDatetimeChange={handleAdminDatetimeChange}
        isAdmin={true}
      />

      {/* Date filters */}
      <div className="admin-filters">
        <button
          className={dateMode === "week" ? "active" : ""}
          onClick={() => setDateMode("week")}
        >
          {t("admin.currentWeek")}
        </button>

        <button
          className={dateMode === "month" ? "active" : ""}
          onClick={() => setDateMode("month")}
        >
          {t("admin.currentMonth")}
        </button>

        <button
          className={dateMode === "custom" ? "active" : ""}
          onClick={() => setDateMode("custom")}
        >
          {t("admin.choosePeriod")}
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
            <button onClick={handleSearch}>{t("admin.search")}</button>
          </div>
        </>
      )}

      <div className="reservations-list">
        {reservations.length === 0 && <p>{t("admin.noReservations")}</p>}

        {reservations.map((r) => {
          const adapted = {
            id: r.id,
            from: r.reservation_time,
            to: r.expires_at,
            guests: r.number_of_people,
            notes: r.note || "",
            table: r.table_id,
            userName: userMap[r.reserver_id], // ← имя пользователя
          };

          return (
            <ReservationCard
              key={r.id}
              reservation={adapted}
              onDelete={handleDelete}
              onEdit={setEditing}
            />
          );
        })}
      </div>

      {showSuccess && (
        <SuccessModal
          message={successMessage}
          onClose={() => setShowSuccess(false)}
        />
      )}

      {editing && (
        <EditReservationModal
          reservation={editing}
          reservations={reservations}
          tables={tables}
          onSave={handleSaveEdit}
          onCancel={() => setEditing(null)}
          isAdmin={true}
        />
      )}
    </div>
  );
}
