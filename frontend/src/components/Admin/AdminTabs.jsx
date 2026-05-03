export default function AdminTabs({ activeTab, setActiveTab }) {
  return (
    <div className="admin-tabs">
      <button
        className={activeTab === "events" ? "active" : ""}
        onClick={() => setActiveTab("events")}
      >
        Events
      </button>

      <button
        className={activeTab === "reservations" ? "active" : ""}
        onClick={() => setActiveTab("reservations")}
      >
        Reservations
      </button>
    </div>
  );
}
