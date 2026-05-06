import { Link } from "react-router-dom";
import EventsOverview from "../../components/Events/EventsOverview";
import { useTranslation } from "react-i18next";

export default function CalendarPage() {
  const { t } = useTranslation();

  return (
    <>
      <div className="events-header">
        <h1>{t("calendar.title")}</h1>

        <div className="menu-links">
          <Link to="/daily-menu" className="menu-btn">
            {t("calendar.dailyMenu")}
          </Link>
          <Link to="/menu" className="menu-btn">
            {t("calendar.menu")}
          </Link>
        </div>
      </div>

      <EventsOverview />
    </>
  );
}
