import { useTranslation } from "react-i18next";

export default function AdminTabs({ activeTab, setActiveTab }) {
  const { t } = useTranslation();

  return (
    <div className="admin-tabs">
      <button
        className={activeTab === "events" ? "active" : ""}
        onClick={() => setActiveTab("events")}
      >
        {t("admin.events")}
      </button>

      <button
        className={activeTab === "reservations" ? "active" : ""}
        onClick={() => setActiveTab("reservations")}
      >
        {t("admin.reservations")}
      </button>
    </div>
  );
}
