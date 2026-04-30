import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReservation } from "./useReservation";
import ReservationForm from "./ReservationForm";
import SuccessModal from "./SuccessModal";

export default function Reservation({ currentUser }) {
  const navigate = useNavigate();
  const [selectedDatetime, setSelectedDatetime] = useState("");
  const [showModal, setShowModal] = useState(false);

  const {
    //tables,
    //reservations,
    getFreeTables,
    loading,
    error,
    createReservation,
  } = useReservation(currentUser);

  const freeTables = getFreeTables(selectedDatetime);

  async function handleSubmit(data) {
    const result = await createReservation(data);

    if (result?.success) {
      setShowModal(true);

      // auto-close after 2 seconds
      setTimeout(() => {
        setShowModal(false);
        navigate("/calendar");
      }, 2000);
    }
  }

  return (
    <div className="reservation-page">
      <h2>Reserve a Table</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ReservationForm
        tables={freeTables}
        onSubmit={handleSubmit}
        disabled={!currentUser}
        onDatetimeChange={setSelectedDatetime}
      />

      {showModal && (
        <SuccessModal
          message="Your table has been successfully reserved!"
          onClose={() => {
            setShowModal(false);
            navigate("/calendar");
          }}
        />
      )}
    </div>
  );
}
