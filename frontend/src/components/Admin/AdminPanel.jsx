import "../Calendar/calendar.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAdminEvents from "./events/useAdminEvents";
import EventsTab from "./events/EventsTab";
import ReservationsTab from "./reservations/ReservationsTab";
import AdminTabs from "./AdminTabs";
import { useReservation } from "../Reservation/useReservation";

export default function AdminPanel() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("events");
  const { createReservation, deleteReservation, updateReservation } =
    useReservation(currentUser);

  // Redirect if not admin
  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/");
    }
  }, []);

  const eventsLogic = useAdminEvents(currentUser, t, activeTab);

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {/* Back button */}
      <button className="back-btn" onClick={() => navigate("/calendar")}>
        ← Back to Calendar
      </button>

      <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "events" && <EventsTab {...eventsLogic} t={t} />}

      {activeTab === "reservations" && (
        <ReservationsTab
          createReservation={createReservation}
          deleteReservation={deleteReservation}
          updateReservation={updateReservation}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}
